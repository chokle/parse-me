import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type DocStatus = "in_review" | "approved" | "changes_requested";

export type ExtractedField = {
  key: string;
  label: string;
  value: string;
  confidence: number;
};

export type AuditAction =
  | "submitted"
  | "field_edited"
  | "approved"
  | "changes_requested"
  | "bulk_approved"
  | "bulk_changes_requested";

export type AuditEvent = {
  id: string;
  at: number;
  actor_name: string;
  actor_email: string;
  action: AuditAction;
  detail?: string | null;
  note?: string | null;
  bulk: boolean;
  field_key?: string | null;
  field_label?: string | null;
  before_value?: string | null;
  after_value?: string | null;
};

export type IntakeDoc = {
  id: string;
  name: string;
  source: string;
  submittedAt: number;
  status: DocStatus;
  fields: ExtractedField[];
  note?: string | null;
  reviewedAt?: number | null;
  reviewerName?: string | null;
  reviewerEmail?: string | null;
  audit: AuditEvent[];
};

const reviewerSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
});

const SYSTEM_ACTOR = { name: "Intake bot", email: "intake@parse.me" };

function fakeExtract(name: string): ExtractedField[] {
  const n = name.replace(/\.[^.]+$/, "");
  const total = (Math.random() * 9000 + 100).toFixed(2);
  const lowConf = 55 + Math.random() * 18;
  return [
    { key: "vendor", label: "Vendor", value: n.split(/[-_ ]/)[0] || "Unknown Vendor", confidence: 92 + Math.random() * 7 },
    { key: "docno", label: "Doc #", value: `DOC-${Math.floor(Math.random() * 90000 + 10000)}`, confidence: 88 + Math.random() * 10 },
    { key: "date", label: "Date", value: new Date().toISOString().slice(0, 10), confidence: lowConf },
    { key: "total", label: "Total", value: `$${total}`, confidence: 95 + Math.random() * 4 },
  ];
}

type DocRow = {
  id: string;
  name: string;
  source: string;
  status: DocStatus;
  fields: ExtractedField[];
  note: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  reviewer_name: string | null;
  reviewer_email: string | null;
};

type EventRow = {
  id: string;
  doc_id: string;
  at: string;
  actor_name: string;
  actor_email: string;
  action: AuditAction;
  detail: string | null;
  note: string | null;
  bulk: boolean;
  field_key: string | null;
  field_label: string | null;
  before_value: string | null;
  after_value: string | null;
};

function rowToDoc(row: DocRow, events: EventRow[]): IntakeDoc {
  return {
    id: row.id,
    name: row.name,
    source: row.source,
    status: row.status,
    fields: row.fields ?? [],
    note: row.note,
    submittedAt: new Date(row.submitted_at).getTime(),
    reviewedAt: row.reviewed_at ? new Date(row.reviewed_at).getTime() : null,
    reviewerName: row.reviewer_name,
    reviewerEmail: row.reviewer_email,
    audit: events
      .filter((e) => e.doc_id === row.id)
      .map((e) => ({
        id: e.id,
        at: new Date(e.at).getTime(),
        actor_name: e.actor_name,
        actor_email: e.actor_email,
        action: e.action,
        detail: e.detail,
        note: e.note,
        bulk: e.bulk,
        field_key: e.field_key,
        field_label: e.field_label,
        before_value: e.before_value,
        after_value: e.after_value,
      })),
  };
}

export const listDocs = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: docs, error } = await supabaseAdmin
    .from("intake_docs")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  const ids = (docs ?? []).map((d) => d.id);
  let events: EventRow[] = [];
  if (ids.length > 0) {
    const { data: evs, error: e2 } = await supabaseAdmin
      .from("audit_events")
      .select("*")
      .in("doc_id", ids)
      .order("at", { ascending: true });
    if (e2) throw new Error(e2.message);
    events = (evs ?? []) as EventRow[];
  }
  return (docs ?? []).map((d) => rowToDoc(d as DocRow, events));
});

export const submitDoc = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string; source: string }) =>
    z.object({
      name: z.string().trim().min(1).max(200),
      source: z.string().trim().min(1).max(120),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: doc, error } = await supabaseAdmin
      .from("intake_docs")
      .insert({
        name: data.name,
        source: data.source,
        status: "in_review",
        fields: fakeExtract(data.name),
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await supabaseAdmin.from("audit_events").insert({
      doc_id: doc.id,
      actor_name: SYSTEM_ACTOR.name,
      actor_email: SYSTEM_ACTOR.email,
      action: "submitted",
      detail: `Received via ${data.source}`,
      bulk: false,
    });
    return doc.id as string;
  });

export const setDocStatus = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; status: DocStatus; note?: string; reviewer: { name: string; email: string } }) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["approved", "changes_requested", "in_review"]),
      note: z.string().trim().max(800).optional(),
      reviewer: reviewerSchema,
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const action: AuditAction = data.status === "approved" ? "approved" : "changes_requested";
    const { error: e1 } = await supabaseAdmin
      .from("intake_docs")
      .update({
        status: data.status,
        note: data.note ?? null,
        reviewed_at: new Date().toISOString(),
        reviewer_name: data.reviewer.name,
        reviewer_email: data.reviewer.email,
      })
      .eq("id", data.id);
    if (e1) throw new Error(e1.message);
    const { error: e2 } = await supabaseAdmin.from("audit_events").insert({
      doc_id: data.id,
      actor_name: data.reviewer.name,
      actor_email: data.reviewer.email,
      action,
      note: data.note ?? null,
      bulk: false,
    });
    if (e2) throw new Error(e2.message);
    return { ok: true };
  });

export const setDocsStatus = createServerFn({ method: "POST" })
  .inputValidator((input: { ids: string[]; status: DocStatus; note?: string; reviewer: { name: string; email: string } }) =>
    z.object({
      ids: z.array(z.string().uuid()).min(1).max(200),
      status: z.enum(["approved", "changes_requested", "in_review"]),
      note: z.string().trim().max(800).optional(),
      reviewer: reviewerSchema,
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const action: AuditAction = data.status === "approved" ? "bulk_approved" : "bulk_changes_requested";
    const { error: e1 } = await supabaseAdmin
      .from("intake_docs")
      .update({
        status: data.status,
        note: data.note ?? null,
        reviewed_at: new Date().toISOString(),
        reviewer_name: data.reviewer.name,
        reviewer_email: data.reviewer.email,
      })
      .in("id", data.ids);
    if (e1) throw new Error(e1.message);
    const rows = data.ids.map((id) => ({
      doc_id: id,
      actor_name: data.reviewer.name,
      actor_email: data.reviewer.email,
      action,
      note: data.note ?? null,
      bulk: true,
      detail: `Part of bulk action on ${data.ids.length} documents`,
    }));
    const { error: e2 } = await supabaseAdmin.from("audit_events").insert(rows);
    if (e2) throw new Error(e2.message);
    return { ok: true };
  });

export const updateDocField = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; key: string; value: string; reviewer: { name: string; email: string } }) =>
    z.object({
      id: z.string().uuid(),
      key: z.string().min(1).max(60),
      value: z.string().max(500),
      reviewer: reviewerSchema,
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: doc, error } = await supabaseAdmin
      .from("intake_docs")
      .select("fields")
      .eq("id", data.id)
      .single();
    if (error) throw new Error(error.message);
    const fields = (doc?.fields ?? []) as ExtractedField[];
    const field = fields.find((f) => f.key === data.key);
    if (!field) throw new Error(`Unknown field ${data.key}`);
    const prev = field.value;
    if (prev === data.value) return { ok: true, skipped: true };
    const nextFields = fields.map((f) =>
      f.key === data.key ? { ...f, value: data.value, confidence: 100 } : f,
    );
    const { error: e1 } = await supabaseAdmin
      .from("intake_docs")
      .update({ fields: nextFields })
      .eq("id", data.id);
    if (e1) throw new Error(e1.message);
    const { error: e2 } = await supabaseAdmin.from("audit_events").insert({
      doc_id: data.id,
      actor_name: data.reviewer.name,
      actor_email: data.reviewer.email,
      action: "field_edited",
      detail: `${field.label} edited`,
      field_key: field.key,
      field_label: field.label,
      before_value: prev,
      after_value: data.value,
      bulk: false,
    });
    if (e2) throw new Error(e2.message);
    return { ok: true };
  });

export const clearAllDocs = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("intake_docs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) throw new Error(error.message);
  return { ok: true };
});

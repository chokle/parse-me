import { useEffect, useState, useCallback } from "react";

export type FieldStatus = "pending" | "approved" | "changes_requested";
export type DocStatus = "in_review" | "approved" | "changes_requested";

export type ExtractedField = {
  key: string;
  label: string;
  value: string;
  confidence: number;
};

export type IntakeDoc = {
  id: string;
  name: string;
  source: string;
  submittedAt: number;
  status: DocStatus;
  fields: ExtractedField[];
  note?: string;
  reviewedAt?: number;
};

const KEY = "syntax.intake.docs.v1";
const EVENT = "syntax-intake-updated";

function read(): IntakeDoc[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return seed();
    return JSON.parse(raw) as IntakeDoc[];
  } catch {
    return [];
  }
}

function write(docs: IntakeDoc[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(docs));
  window.dispatchEvent(new Event(EVENT));
}

function seed(): IntakeDoc[] {
  const docs: IntakeDoc[] = [
    {
      id: "doc_seed_1",
      name: "ACME Logistics — INV-2025-00482.pdf",
      source: "email · billing@",
      submittedAt: Date.now() - 1000 * 60 * 12,
      status: "in_review",
      fields: [
        { key: "vendor", label: "Vendor", value: "ACME Logistics Intl.", confidence: 99.8 },
        { key: "invoice", label: "Invoice #", value: "INV-2025-00482", confidence: 97.1 },
        { key: "tax", label: "Tax ID", value: "EU-982-1X (P?)", confidence: 64.2 },
        { key: "total", label: "Total", value: "$4,200.00", confidence: 98.1 },
      ],
    },
  ];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(docs));
  }
  return docs;
}

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

export function submitDoc(input: { name: string; source: string }): IntakeDoc {
  const doc: IntakeDoc = {
    id: `doc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    name: input.name,
    source: input.source,
    submittedAt: Date.now(),
    status: "in_review",
    fields: fakeExtract(input.name),
  };
  const docs = [doc, ...read()];
  write(docs);
  return doc;
}

export function setDocStatus(id: string, status: DocStatus, note?: string) {
  const docs = read().map((d) =>
    d.id === id ? { ...d, status, note, reviewedAt: Date.now() } : d,
  );
  write(docs);
}

export function setDocsStatus(ids: string[], status: DocStatus, note?: string) {
  const now = Date.now();
  const docs = read().map((d) =>
    ids.includes(d.id) ? { ...d, status, note, reviewedAt: now } : d,
  );
  write(docs);
}


export function updateDocField(id: string, key: string, value: string) {
  const docs = read().map((d) =>
    d.id === id
      ? { ...d, fields: d.fields.map((f) => (f.key === key ? { ...f, value, confidence: 100 } : f)) }
      : d,
  );
  write(docs);
}

export function clearAll() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function useIntakeDocs() {
  const [docs, setDocs] = useState<IntakeDoc[]>([]);
  const refresh = useCallback(() => setDocs(read()), []);
  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener(EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener(EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [refresh]);
  return docs;
}

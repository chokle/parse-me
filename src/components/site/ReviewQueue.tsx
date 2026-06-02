import { useEffect, useState } from "react";
import {
  useIntakeDocs,
  setDocStatus,
  setDocsStatus,
  updateDocField,
  clearAll,
  type IntakeDoc,
  type AuditEvent,
  type AuditAction,
} from "@/lib/intake-store";
import { Checkbox } from "@/components/ui/checkbox";

function confColor(c: number) {
  if (c >= 90) return "text-primary";
  if (c >= 75) return "text-foreground";
  return "text-[var(--warning-foreground)]";
}

export function ReviewQueue() {
  const docs = useIntakeDocs();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!selectedId && docs.length > 0) setSelectedId(docs[0].id);
    if (selectedId && !docs.find((d) => d.id === selectedId)) {
      setSelectedId(docs[0]?.id ?? null);
    }
  }, [docs, selectedId]);

  // Clean selection when docs change (e.g. status updated)
  useEffect(() => {
    setSelectedIds((prev) => {
      const remaining = new Set<string>();
      for (const id of prev) {
        if (docs.find((d) => d.id === id)) remaining.add(id);
      }
      return remaining;
    });
  }, [docs]);

  const selected = docs.find((d) => d.id === selectedId) ?? null;

  const counts = {
    in_review: docs.filter((d) => d.status === "in_review").length,
    approved: docs.filter((d) => d.status === "approved").length,
    changes: docs.filter((d) => d.status === "changes_requested").length,
  };

  const inReviewIds = docs
    .filter((d) => d.status === "in_review")
    .map((d) => d.id);

  const allInReviewSelected =
    inReviewIds.length > 0 && inReviewIds.every((id) => selectedIds.has(id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allInReviewSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const id of inReviewIds) next.delete(id);
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const id of inReviewIds) next.add(id);
        return next;
      });
    }
  };

  const handleBulkApprove = () => {
    if (selectedIds.size === 0) return;
    setDocsStatus(Array.from(selectedIds), "approved", note || undefined);
    setSelectedIds(new Set());
    setNote("");
  };

  const handleBulkRequest = () => {
    if (selectedIds.size === 0) return;
    setDocsStatus(Array.from(selectedIds), "changes_requested", note || undefined);
    setSelectedIds(new Set());
    setNote("");
  };

  return (
    <div className="ring-1 ring-border rounded-xl overflow-hidden bg-card grid lg:grid-cols-[280px_1fr]">
      {/* Queue list */}
      <aside className="border-b lg:border-b-0 lg:border-r border-border flex flex-col">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <div>
            <div className="font-semibold text-sm">Queue</div>
            <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
              {counts.in_review} pending · {counts.approved} approved · {counts.changes} changes
            </div>
          </div>
          <button
            onClick={() => { clearAll(); setSelectedId(null); setSelectedIds(new Set()); }}
            className="text-[10px] font-mono text-muted-foreground hover:text-foreground"
          >
            Reset
          </button>
        </div>
        <div className="p-2 border-b border-border flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={allInReviewSelected}
            onCheckedChange={toggleSelectAll}
          />
          <label htmlFor="select-all" className="text-[11px] text-muted-foreground cursor-pointer select-none">
            Select all in review
          </label>
          {selectedIds.size > 0 && (
            <span className="ml-auto text-[10px] font-mono text-foreground">
              {selectedIds.size} selected
            </span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto max-h-[480px]">
          {docs.length === 0 && (
            <p className="p-4 text-xs text-muted-foreground">
              Nothing in the queue. Submit a document on the intake page.
            </p>
          )}
          {docs.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`w-full text-left p-4 border-b border-border transition cursor-pointer flex items-start gap-3 ${
                d.id === selectedId ? "bg-surface" : "hover:bg-surface/60"
              }`}
            >
              <div className="pt-0.5" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.has(d.id)}
                  onCheckedChange={() => toggleSelect(d.id)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{d.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground truncate">{d.source}</div>
                  </div>
                  <StatusDot status={d.status} />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-2">
                  {timeAgo(d.submittedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Detail */}
      <div className="flex flex-col min-h-[480px]">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground p-8 text-center">
            Submit a document from the intake page to start reviewing.
          </div>
        ) : (
          <Detail
            key={selected.id}
            doc={selected}
            note={note}
            setNote={setNote}
            onApprove={() => { setDocStatus(selected.id, "approved", note || undefined); setNote(""); }}
            onRequest={() => { setDocStatus(selected.id, "changes_requested", note || undefined); setNote(""); }}
            onEdit={(k, v) => updateDocField(selected.id, k, v)}
            selectedCount={selectedIds.size}
            onBulkApprove={handleBulkApprove}
            onBulkRequest={handleBulkRequest}
          />
        )}
      </div>
    </div>
  );
}

function Detail({
  doc,
  note,
  setNote,
  onApprove,
  onRequest,
  onEdit,
  selectedCount,
  onBulkApprove,
  onBulkRequest,
}: {
  doc: IntakeDoc;
  note: string;
  setNote: (s: string) => void;
  onApprove: () => void;
  onRequest: () => void;
  onEdit: (key: string, value: string) => void;
  selectedCount: number;
  onBulkApprove: () => void;
  onBulkRequest: () => void;
}) {
  const locked = doc.status !== "in_review";
  const showBulk = selectedCount > 1;

  return (
    <>
      <div className="p-6 border-b border-border flex justify-between items-start gap-4">
        <div className="min-w-0">
          <div className="text-[10px] font-mono uppercase text-muted-foreground">{doc.source}</div>
          <h3 className="font-semibold truncate mt-1">{doc.name}</h3>
        </div>
        <StatusBadge status={doc.status} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {doc.fields.map((f) => {
          const isLow = f.confidence < 75;
          return (
            <div key={f.key} className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-mono uppercase text-muted-foreground">{f.label}</label>
                <span className={`text-[10px] font-mono ${confColor(f.confidence)}`}>
                  {f.confidence.toFixed(1)}% conf.
                </span>
              </div>
              <input
                type="text"
                value={f.value}
                readOnly={locked}
                onChange={(e) => onEdit(f.key, e.target.value)}
                className={`w-full p-3 rounded-sm text-sm focus:outline-none transition border ${
                  isLow ? "border-[var(--warning)]/50 bg-[var(--warning)]/10" : "border-border bg-surface"
                }`}
              />
            </div>
          );
        })}

        {doc.note && (
          <div className="p-3 rounded-sm border border-border bg-surface">
            <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Reviewer note</div>
            <p className="text-sm">{doc.note}</p>
          </div>
        )}

        <AuditTimeline events={doc.audit} />
      </div>

      {showBulk ? (
        <div className="p-6 border-t border-border space-y-3">
          <div className="text-[11px] font-mono text-muted-foreground">
            {selectedCount} documents selected
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note applied to all selected…"
            rows={2}
            className="w-full p-3 rounded-sm text-sm border border-border bg-surface focus:outline-none focus:border-foreground/40 resize-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onBulkRequest}
              className="py-3 border border-border font-medium text-sm rounded-sm hover:bg-muted transition"
            >
              Request changes ({selectedCount})
            </button>
            <button
              onClick={onBulkApprove}
              className="py-3 bg-primary text-primary-foreground font-medium text-sm rounded-sm hover:brightness-110 transition"
            >
              Approve & send ({selectedCount})
            </button>
          </div>
        </div>
      ) : !locked ? (
        <div className="p-6 border-t border-border space-y-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note for the submitter…"
            rows={2}
            className="w-full p-3 rounded-sm text-sm border border-border bg-surface focus:outline-none focus:border-foreground/40 resize-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onRequest}
              className="py-3 border border-border font-medium text-sm rounded-sm hover:bg-muted transition"
            >
              Request changes
            </button>
            <button
              onClick={onApprove}
              className="py-3 bg-primary text-primary-foreground font-medium text-sm rounded-sm hover:brightness-110 transition"
            >
              Approve & send
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 border-t border-border text-[11px] font-mono text-muted-foreground">
          {doc.status === "approved" ? "✓ Sent to downstream webhook" : "↩ Returned to submitter"}
          {doc.reviewedAt && ` · ${timeAgo(doc.reviewedAt)}`}
        </div>
      )}
    </>
  );
}

function StatusDot({ status }: { status: IntakeDoc["status"] }) {
  const cls =
    status === "approved"
      ? "bg-primary"
      : status === "changes_requested"
        ? "bg-foreground"
        : "bg-[var(--warning)]";
  return <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${cls}`} />;
}

function StatusBadge({ status }: { status: IntakeDoc["status"] }) {
  const map = {
    in_review: { label: "In review", cls: "bg-[var(--warning)]/15 text-[var(--warning-foreground)]" },
    approved: { label: "Approved", cls: "bg-primary/15 text-primary" },
    changes_requested: { label: "Changes requested", cls: "bg-muted text-foreground" },
  } as const;
  const v = map[status];
  return (
    <span className={`text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap ${v.cls}`}>
      {v.label}
    </span>
  );
}

const ACTION_LABEL: Record<AuditAction, string> = {
  submitted: "Submitted",
  field_edited: "Field edited",
  approved: "Approved",
  changes_requested: "Changes requested",
  bulk_approved: "Approved (bulk)",
  bulk_changes_requested: "Changes requested (bulk)",
};

function actionDot(a: AuditAction) {
  if (a === "approved" || a === "bulk_approved") return "bg-primary";
  if (a === "changes_requested" || a === "bulk_changes_requested") return "bg-foreground";
  if (a === "field_edited") return "bg-[var(--warning)]";
  return "bg-muted-foreground";
}

function AuditTimeline({ events }: { events: AuditEvent[] }) {
  const sorted = [...events].sort((a, b) => b.at - a.at);
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-mono uppercase text-muted-foreground">Audit log</div>
        <div className="text-[10px] font-mono text-muted-foreground">{sorted.length} event{sorted.length === 1 ? "" : "s"}</div>
      </div>
      {sorted.length === 0 ? (
        <p className="text-xs text-muted-foreground">No activity yet.</p>
      ) : (
        <ol className="relative border-l border-border ml-1.5 space-y-4">
          {sorted.map((e) => (
            <li key={e.id} className="pl-4 relative">
              <span className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${actionDot(e.action)}`} />
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xs font-medium">{ACTION_LABEL[e.action]}</span>
                {e.bulk && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase">
                    bulk
                  </span>
                )}
                <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                  {timeAgo(e.at)}
                </span>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{e.actor}</div>
              {e.detail && <p className="text-xs text-muted-foreground mt-1">{e.detail}</p>}
              {e.note && (
                <p className="text-xs mt-1 p-2 rounded-sm bg-surface border border-border">
                  “{e.note}”
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function timeAgo(t: number) {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

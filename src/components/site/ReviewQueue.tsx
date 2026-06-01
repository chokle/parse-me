import { useEffect, useState } from "react";
import { useIntakeDocs, setDocStatus, updateDocField, clearAll, type IntakeDoc } from "@/lib/intake-store";

function confColor(c: number) {
  if (c >= 90) return "text-primary";
  if (c >= 75) return "text-foreground";
  return "text-[var(--warning-foreground)]";
}

export function ReviewQueue() {
  const docs = useIntakeDocs();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!selectedId && docs.length > 0) setSelectedId(docs[0].id);
    if (selectedId && !docs.find((d) => d.id === selectedId)) {
      setSelectedId(docs[0]?.id ?? null);
    }
  }, [docs, selectedId]);

  const selected = docs.find((d) => d.id === selectedId) ?? null;

  const counts = {
    in_review: docs.filter((d) => d.status === "in_review").length,
    approved: docs.filter((d) => d.status === "approved").length,
    changes: docs.filter((d) => d.status === "changes_requested").length,
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
            onClick={() => { clearAll(); setSelectedId(null); }}
            className="text-[10px] font-mono text-muted-foreground hover:text-foreground"
          >
            Reset
          </button>
        </div>
        <div className="flex-1 overflow-y-auto max-h-[480px]">
          {docs.length === 0 && (
            <p className="p-4 text-xs text-muted-foreground">
              Nothing in the queue. Submit a document on the intake page.
            </p>
          )}
          {docs.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`w-full text-left p-4 border-b border-border transition ${
                d.id === selectedId ? "bg-surface" : "hover:bg-surface/60"
              }`}
            >
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
            </button>
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
          />
        )}
      </div>
    </div>
  );
}

function Detail({
  doc, note, setNote, onApprove, onRequest, onEdit,
}: {
  doc: IntakeDoc;
  note: string;
  setNote: (s: string) => void;
  onApprove: () => void;
  onRequest: () => void;
  onEdit: (key: string, value: string) => void;
}) {
  const locked = doc.status !== "in_review";
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
      </div>

      {!locked ? (
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
    status === "approved" ? "bg-primary"
    : status === "changes_requested" ? "bg-foreground"
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
  return <span className={`text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap ${v.cls}`}>{v.label}</span>;
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

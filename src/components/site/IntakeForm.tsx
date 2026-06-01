import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { submitDoc, useIntakeDocs } from "@/lib/intake-store";

const SOURCES = ["email · billing@", "S3 watcher · /invoices", "REST API · /v1/upload", "SFTP · nightly"];

export function IntakeForm() {
  const docs = useIntakeDocs();
  const [name, setName] = useState("");
  const [source, setSource] = useState(SOURCES[0]);
  const [lastId, setLastId] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = name.trim() || `Untitled-${Date.now().toString(36)}.pdf`;
    const doc = submitDoc({ name: clean, source });
    setLastId(doc.id);
    setName("");
  };

  const recent = docs.slice(0, 4);

  return (
    <div className="ring-1 ring-border rounded-xl bg-card overflow-hidden grid lg:grid-cols-[1fr_1fr]">
      <form onSubmit={submit} className="p-6 border-b lg:border-b-0 lg:border-r border-border space-y-5">
        <div>
          <h3 className="font-semibold">Submit a document</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Simulate an intake event. The extractor will queue it into the Review Inbox.
          </p>
        </div>
        <label className="block space-y-2">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">Filename</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ACME-invoice-00913.pdf"
            className="w-full p-3 rounded-sm text-sm border border-border bg-surface focus:outline-none focus:border-foreground/40"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[10px] font-mono uppercase text-muted-foreground">Source channel</span>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full p-3 rounded-sm text-sm border border-border bg-surface focus:outline-none focus:border-foreground/40"
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground font-medium text-sm rounded-sm hover:brightness-110 transition"
        >
          Send to extractor
        </button>
        {lastId && (
          <p className="text-[11px] font-mono text-primary">
            ✓ Queued · <Link to="/review-inbox" className="underline">open in Review Inbox</Link>
          </p>
        )}
      </form>

      <div className="p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Recent submissions</h3>
          <Link to="/review-inbox" className="text-[11px] font-mono text-muted-foreground hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="mt-4 space-y-2 flex-1">
          {recent.length === 0 && (
            <p className="text-xs text-muted-foreground">No documents yet — submit one to see it appear here.</p>
          )}
          {recent.map((d) => (
            <div key={d.id} className="p-3 border border-border rounded-sm bg-surface flex justify-between items-center gap-3">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{d.name}</div>
                <div className="text-[10px] font-mono text-muted-foreground truncate">{d.source}</div>
              </div>
              <StatusBadge status={d.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "in_review" | "approved" | "changes_requested" }) {
  const map = {
    in_review: { label: "In review", cls: "bg-[var(--warning)]/15 text-[var(--warning-foreground)]" },
    approved: { label: "Approved", cls: "bg-primary/15 text-primary" },
    changes_requested: { label: "Changes", cls: "bg-muted text-foreground" },
  } as const;
  const v = map[status];
  return <span className={`text-[10px] font-mono px-2 py-1 rounded ${v.cls}`}>{v.label}</span>;
}

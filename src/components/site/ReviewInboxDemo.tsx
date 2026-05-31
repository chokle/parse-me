import { useState } from "react";

type Status = "pending" | "approved" | "edited";

type Field = {
  key: string;
  label: string;
  value: string;
  confidence: number;
  status: Status;
};

const initial: Field[] = [
  { key: "vendor", label: "Vendor Name", value: "ACME Logistics Intl.", confidence: 99.8, status: "pending" },
  { key: "invoice", label: "Invoice #", value: "INV-2025-00482", confidence: 97.1, status: "pending" },
  { key: "tax", label: "Tax ID", value: "EU-982-1X (P?)", confidence: 64.2, status: "pending" },
  { key: "due", label: "Due Date", value: "2026-06-14", confidence: 58.6, status: "pending" },
  { key: "total", label: "Total Payable", value: "$4,200.00", confidence: 98.1, status: "pending" },
  { key: "currency", label: "Currency", value: "USD", confidence: 99.9, status: "pending" },
];

function confColor(c: number) {
  if (c >= 90) return "text-primary";
  if (c >= 75) return "text-foreground";
  return "text-[var(--warning-foreground)]";
}

export function ReviewInboxDemo() {
  const [fields, setFields] = useState<Field[]>(initial);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const flagged = fields.filter((f) => f.confidence < 75 && f.status === "pending").length;
  const resolved = fields.filter((f) => f.status !== "pending").length;

  const update = (key: string, patch: Partial<Field>) =>
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, ...patch } : f)));

  const approveAll = () =>
    setFields((prev) => prev.map((f) => (f.status === "pending" ? { ...f, status: "approved" } : f)));

  const reset = () => {
    setFields(initial);
    setEditingKey(null);
  };

  return (
    <div className="ring-1 ring-border rounded-xl overflow-hidden shadow-sm bg-card grid lg:grid-cols-[1fr_420px]">
      {/* Document side */}
      <div className="bg-surface p-8 flex justify-center border-b lg:border-b-0 lg:border-r border-border min-h-[400px]">
        <div className="relative w-full max-w-md aspect-[1/1.414] bg-card shadow-xl rounded-sm overflow-hidden border border-border">
          <div className="p-6 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-3 w-24 bg-foreground/80 rounded-sm mb-2" />
                <div className="h-2 w-32 bg-foreground/20 rounded-sm" />
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-muted-foreground">INVOICE</div>
                <div className="text-xs font-mono">#INV-2025-00482</div>
              </div>
            </div>
            <div className="pt-6 space-y-1.5">
              <div className="h-2 w-full bg-muted rounded-sm" />
              <div className="h-2 w-11/12 bg-muted rounded-sm" />
              <div className="h-2 w-3/4 bg-muted rounded-sm" />
            </div>
            <div className="pt-4 border-t border-border" />
            <div className="space-y-2 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-2 flex-1 bg-muted rounded-sm" />
                  <div className="h-2 w-12 bg-muted rounded-sm" />
                  <div className="h-2 w-16 bg-muted rounded-sm" />
                </div>
              ))}
            </div>
            {/* Highlighted low-confidence regions */}
            <div className="absolute left-6 top-[58%] w-32 h-5 bg-[var(--warning)]/25 ring-1 ring-[var(--warning)]/60 rounded-sm" />
            <div className="absolute right-6 top-[68%] w-20 h-5 bg-[var(--warning)]/25 ring-1 ring-[var(--warning)]/60 rounded-sm" />
          </div>
          <div className="absolute inset-x-0 h-1 bg-primary shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-scan" />
        </div>
      </div>

      {/* Side panel */}
      <div className="flex flex-col">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Extract Metadata</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {flagged} flagged · {resolved}/{fields.length} resolved
            </p>
          </div>
          <span className="text-[10px] font-mono bg-muted px-2 py-1 rounded">DOC #8829-X</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 max-h-[460px]">
          {fields.map((f) => {
            const isLow = f.confidence < 75;
            const isEditing = editingKey === f.key;
            return (
              <div key={f.key} className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-mono uppercase text-muted-foreground">
                    {f.label}
                  </label>
                  <span className={`text-[10px] font-mono ${confColor(f.confidence)}`}>
                    {f.confidence.toFixed(1)}% conf.
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={f.value}
                    readOnly={!isEditing}
                    onChange={(e) => update(f.key, { value: e.target.value })}
                    onBlur={() => {
                      if (isEditing) {
                        update(f.key, { status: "edited" });
                        setEditingKey(null);
                      }
                    }}
                    className={`w-full p-3 rounded-sm text-sm focus:outline-none transition border ${
                      f.status === "approved"
                        ? "border-primary/40 bg-primary/5"
                        : f.status === "edited"
                        ? "border-foreground/30 bg-card"
                        : isLow
                        ? "border-[var(--warning)]/50 bg-[var(--warning)]/10"
                        : "border-border bg-surface"
                    }`}
                  />
                </div>
                {f.status === "pending" && (
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingKey(f.key)}
                      className="text-[11px] px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => update(f.key, { status: "approved" })}
                      className="text-[11px] px-2 py-1 rounded bg-foreground text-background hover:opacity-90 transition"
                    >
                      Approve
                    </button>
                  </div>
                )}
                {f.status === "approved" && (
                  <p className="text-[11px] font-mono text-primary">✓ Approved · sent to webhook</p>
                )}
                {f.status === "edited" && (
                  <p className="text-[11px] font-mono text-muted-foreground">
                    ✎ Edited · queued for training signal
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-border grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={reset}
            className="py-3 border border-border font-medium text-sm rounded-sm hover:bg-muted transition"
          >
            Reset demo
          </button>
          <button
            type="button"
            onClick={approveAll}
            className="py-3 bg-primary text-primary-foreground font-medium text-sm rounded-sm hover:brightness-110 transition"
          >
            Approve all
          </button>
        </div>
      </div>
    </div>
  );
}

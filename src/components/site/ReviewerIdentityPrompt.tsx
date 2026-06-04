import { useState } from "react";
import { saveReviewer, clearReviewer, useReviewer, type Reviewer } from "@/lib/reviewer-identity";

export function ReviewerIdentityPrompt({ children }: { children: React.ReactNode }) {
  const reviewer = useReviewer();
  if (!reviewer) return <IdentityForm />;
  return (
    <>
      <ReviewerBadge reviewer={reviewer} />
      {children}
    </>
  );
}

function ReviewerBadge({ reviewer }: { reviewer: Reviewer }) {
  return (
    <div className="mb-4 flex items-center justify-between p-3 rounded-sm border border-border bg-surface">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[11px] font-mono shrink-0">
          {reviewer.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{reviewer.name}</div>
          <div className="text-[10px] font-mono text-muted-foreground truncate">{reviewer.email}</div>
        </div>
      </div>
      <button
        onClick={clearReviewer}
        className="text-[10px] font-mono text-muted-foreground hover:text-foreground shrink-0"
      >
        Switch reviewer
      </button>
    </div>
  );
}

function IdentityForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const m = email.trim();
    if (n.length < 2) return setErr("Enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) return setErr("Enter a valid email.");
    saveReviewer({ name: n, email: m });
  };

  return (
    <form onSubmit={onSubmit} className="p-6 ring-1 ring-border rounded-xl bg-card space-y-4">
      <div>
        <div className="text-[10px] font-mono uppercase text-muted-foreground">Reviewer identity</div>
        <h3 className="font-semibold mt-1">Who's reviewing today?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your name and email are attached to every approval, change request, and field edit in the audit log.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="p-3 rounded-sm text-sm border border-border bg-surface focus:outline-none focus:border-foreground/40"
          maxLength={80}
          autoFocus
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          type="email"
          className="p-3 rounded-sm text-sm border border-border bg-surface focus:outline-none focus:border-foreground/40"
          maxLength={160}
        />
      </div>
      {err && <p className="text-xs text-[var(--warning-foreground)]">{err}</p>}
      <button className="px-4 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-sm hover:brightness-110 transition">
        Continue to queue
      </button>
    </form>
  );
}

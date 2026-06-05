import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { saveReviewer, useReviewer } from "@/lib/reviewer-identity";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start using Parse.me — free workspace" },
      { name: "description", content: "Drop in your name and email to open a live extraction workspace. No sales call required." },
      { property: "og:title", content: "Start using Parse.me" },
      { property: "og:description", content: "Open a live extraction workspace in seconds." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const navigate = useNavigate();
  const reviewer = useReviewer();
  const [name, setName] = useState(reviewer?.name ?? "");
  const [email, setEmail] = useState(reviewer?.email ?? "");
  const [company, setCompany] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n = name.trim();
    const m = email.trim();
    if (n.length < 2) return setErr("Enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) return setErr("Enter a valid work email.");
    saveReviewer({ name: n, email: m });
    navigate({ to: "/document-intake" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="px-6 pt-20 pb-24 max-w-3xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
          Free workspace · no credit card
        </span>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter mt-3 mb-6">
          Start extracting in 30 seconds.
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-[55ch]">
          Tell us who you are and we'll drop you straight into a live workspace. Submit a document, watch it extract, and approve fields in the Review Inbox — all attributed to you in the audit log.
        </p>

        <form onSubmit={onSubmit} className="space-y-6 p-8 border border-border rounded-xl bg-card">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                Full name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                type="text"
                className="w-full p-3 border border-border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                Work email
              </label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={160}
                type="email"
                className="w-full p-3 border border-border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
              Company <span className="opacity-60">(optional)</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={120}
              className="w-full p-3 border border-border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>
          {err && <p className="text-xs text-[var(--warning-foreground)]">{err}</p>}
          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:brightness-110 transition"
          >
            Open my workspace →
          </button>
          <p className="text-[11px] text-muted-foreground text-center">
            By continuing you'll be attributed in the audit log as the reviewer. Switch identity anytime from the Review Inbox.
          </p>
        </form>

        <div className="mt-8 text-sm text-muted-foreground">
          Already inside?{" "}
          <Link to="/review-inbox" className="underline underline-offset-4 text-foreground">
            Jump to the Review Inbox
          </Link>{" "}
          or{" "}
          <Link to="/document-intake" className="underline underline-offset-4 text-foreground">
            submit a document
          </Link>
          .
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

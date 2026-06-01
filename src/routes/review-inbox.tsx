import { createFileRoute, Link } from "@tanstack/react-router";
import { ReviewInboxDemo } from "@/components/site/ReviewInboxDemo";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/review-inbox")({
  head: () => ({
    meta: [
      { title: "Review Inbox — Human-in-the-loop validation · Syntax.AI" },
      {
        name: "description",
        content:
          "Catch low-confidence extractions before they ship. Per-field thresholds, assignees, SLAs and audit logs — built into the extraction engine.",
      },
      { property: "og:title", content: "Review Inbox · Syntax.AI" },
      {
        property: "og:description",
        content: "99% accuracy still means 1 in 100 wrong. The Review Inbox closes the loop.",
      },
    ],
  }),
  component: ReviewInbox,
});

function ReviewInbox() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="px-6 pt-20 pb-16 max-w-5xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
          The new perk · human-in-the-loop
        </span>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter mt-4 mb-6 text-balance">
          99% accuracy still means 1 in 100 wrong.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-[60ch] leading-relaxed">
          The Review Inbox is a purpose-built queue for the fields the AI isn't sure about. Set a confidence threshold; anything below it lands here for a human to approve or correct in seconds.
        </p>
      </section>

      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <ReviewInboxDemo />
        <p className="mt-4 text-xs text-muted-foreground font-mono">
          Try it: approve clean fields, edit the flagged ones. Corrections become training signal for your account.
        </p>
      </section>

      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Connected · live queue</span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2">Documents submitted via intake</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Anything sent through the <Link to="/document-intake" className="underline">intake channels</Link> lands here. Approve to release downstream, or request changes to bounce it back.
            </p>
          </div>
          <Link to="/document-intake" className="text-xs font-mono px-3 py-2 border border-border rounded hover:bg-muted transition">
            + Submit a document
          </Link>
        </div>
        <ReviewQueue />
      </section>

      <section className="px-6 py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { t: "Per-field confidence", d: "Every extracted field carries a confidence score derived from token-level model probabilities, not a single doc-level guess." },
            { t: "Custom thresholds", d: "Set the floor per workflow. Invoices might need 95%; lead-gen forms might be fine at 75%." },
            { t: "Assignees & SLAs", d: "Route by document type or amount. Hit the SLA timer and we escalate to a backup reviewer." },
            { t: "Side-by-side review", d: "Document on the left, fields on the right. Click a field to highlight its bounding box in the source." },
            { t: "Full audit log", d: "Who approved what, when, with the original value preserved. Export to your compliance system." },
            { t: "Training feedback loop", d: "Corrections are stored and (with consent) used to fine-tune a private model on your dedicated instance." },
          ].map((c) => (
            <div key={c.t} className="p-6 border border-border rounded-xl bg-background">
              <h3 className="font-semibold mb-2">{c.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight mb-10 text-center">
          With vs. without the Review Inbox
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-8 border border-border rounded-xl bg-card">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Without
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>· Bad data silently enters your CRM</li>
              <li>· Engineers babysit a spreadsheet of exceptions</li>
              <li>· No audit trail of who changed what</li>
              <li>· Errors only surface when a customer complains</li>
              <li>· The model never learns from its mistakes</li>
            </ul>
          </div>
          <div className="p-8 border-2 border-foreground rounded-xl bg-card relative">
            <div className="absolute -top-3 left-6 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold">
              WITH SYNTAX
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-4">
              With
            </div>
            <ul className="space-y-3 text-sm">
              <li>✓ Only verified data reaches downstream systems</li>
              <li>✓ Reviewers triage in a dedicated, fast UI</li>
              <li>✓ Immutable audit log of every approval</li>
              <li>✓ SLA timers and escalation built in</li>
              <li>✓ Corrections feed back into your private model</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
          Close the loop on extraction.
        </h2>
        <Link to="/contact" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm">
          Book a demo
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}

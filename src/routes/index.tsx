import { createFileRoute, Link } from "@tanstack/react-router";
import { ReviewInboxDemo } from "@/components/site/ReviewInboxDemo";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parse.me — Documents in. Validated data out." },
      {
        name: "description",
        content:
          "LLM-native data extraction with a built-in Review Inbox. Catch every low-confidence field before it ships to your systems.",
      },
      { property: "og:title", content: "Parse.me — Documents in. Validated data out." },
      {
        property: "og:description",
        content: "Extract structured data from invoices, contracts and IDs with human-in-the-loop accuracy.",
      },
    ],
  }),
  component: Home,
});

const integrations = [
  "Salesforce", "Zapier", "Slack", "QuickBooks", "Make", "Airtable",
  "Google Sheets", "HubSpot", "Webhooks", "SFTP", "S3", "Notion",
];

const capabilities = [
  { t: "Layout agnostic", d: "Works across thousands of templates without per-format rule mapping." },
  { t: "Multi-language OCR", d: "Native support for 40+ languages including CJK and Arabic scripts." },
  { t: "Handwriting & scans", d: "Vision models trained on noisy, rotated and handwritten documents." },
  { t: "Tables & line items", d: "Nested rows, merged cells, multi-page tables — extracted cleanly." },
  { t: "Schema in plain English", d: "Describe the fields you want. No training data required." },
  { t: "SOC 2 Type II", d: "Encryption in transit and at rest. Strict no-train data policy by default." },
];

const faq = [
  {
    q: "How is this different from generic OCR?",
    a: "OCR returns characters. Parse.me returns structured JSON keyed to your schema, with per-field confidence and a built-in human review path.",
  },
  {
    q: "What happens to low-confidence fields?",
    a: "Anything below your threshold is routed to the Review Inbox. A teammate approves or corrects it in seconds, and the correction becomes a training signal.",
  },
  {
    q: "Do you train on our documents?",
    a: "No. The default policy is strict no-train. Enterprise customers can opt into private fine-tuning on a dedicated instance.",
  },
  {
    q: "How fast can we go live?",
    a: "Most teams ship their first production pipeline in under an afternoon. No model training, no labeling, no rules.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <SiteNav />

      {/* Hero */}
      <section className="px-6 pt-20 pb-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-reveal">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-6">
              <span className="size-1.5 rounded-full bg-primary" /> V4.0 Engine · Review Inbox live
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[0.95] tracking-tighter text-balance mb-8">
              Turn unstructured chaos into <span className="text-primary">validated</span> data.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[48ch] mb-10 text-pretty">
              The first extraction engine with a built-in human-in-the-loop Review Inbox. 99.9% accuracy on the easy fields, zero surprises on the hard ones.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:brightness-110 transition shadow-lg shadow-primary/20"
              >
                Start extracting — free
              </Link>
              <Link
                to="/review-inbox"
                className="px-6 md:px-8 py-3 md:py-4 border border-border font-semibold rounded-sm hover:bg-muted transition"
              >
                See the Review Inbox
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-xs font-mono text-muted-foreground">
              <span>SOC 2 TYPE II</span>
              <span>GDPR · HIPAA</span>
              <span>NO-TRAIN DEFAULT</span>
            </div>
          </div>

          <div className="relative animate-reveal [animation-delay:200ms]">
            <div className="relative bg-card border border-border rounded-lg shadow-2xl p-4 aspect-[4/3] flex gap-4 overflow-hidden">
              <div className="relative w-1/2 bg-surface border border-border rounded flex flex-col gap-2 p-3">
                <div className="h-4 w-3/4 bg-muted rounded-sm" />
                <div className="h-4 w-1/2 bg-muted rounded-sm" />
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full bg-muted rounded-sm" />
                  <div className="h-2 w-full bg-muted rounded-sm" />
                  <div className="h-2 w-5/6 bg-muted rounded-sm" />
                  <div className="h-2 w-2/3 bg-muted rounded-sm" />
                </div>
                <div className="absolute inset-x-0 h-1 bg-primary shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-scan" />
              </div>
              <div className="w-1/2 flex flex-col gap-2 pt-4">
                <div className="p-2 border border-primary/30 bg-primary/5 rounded">
                  <div className="text-[10px] font-mono text-primary">INVOICE_ID</div>
                  <div className="text-xs font-mono">#TX-99201</div>
                </div>
                <div className="p-2 border border-border rounded">
                  <div className="text-[10px] font-mono text-muted-foreground">VENDOR</div>
                  <div className="text-xs font-mono">ACME Logistics</div>
                </div>
                <div className="p-2 border border-[var(--warning)]/50 bg-[var(--warning)]/10 rounded">
                  <div className="text-[10px] font-mono text-[var(--warning-foreground)]">TAX_ID · 64%</div>
                  <div className="text-xs font-mono">EU-982-1X (P?)</div>
                </div>
                <div className="p-2 border border-border rounded opacity-60">
                  <div className="text-[10px] font-mono text-muted-foreground">TOTAL</div>
                  <div className="text-xs font-mono">$12,450.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-border bg-surface/60 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground text-center mb-6">
            Trusted by document-heavy teams at
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 md:gap-x-16 gap-y-6 opacity-60">
            {["LUMINA", "STRATOS", "VERTEX", "ORBIT", "PRISM", "HALCYON"].map((c) => (
              <span key={c} className="font-mono font-medium text-base md:text-lg tracking-tight">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary">How it works</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4 tracking-tight">
              Complex parsing, simplified.
            </h2>
            <p className="text-muted-foreground">
              Three steps to automate an entire document pipeline — from inbox to your warehouse.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: "01", t: "Ingest", d: "Forward an email, drop a PDF, or hit our API. We accept anything from scans to native digital docs." },
              { n: "02", t: "Extract", d: "An LLM-native engine reads the document against your schema and returns JSON with per-field confidence." },
              { n: "03", t: "Review & sync", d: "Low-confidence fields land in the Review Inbox. Everything else streams straight to your stack." },
            ].map((s) => (
              <div key={s.n} className="space-y-4">
                <div className="size-9 bg-foreground text-background rounded grid place-items-center text-sm font-mono">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Inbox showcase */}
      <section className="px-6 py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                Human-in-the-loop · new
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tighter mt-3 mb-4">
                The Review Inbox
              </h2>
              <p className="text-muted-foreground text-lg">
                99% accuracy still means 1 in 100 invoices wrong. Try the interactive demo — approve, edit, and watch corrections become training signal.
              </p>
            </div>
            <Link
              to="/review-inbox"
              className="self-start md:self-end text-sm font-medium underline-offset-4 hover:underline"
            >
              Full feature tour →
            </Link>
          </div>
          <ReviewInboxDemo />
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Engineered for the messy real world.
            </h2>
            <p className="text-muted-foreground">
              No two documents are identical. Parse.me handles edge cases that break rules-based parsers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c) => (
              <div key={c.t} className="p-6 md:p-8 border border-border rounded-xl bg-card">
                <h3 className="font-semibold mb-2">{c.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations marquee */}
      <section className="px-6 py-16 bg-foreground text-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-mono opacity-80">
            {integrations.map((i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Simple, usage-based pricing.</h2>
          <p className="text-muted-foreground">Start free. Pay for what you process.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { tag: "BUILDER", price: "$0", desc: "For prototyping and small pipelines.", features: ["100 docs / mo", "Community support", "Review Inbox (1 seat)"], cta: "Get started" },
            { tag: "PROFESSIONAL", price: "$249", desc: "For growing automation teams.", features: ["5,000 docs / mo", "Unlimited Review seats", "Webhook + API access", "Priority support"], cta: "Choose plan", popular: true },
            { tag: "ENTERPRISE", price: "Custom", desc: "Dedicated instances and SLA.", features: ["Unlimited docs", "Private VPC", "Custom fine-tuning", "Named CSM"], cta: "Contact sales" },
          ].map((p) => (
            <div
              key={p.tag}
              className={`p-8 border rounded-lg flex flex-col bg-card ${
                p.popular ? "border-2 border-foreground shadow-2xl relative" : "border-border"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-8 px-2 py-0.5 bg-foreground text-background text-[10px] font-bold">
                  POPULAR
                </div>
              )}
              <div className={`text-[10px] font-mono mb-4 ${p.popular ? "text-primary" : "text-muted-foreground"}`}>
                {p.tag}
              </div>
              <div className="text-4xl font-display font-extrabold mb-2">{p.price}</div>
              <p className="text-sm text-muted-foreground mb-8">{p.desc}</p>
              <ul className="space-y-3 mb-8 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-primary">•</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/pricing"
                className={`mt-auto w-full py-3 text-sm font-semibold text-center rounded-sm ${
                  p.popular ? "bg-foreground text-background" : "border border-border hover:bg-muted"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 bg-surface/60 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight mb-12 text-center">Frequently asked</h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="group p-6 bg-card border border-border rounded-lg open:shadow-sm"
              >
                <summary className="cursor-pointer font-medium text-sm flex justify-between items-center">
                  {f.q}
                  <span className="text-muted-foreground transition group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
          Stop hand-keying documents.
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">
          Spin up your first extraction pipeline in minutes. Your finance team will thank you.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm shadow-lg shadow-primary/20">
            Open my workspace
          </Link>
          <Link to="/pricing" className="px-8 py-4 border border-border font-semibold rounded-sm hover:bg-muted">
            See pricing
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

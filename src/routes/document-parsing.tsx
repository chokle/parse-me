import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/document-parsing")({
  head: () => ({
    meta: [
      { title: "Document parsing — Parse.me" },
      { name: "description", content: "LLM-native parsing that handles tables, line items, and edge cases without templates or training." },
      { property: "og:title", content: "Document parsing · Parse.me" },
      { property: "og:description", content: "Describe the schema. We do the rest." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Platform · 02</span>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter mt-4 mb-6">
          Schema in plain English. JSON out.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          No templates. No training. Define the fields you need — including nested tables — and the engine returns structured JSON with per-field confidence.
        </p>
      </section>

      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <pre className="p-6 bg-foreground text-background rounded-xl text-xs md:text-sm font-mono overflow-x-auto border border-border">
{`POST /v1/extract
{
  "document_url": "https://...",
  "schema": {
    "vendor_name": "string",
    "invoice_number": "string",
    "due_date": "ISO date",
    "line_items": [{
      "description": "string",
      "quantity": "number",
      "unit_price": "number"
    }],
    "total": "number"
  }
}`}
        </pre>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
        {[
          { t: "Tables & line items", d: "Multi-page tables, merged cells, currency normalization — handled." },
          { t: "Layout agnostic", d: "Works across thousands of vendor templates without per-format work." },
          { t: "Per-field confidence", d: "Token-level probabilities surface uncertainty so the Review Inbox can catch it." },
        ].map((c) => (
          <div key={c.t} className="p-6 border border-border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">{c.t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="px-6 py-16 text-center">
        <Link to="/contact" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm">
          Try it on a sample
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/exports-and-integrations")({
  head: () => ({
    meta: [
      { title: "Exports & integrations — Syntax.AI" },
      { name: "description", content: "Stream validated data to CRMs, databases, webhooks, and 50+ destinations in real time." },
      { property: "og:title", content: "Exports · Syntax.AI" },
      { property: "og:description", content: "From extraction to your stack in milliseconds." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Platform · 03</span>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter mt-4 mb-6">
          Validated data, where it belongs.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Stream only Review-approved records to downstream systems. Retry-safe, idempotent, with a full audit log per row.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
        {[
          { t: "Webhooks", d: "Signed POSTs with exponential backoff and dead-letter queues." },
          { t: "Native connectors", d: "Salesforce, HubSpot, QuickBooks, Sheets, Airtable, Slack and more." },
          { t: "Warehouses", d: "Direct streaming to Postgres, Snowflake, BigQuery, Redshift." },
          { t: "Files & APIs", d: "Drop CSV/JSON to S3, GCS or SFTP. Or hit a custom REST endpoint." },
        ].map((c) => (
          <div key={c.t} className="p-6 border border-border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">{c.t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="px-6 py-16 text-center">
        <Link to="/integrations" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm">
          Browse all integrations
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}

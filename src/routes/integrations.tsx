import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Syntax.AI" },
      { name: "description", content: "Send extracted data to 50+ destinations: Salesforce, Sheets, Slack, webhooks, S3, and more." },
      { property: "og:title", content: "Integrations · Syntax.AI" },
      { property: "og:description", content: "Native connectors and webhooks for every modern stack." },
    ],
  }),
  component: Integrations,
});

const groups = [
  {
    name: "CRMs & sales",
    items: ["Salesforce", "HubSpot", "Pipedrive", "Copper", "Close", "Attio"],
  },
  {
    name: "Spreadsheets & databases",
    items: ["Google Sheets", "Airtable", "Notion", "Postgres", "MySQL", "Snowflake"],
  },
  {
    name: "Finance & ops",
    items: ["QuickBooks", "Xero", "NetSuite", "Stripe", "Brex", "Ramp"],
  },
  {
    name: "Messaging",
    items: ["Slack", "Microsoft Teams", "Discord", "Email", "SMS", "PagerDuty"],
  },
  {
    name: "Automation",
    items: ["Zapier", "Make", "n8n", "Workato", "Tray.io", "Pipedream"],
  },
  {
    name: "Developer",
    items: ["Webhooks", "REST API", "GraphQL", "SFTP", "S3", "GCS"],
  },
];

function Integrations() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto text-center">
        <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter mb-6">
          Send data anywhere.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Native connectors for the tools you already use. Plus webhooks and a clean REST API for everything else.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g) => (
            <div key={g.name} className="p-6 border border-border rounded-xl bg-card">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-primary mb-4">
                {g.name}
              </h3>
              <ul className="space-y-2 text-sm">
                {g.items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 bg-card border-y border-border text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Don't see your tool?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          The REST API and webhook destinations cover any custom workflow.
        </p>
        <Link to="/contact" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm">
          Talk to an engineer
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}

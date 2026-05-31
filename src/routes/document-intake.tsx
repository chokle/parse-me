import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/document-intake")({
  head: () => ({
    meta: [
      { title: "Document intake — Syntax.AI" },
      { name: "description", content: "Email, API, cloud storage, SFTP. Capture every document the moment it arrives." },
      { property: "og:title", content: "Document intake · Syntax.AI" },
      { property: "og:description", content: "Every channel, one normalized pipeline." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Platform · 01</span>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter mt-4 mb-6">
          Capture every document, automatically.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Give each workflow its own forwarding address, S3 prefix, or API endpoint. Documents are deduped, virus-scanned and queued in milliseconds.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
        {[
          { t: "Dedicated email inbox", d: "Forward from any sender. We parse threads, strip signatures and pair attachments." },
          { t: "Cloud storage watchers", d: "Listen to S3, GCS, Dropbox, OneDrive, or Google Drive folders." },
          { t: "REST API & SDKs", d: "POST a file URL or multipart upload. SDKs for Node, Python, and Go." },
          { t: "SFTP & shared drives", d: "Legacy systems welcome. Daily batch pickups with full lineage." },
        ].map((c) => (
          <div key={c.t} className="p-6 border border-border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">{c.t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="px-6 py-16 text-center">
        <Link to="/contact" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm">
          See it on your documents
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}

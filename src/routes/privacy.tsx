import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Parse.me" },
      { name: "description", content: "How Parse.me collects, uses, stores, and protects your data." },
      { property: "og:title", content: "Privacy Policy · Parse.me" },
      { property: "og:description", content: "Our commitments around data handling, retention, and the strict no-train default." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <article className="px-6 pt-20 pb-24 max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Legal</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tighter mt-3 mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: June 5, 2026</p>

        <section className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">1. What we collect</h2>
            <p>We collect (a) account data you provide (name, work email, company); (b) documents you submit for extraction; (c) reviewer actions in the Review Inbox; and (d) standard request metadata (IP, user agent, timestamps) needed to operate the service.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">2. How we use it</h2>
            <p>Customer data is used solely to provide the extraction pipeline, route low-confidence fields to the Review Inbox, maintain audit logs, and support you. We do not sell personal data.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">3. No-train default</h2>
            <p>Your documents and extracted data are never used to train shared models. Private fine-tuning is opt-in and stays inside your dedicated instance.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">4. Retention</h2>
            <p>Documents are retained for the lifetime of your workspace and deleted within 30 days of account closure or on request via privacy@parse.me.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">5. Sub-processors</h2>
            <p>We rely on a short list of audited cloud infrastructure providers (compute, object storage, observability). The current list is available on request.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">6. Your rights</h2>
            <p>GDPR and CCPA rights — access, deletion, portability, opt-out — are honored. Email privacy@parse.me and we'll respond within 30 days.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">7. Contact</h2>
            <p>Questions: <a href="mailto:privacy@parse.me" className="text-foreground underline underline-offset-4">privacy@parse.me</a>.</p>
          </div>
        </section>
      </article>
      <SiteFooter />
    </div>
  );
}

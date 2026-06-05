import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Syntax.AI" },
      { name: "description", content: "Terms governing use of Syntax.AI's document extraction platform and Review Inbox." },
      { property: "og:title", content: "Terms of Service · Syntax.AI" },
      { property: "og:description", content: "Plain-language terms for using the platform." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <article className="px-6 pt-20 pb-24 max-w-3xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Legal</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tighter mt-3 mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: June 5, 2026</p>

        <section className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">1. Acceptance</h2>
            <p>By using Syntax.AI you agree to these terms on behalf of yourself and any organization you represent.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">2. Acceptable use</h2>
            <p>No malware, no scraping of others' private data, no use for unlawful surveillance, and no attempts to reverse-engineer the extraction engine.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">3. Your content</h2>
            <p>You retain all rights to documents you submit. You grant us a limited license to process them solely to deliver the service.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">4. Plans & billing</h2>
            <p>Paid plans are billed monthly in advance. Overages are billed at the next tier's per-document rate after written notice.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">5. Service availability</h2>
            <p>We target 99.9% monthly uptime on Professional and 99.95% on Enterprise. Status: <a href="https://status.syntax.ai" className="text-foreground underline underline-offset-4">status.syntax.ai</a>.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">6. Termination</h2>
            <p>Either party may terminate with 30 days' notice. We delete your data within 30 days of termination unless legally required to retain it.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">7. Liability</h2>
            <p>To the extent permitted by law, our aggregate liability is capped at fees paid in the prior 12 months.</p>
          </div>
          <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">8. Contact</h2>
            <p>Legal questions: <a href="mailto:legal@syntax.ai" className="text-foreground underline underline-offset-4">legal@syntax.ai</a>.</p>
          </div>
        </section>
      </article>
      <SiteFooter />
    </div>
  );
}

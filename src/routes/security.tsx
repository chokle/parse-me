import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — Parse.me" },
      { name: "description", content: "How Parse.me protects customer documents: SOC 2 Type II, encryption, access controls, and audit logging." },
      { property: "og:title", content: "Security · Parse.me" },
      { property: "og:description", content: "Our defense-in-depth approach for high-stakes documents." },
    ],
  }),
  component: Security,
});

const pillars = [
  { t: "SOC 2 Type II", d: "Independently audited annually against the Trust Services Criteria. Report available under NDA." },
  { t: "Encryption everywhere", d: "TLS 1.3 in transit. AES-256 at rest. Per-tenant data keys with quarterly rotation." },
  { t: "Least-privilege access", d: "SSO + SCIM, role-based access controls, just-in-time production access with full session capture." },
  { t: "Tenant isolation", d: "Logical isolation by default; private VPC / single-tenant deployment available on Enterprise." },
  { t: "Audit logging", d: "Every reviewer action — approval, edit, bulk update — is recorded with actor identity and before/after values." },
  { t: "No-train guarantee", d: "Customer documents never enter shared training data. Opt-in private fine-tuning stays in your instance." },
];

function Security() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-6 pt-20 pb-12 max-w-3xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Legal · Trust</span>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter mt-3 mb-6">
          Built for high-stakes documents.
        </h1>
        <p className="text-lg text-muted-foreground">
          Security and compliance aren't a feature flag — they're the foundation. Here's the short version.
        </p>
      </section>

      <section className="px-6 pb-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
        {pillars.map((p) => (
          <div key={p.t} className="p-6 border border-border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">{p.t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
          </div>
        ))}
      </section>

      <section className="px-6 py-16 bg-card border-y border-border text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Need our SOC 2 report or DPA?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          We'll send the latest report under NDA within one business day.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-sm">
            Request documents
          </Link>
          <a href="mailto:security@parse.me" className="px-6 py-3 border border-border font-semibold rounded-sm hover:bg-muted">
            security@parse.me
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

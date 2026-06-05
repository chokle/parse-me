import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Parse.me" },
      { name: "description", content: "Usage-based pricing for document extraction. Start free, scale with confidence." },
      { property: "og:title", content: "Pricing · Parse.me" },
      { property: "og:description", content: "Three plans, no surprises. Pay per document processed." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    tag: "BUILDER",
    price: "$0",
    sub: "/forever",
    desc: "For prototyping and small projects.",
    features: ["100 documents / month", "Email & PDF intake", "Review Inbox (1 seat)", "Community support"],
    cta: "Start free",
  },
  {
    tag: "PROFESSIONAL",
    price: "$249",
    sub: "/month",
    desc: "For teams running production pipelines.",
    features: ["5,000 documents / month", "Unlimited Review seats", "Webhook + API", "Custom schemas", "Priority support"],
    cta: "Choose plan",
    popular: true,
  },
  {
    tag: "ENTERPRISE",
    price: "Custom",
    sub: "",
    desc: "For regulated industries at scale.",
    features: ["Unlimited documents", "Private VPC / on-prem", "Custom fine-tuning", "99.95% SLA", "Named CSM"],
    cta: "Contact sales",
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-6 pt-20 pb-16 text-center max-w-3xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter mb-6">
          Pay for what you parse.
        </h1>
        <p className="text-lg text-muted-foreground">
          No per-seat fees, no setup costs. Every plan includes the Review Inbox.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.tag}
              className={`p-8 border rounded-xl flex flex-col bg-card ${
                t.popular ? "border-2 border-foreground shadow-2xl relative" : "border-border"
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-8 px-2 py-0.5 bg-foreground text-background text-[10px] font-bold">
                  POPULAR
                </div>
              )}
              <div className={`text-[10px] font-mono mb-4 ${t.popular ? "text-primary" : "text-muted-foreground"}`}>
                {t.tag}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-display font-extrabold">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.sub}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">{t.desc}</p>
              <ul className="space-y-3 mb-8 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-primary">•</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-auto w-full py-3 text-sm font-semibold text-center rounded-sm ${
                  t.popular ? "bg-foreground text-background" : "border border-border hover:bg-muted"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 bg-card border-y border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-8 text-center">Pricing FAQ</h2>
          <div className="space-y-3">
            {[
              { q: "What counts as a document?", a: "A document is a single file submitted for extraction. A 200-page PDF is one document; an email with three PDF attachments is three." },
              { q: "What if I exceed my plan?", a: "We bill overages at the next tier's per-document rate. We'll always notify you before charging." },
              { q: "Do you offer annual billing?", a: "Yes — 2 months free on Professional, custom terms on Enterprise." },
            ].map((f) => (
              <details key={f.q} className="group p-6 bg-background border border-border rounded-lg">
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

      <SiteFooter />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a demo — Syntax.AI" },
      { name: "description", content: "See Syntax run on your documents. 30-minute live walkthrough with an engineer." },
      { property: "og:title", content: "Book a demo · Syntax.AI" },
      { property: "og:description", content: "Live walkthrough on your real documents." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="px-6 pt-20 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter mb-6">
          Book a 30-min demo.
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Bring 5 sample documents. We'll show you the extraction, the Review Inbox, and your integration in one session.
        </p>

        {submitted ? (
          <div className="p-8 border border-primary/40 bg-primary/5 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Got it — we'll be in touch within one business day.</h2>
            <p className="text-sm text-muted-foreground">
              In the meantime, feel free to explore the interactive Review Inbox demo on the homepage.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6 p-8 border border-border rounded-xl bg-card">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                  Full name
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-3 border border-border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                  Work email
                </label>
                <input
                  required
                  type="email"
                  className="w-full p-3 border border-border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                Company
              </label>
              <input
                required
                type="text"
                className="w-full p-3 border border-border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                What kind of documents?
              </label>
              <textarea
                rows={4}
                className="w-full p-3 border border-border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
                placeholder="Invoices, contracts, lab reports, leases…"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:brightness-110 transition"
            >
              Request demo
            </button>
            <p className="text-[11px] text-muted-foreground text-center">
              We'll never share your email. Cancel anytime.
            </p>
          </form>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}

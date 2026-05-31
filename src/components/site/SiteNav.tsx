import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/document-intake", label: "Platform" },
  { to: "/review-inbox", label: "Review Inbox" },
  { to: "/integrations", label: "Integrations" },
  { to: "/pricing", label: "Pricing" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-6 bg-foreground rounded-sm" aria-hidden />
          <span className="font-display text-xl tracking-tight font-extrabold">SYNTAX.AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex px-4 py-2 bg-foreground text-background text-sm font-medium rounded-sm hover:opacity-90 transition"
          >
            Start Extracting
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className="md:hidden p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-foreground" />
              <div className="w-5 h-0.5 bg-foreground" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden mt-4 pb-2 flex flex-col gap-3 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center px-4 py-2 bg-foreground text-background rounded-sm"
          >
            Start Extracting
          </Link>
        </div>
      )}
    </nav>
  );
}

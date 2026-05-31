import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-20 bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="size-5 bg-foreground rounded-sm" aria-hidden />
            <span className="font-display text-lg tracking-tight font-extrabold">SYNTAX</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-[28ch]">
            High-fidelity data extraction for the modern enterprise.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Product</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link to="/document-intake" className="hover:text-foreground">Document intake</Link>
            <Link to="/document-parsing" className="hover:text-foreground">Document parsing</Link>
            <Link to="/exports-and-integrations" className="hover:text-foreground">Exports</Link>
            <Link to="/review-inbox" className="hover:text-foreground">Review Inbox</Link>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Company</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link to="/pricing" className="hover:text-foreground">Pricing</Link>
            <Link to="/integrations" className="hover:text-foreground">Integrations</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Legal</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">
        <span>© {new Date().getFullYear()} Syntax AI Systems Inc.</span>
        <span>Built for high-stakes documents.</span>
      </div>
    </footer>
  );
}

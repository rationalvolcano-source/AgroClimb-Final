import logoPath from "@assets/image_1759852944967.webp";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 text-center">
          <p className="text-sm text-slate-400" data-testid="footer-trust">
            Trusted by students from 120+ colleges
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src={logoPath} alt="The Agro Vision" className="h-5 w-5" />
              <span className="font-semibold" data-testid="footer-brand">The Agro Vision</span>
            </div>
            <p className="text-sm text-slate-400" data-testid="footer-tagline">
              AI-guided career pathways for Agri students
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-3" data-testid="footer-product-heading">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-slate-300 transition-colors" data-testid="link-footer-features">Features</a></li>
              <li><a href="#pricing" className="hover:text-slate-300 transition-colors" data-testid="link-footer-pricing">Pricing</a></li>
              <li><Link href="/games" className="hover:text-slate-300 transition-colors" data-testid="link-footer-games">Interactive Games</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3" data-testid="footer-resources-heading">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/books" className="hover:text-slate-300 transition-colors" data-testid="link-footer-notes">Notes & PYQs</Link></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors" data-testid="link-footer-alumni">Alumni Connect</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3" data-testid="footer-company-heading">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-slate-300 transition-colors" data-testid="link-footer-about">About</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors" data-testid="link-footer-privacy">Privacy</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors" data-testid="link-footer-terms">Terms</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors" data-testid="link-footer-contact">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p data-testid="footer-copyright">© The Agro Vision — AI-guided career clarity for Agri students.</p>
        </div>
      </div>
    </footer>
  );
}

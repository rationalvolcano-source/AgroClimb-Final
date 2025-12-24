import logoPath from "@assets/image_1761115104637.webp";
import { Link } from "wouter";
import { SiInstagram, SiTelegram } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 text-center">
          <p className="text-sm text-slate-400" data-testid="footer-trust">
            Trusted across campuses
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src={logoPath} alt="AgroClimb" className="h-5 w-5" />
              <span className="font-semibold" data-testid="footer-brand">AgroClimb</span>
            </div>
            <p className="text-sm text-slate-400" data-testid="footer-tagline">
              AI-guided career pathways for Agri students
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/agroclimb?igsh=MXBycTVwZTM0N3N6bw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors"
                data-testid="link-footer-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me/+uQNpa83oEmIxOTA9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                data-testid="link-footer-telegram"
              >
                <SiTelegram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3" data-testid="footer-product-heading">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-slate-300 transition-colors" data-testid="link-footer-features">Features</a></li>
              <li><Link href="/digital-skills" className="hover:text-slate-300 transition-colors" data-testid="link-footer-digital-skills">Digital Skills</Link></li>
              <li><Link href="/interview-prep" className="hover:text-slate-300 transition-colors" data-testid="link-footer-interview-prep">Interview Prep</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3" data-testid="footer-resources-heading">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/alumni-webinars" className="hover:text-slate-300 transition-colors" data-testid="link-footer-alumni">Alumni Webinars</Link></li>
              <li><Link href="/daily-news" className="hover:text-slate-300 transition-colors" data-testid="link-footer-news">Daily News</Link></li>
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
          <p data-testid="footer-copyright">© AgroClimb — AI-guided career clarity for Agri students.</p>
        </div>
      </div>
    </footer>
  );
}

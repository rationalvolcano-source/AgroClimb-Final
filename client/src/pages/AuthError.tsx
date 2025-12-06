import Nav from "@/components/Nav";
import { AlertTriangle, MessageCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const WHATSAPP_NUMBER = "918250904021";

export default function AuthError() {
  const [, setLocation] = useLocation();
  
  const whatsappMessage = "Hi, I'm trying to sign up for AgroClimb programs but encountered a login issue. Please help me register.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold mb-3" data-testid="text-auth-error-title">
            Login Temporarily Unavailable
          </h1>
          <p className="text-slate-300 mb-6" data-testid="text-auth-error-message">
            We're experiencing a temporary issue with our login service. This usually resolves within a few minutes.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => window.location.href = "/api/login"}
            className="w-full gap-2"
            variant="outline"
            data-testid="button-retry-login"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-950 px-2 text-slate-500">or</span>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            data-testid="link-whatsapp-fallback"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
              <MessageCircle className="w-4 h-4" />
              Register via WhatsApp Instead
            </Button>
          </a>

          <p className="text-sm text-slate-400 mt-4">
            Can't wait? Message us directly on WhatsApp and we'll get you registered right away.
          </p>

          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mt-4"
            data-testid="button-go-home"
          >
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
}

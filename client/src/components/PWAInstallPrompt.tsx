import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Download, Smartphone, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    // Check if dismissed recently (within 7 days)
    const dismissedTime = localStorage.getItem("pwa-install-dismissed-time");
    if (dismissedTime) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // iOS Safari handling
    if (isIOS() && isSafari()) {
      setTimeout(() => setShowIOSPrompt(true), 3000);
      return;
    }

    // Android/Chrome handling
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSPrompt(false);
    localStorage.setItem("pwa-install-dismissed-time", Date.now().toString());
  };

  if (isInstalled) {
    return null;
  }

  // iOS Safari prompt
  if (showIOSPrompt) {
    return (
      <div 
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-5 duration-300"
        data-testid="pwa-install-prompt-ios"
      >
        <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 shadow-2xl shadow-emerald-500/10">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm" data-testid="pwa-title">
                Install AgroClimb App
              </h3>
              <p className="text-slate-400 text-xs mt-1" data-testid="pwa-description">
                Tap <Share className="inline h-3.5 w-3.5 mx-0.5" /> then "Add to Home Screen"
              </p>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-300 text-xs h-8 mt-2"
                data-testid="button-pwa-dismiss"
              >
                Got it
              </Button>
            </div>
            <button 
              onClick={handleDismiss}
              className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
              aria-label="Close"
              data-testid="button-pwa-close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Android/Chrome prompt
  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-5 duration-300"
      data-testid="pwa-install-prompt"
    >
      <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 shadow-2xl shadow-emerald-500/10">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-sm" data-testid="pwa-title">
              Install AgroClimb App
            </h3>
            <p className="text-slate-400 text-xs mt-0.5" data-testid="pwa-description">
              Quick access from your home screen. Works offline!
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Button 
                size="sm" 
                onClick={handleInstall}
                className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs h-8"
                data-testid="button-pwa-install"
              >
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Install Now
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-300 text-xs h-8"
                data-testid="button-pwa-dismiss"
              >
                Not Now
              </Button>
            </div>
          </div>
          <button 
            onClick={handleDismiss}
            className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Close"
            data-testid="button-pwa-close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

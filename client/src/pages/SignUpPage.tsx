import { SignUp } from "@clerk/clerk-react";
import { SiGoogle } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

const isInAppBrowser = () => {
  const ua = navigator.userAgent || navigator.vendor;
  return /FBAN|FBAV|Instagram|WhatsApp|Line|Snapchat|Twitter|wv/i.test(ua);
};

export default function SignUpPage() {
  const [showWebViewWarning, setShowWebViewWarning] = useState(false);

  useEffect(() => {
    setShowWebViewWarning(isInAppBrowser());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        {showWebViewWarning && (
          <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <ExternalLink className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-200 text-sm font-medium">Open in Browser</p>
                <p className="text-amber-300/80 text-xs mt-1">
                  Google sign-in doesn't work in WhatsApp/app browsers. 
                  Tap the menu (⋮) and select "Open in Chrome" or copy this link to your browser.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Join AgroClimb</h1>
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <SiGoogle className="h-4 w-4" />
            <span className="text-sm">Sign up instantly with Google - no password needed</span>
          </div>
        </div>
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignUpUrl="/"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-slate-900 border border-slate-800",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
              socialButtonsBlockButton: "bg-white hover:bg-gray-100 text-gray-900 border-0",
              formFieldLabel: "text-slate-300",
              formFieldInput: "bg-slate-800 border-slate-700 text-white",
              footerActionLink: "text-emerald-400 hover:text-emerald-300",
            }
          }}
        />
      </div>
    </div>
  );
}

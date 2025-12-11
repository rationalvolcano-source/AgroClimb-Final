import { SignUp } from "@clerk/clerk-react";
import { SiGoogle } from "react-icons/si";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
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

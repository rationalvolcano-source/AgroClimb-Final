import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { SignInButton } from "@clerk/clerk-react";
import { CheckCircle, Send, Loader2 } from "lucide-react";

interface EnrollmentGateProps {
  program: "digital-skills" | "webinars" | "daily-news";
  buttonText: string;
  buttonClassName?: string;
  programTitle: string;
  programDescription: string;
  telegramLink: string;
}

const TELEGRAM_LINKS: Record<string, string> = {
  "digital-skills": "https://t.me/+kXJ-3Kmyd_JmMDU1",
  "webinars": "https://t.me/+n8xbzrqBXb1iOGI1",
  "daily-news": "https://t.me/+0dQoa5KZak02MDk9",
};

export function EnrollmentGate({
  program,
  buttonText,
  buttonClassName,
  programTitle,
  programDescription,
  telegramLink,
}: EnrollmentGateProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const hasProcessedIntent = useRef(false);

  useEffect(() => {
    if (isLoading || hasProcessedIntent.current) return;
    
    const intent = sessionStorage.getItem("enrollmentIntent");
    if (intent === program && isAuthenticated) {
      hasProcessedIntent.current = true;
      sessionStorage.removeItem("enrollmentIntent");
      setShowSuccessModal(true);
    }
  }, [isAuthenticated, isLoading, program]);

  const handleAuthenticatedClick = () => {
    if (isAuthenticated) {
      setShowSuccessModal(true);
    }
  };

  const telegramUrl = telegramLink || TELEGRAM_LINKS[program];

  if (isLoading) {
    return (
      <Button className={buttonClassName} disabled data-testid={`button-enroll-${program}`}>
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Loading...
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <SignInButton mode="modal" forceRedirectUrl={window.location.pathname}>
        <Button 
          className={buttonClassName} 
          onClick={() => sessionStorage.setItem("enrollmentIntent", program)}
          data-testid={`button-enroll-${program}`}
        >
          {buttonText}
        </Button>
      </SignInButton>
    );
  }

  return (
    <>
      <Button
        onClick={handleAuthenticatedClick}
        className={buttonClassName}
        data-testid={`button-enroll-${program}`}
      >
        {buttonText}
      </Button>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <DialogTitle className="text-xl">You're Registered!</DialogTitle>
            </div>
            <DialogDescription className="text-left space-y-3">
              <p>
                Welcome{user?.firstName ? `, ${user.firstName}` : ""}! You've successfully signed up for{" "}
                <span className="font-semibold text-foreground">{programTitle}</span>.
              </p>
              <p className="text-muted-foreground">{programDescription}</p>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="bg-muted/50 rounded-lg p-4 border">
              <p className="text-sm font-medium mb-2">Next Step:</p>
              <p className="text-sm text-muted-foreground mb-3">
                Join our Telegram group to confirm your spot and get updates.
              </p>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-telegram-${program}`}
              >
                <Button className="w-full bg-blue-500 hover:bg-blue-600 gap-2">
                  <Send className="w-4 h-4" />
                  Join Telegram Group
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function DirectTelegramLink({
  buttonText,
  buttonClassName,
  telegramLink,
  program,
}: {
  buttonText: string;
  buttonClassName?: string;
  telegramLink: string;
  program: string;
}) {
  return (
    <a
      href={telegramLink}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClassName || "text-sm text-muted-foreground hover:text-foreground underline"}
      data-testid={`link-direct-telegram-${program}`}
    >
      {buttonText}
    </a>
  );
}

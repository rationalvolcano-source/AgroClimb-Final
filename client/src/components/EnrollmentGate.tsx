import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CheckCircle, MessageCircle, Loader2 } from "lucide-react";

interface EnrollmentGateProps {
  program: "digital-skills" | "webinars" | "daily-news";
  buttonText: string;
  buttonClassName?: string;
  programTitle: string;
  programDescription: string;
  whatsappMessage: string;
}

const WHATSAPP_NUMBER = "918250904021";

export function EnrollmentGate({
  program,
  buttonText,
  buttonClassName,
  programTitle,
  programDescription,
  whatsappMessage,
}: EnrollmentGateProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const enrollMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/enroll", { program });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      setShowSuccessModal(true);
    },
  });

  const handleClick = () => {
    if (isLoading) return;

    if (!isAuthenticated) {
      // Store the intent to redirect back after login
      sessionStorage.setItem("enrollmentIntent", program);
      window.location.href = "/api/login";
      return;
    }

    // User is authenticated, enroll them
    enrollMutation.mutate();
  };

  // Check for pending enrollment intent after login
  useState(() => {
    const intent = sessionStorage.getItem("enrollmentIntent");
    if (intent === program && isAuthenticated) {
      sessionStorage.removeItem("enrollmentIntent");
      enrollMutation.mutate();
    }
  });

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Button
        onClick={handleClick}
        className={buttonClassName}
        disabled={isLoading || enrollMutation.isPending}
        data-testid={`button-enroll-${program}`}
      >
        {isLoading || enrollMutation.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}
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
                Message us on WhatsApp to confirm your spot and get updates.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-whatsapp-${program}`}
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message on WhatsApp
                </Button>
              </a>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Or copy message:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(whatsappMessage);
                }}
                data-testid={`button-copy-message-${program}`}
              >
                Copy to clipboard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Simple fallback link for users who prefer not to sign in
export function DirectWhatsAppLink({
  buttonText,
  buttonClassName,
  whatsappMessage,
  program,
}: {
  buttonText: string;
  buttonClassName?: string;
  whatsappMessage: string;
  program: string;
}) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-muted-foreground hover:text-foreground underline"
      data-testid={`link-direct-whatsapp-${program}`}
    >
      {buttonText}
    </a>
  );
}

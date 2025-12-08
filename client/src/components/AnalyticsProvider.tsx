import { createContext, useContext, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { useUser } from "@clerk/clerk-react";

type EventType = "page_view" | "cta_click" | "whatsapp_opened" | "sign_in" | "sign_out" | "enroll";

interface AnalyticsEvent {
  sessionId: string;
  eventType: EventType;
  path: string;
  referrerPath?: string;
  durationSeconds?: number;
  metadata?: Record<string, unknown>;
  timestamp?: string;
}

interface AnalyticsContextType {
  trackEvent: (eventType: EventType, path: string, metadata?: Record<string, unknown>) => void;
  trackClick: (analyticsId: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
};

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isSignedIn } = useUser();
  const eventsQueue = useRef<AnalyticsEvent[]>([]);
  const pageStartTime = useRef<number>(Date.now());
  const previousPath = useRef<string>("");
  const flushTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const flushEvents = useCallback(async () => {
    if (eventsQueue.current.length === 0 || !isSignedIn) return;

    const events = [...eventsQueue.current];
    eventsQueue.current = [];

    try {
      const response = await fetch("/api/analytics/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events }),
        credentials: "include",
      });
      if (!response.ok) {
        console.error("Failed to send analytics:", await response.text());
      }
    } catch (error) {
      console.error("Analytics error:", error);
    }
  }, [isSignedIn]);

  const queueEvent = useCallback((event: AnalyticsEvent) => {
    // Don't queue events when not signed in
    if (!isSignedIn) return;
    
    eventsQueue.current.push(event);
    
    if (flushTimeoutRef.current) {
      clearTimeout(flushTimeoutRef.current);
    }
    flushTimeoutRef.current = setTimeout(() => {
      flushEvents();
    }, 10000);

    if (eventsQueue.current.length >= 5) {
      flushEvents();
    }
  }, [flushEvents, isSignedIn]);

  const trackEvent = useCallback((eventType: EventType, path: string, metadata?: Record<string, unknown>) => {
    const event: AnalyticsEvent = {
      sessionId: getSessionId(),
      eventType,
      path,
      referrerPath: previousPath.current || undefined,
      metadata,
      timestamp: new Date().toISOString(),
    };
    queueEvent(event);
  }, [queueEvent]);

  const trackClick = useCallback((analyticsId: string) => {
    trackEvent("cta_click", location, { analyticsId });
  }, [trackEvent, location]);

  useEffect(() => {
    if (!isSignedIn) return;

    const durationSeconds = Math.round((Date.now() - pageStartTime.current) / 1000);
    
    if (previousPath.current && previousPath.current !== location) {
      const pageViewEvent: AnalyticsEvent = {
        sessionId: getSessionId(),
        eventType: "page_view",
        path: location,
        referrerPath: previousPath.current,
        durationSeconds: durationSeconds > 0 ? durationSeconds : undefined,
        timestamp: new Date().toISOString(),
      };
      queueEvent(pageViewEvent);
    } else if (!previousPath.current) {
      const pageViewEvent: AnalyticsEvent = {
        sessionId: getSessionId(),
        eventType: "page_view",
        path: location,
        timestamp: new Date().toISOString(),
      };
      queueEvent(pageViewEvent);
    }

    previousPath.current = location;
    pageStartTime.current = Date.now();
  }, [location, isSignedIn, queueEvent]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (eventsQueue.current.length > 0 && isSignedIn) {
        const durationSeconds = Math.round((Date.now() - pageStartTime.current) / 1000);
        if (durationSeconds > 0) {
          eventsQueue.current[eventsQueue.current.length - 1].durationSeconds = durationSeconds;
        }
        
        const data = JSON.stringify({ events: eventsQueue.current });
        navigator.sendBeacon("/api/analytics/events", new Blob([data], { type: "application/json" }));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (flushTimeoutRef.current) {
        clearTimeout(flushTimeoutRef.current);
      }
      flushEvents();
    };
  }, [isSignedIn, flushEvents]);

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackClick }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    return {
      trackEvent: () => {},
      trackClick: () => {},
    };
  }
  return context;
}

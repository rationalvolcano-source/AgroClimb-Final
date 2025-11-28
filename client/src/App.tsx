import { Switch, Route, Redirect } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Eager load only landing page for instant first paint
import LandingPage from "@/pages/LandingPage";

// Lazy load all other pages for code splitting
const Books = lazy(() => import("@/pages/Books"));
const CareerQuiz = lazy(() => import("@/pages/CareerQuiz"));
const SubjectRecommenderComingSoon = lazy(() => import("@/pages/SubjectRecommenderComingSoon"));
const RecordedClassesComingSoon = lazy(() => import("@/pages/RecordedClassesComingSoon"));
const AlumniWebinarsComingSoon = lazy(() => import("@/pages/AlumniWebinarsComingSoon"));
const ExcelQuiz = lazy(() => import("@/pages/ExcelQuiz"));
const ExcelOrientation = lazy(() => import("@/pages/ExcelOrientation"));
const ExcelSprints = lazy(() => import("@/pages/ExcelSprints"));
const DigitalSkills = lazy(() => import("@/pages/DigitalSkills"));
const InterviewPrep = lazy(() => import("@/pages/InterviewPrep"));
const DailyNews = lazy(() => import("@/pages/DailyNews"));

// Loading component with brand styling
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0b1420] via-[#0f1530] to-[#0b1420]">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#26A69A] border-t-transparent mb-4"></div>
      <p className="text-[#9fb2c3] text-sm">Loading...</p>
    </div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={LandingPage}/>
        <Route path="/books" component={Books}/>
        <Route path="/digital-skills" component={DigitalSkills}/>
        <Route path="/interview-prep" component={InterviewPrep}/>
        <Route path="/daily-news" component={DailyNews}/>
        <Route path="/excel-quiz" component={ExcelQuiz}/>
        <Route path="/excel-orientation" component={ExcelOrientation}/>
        <Route path="/excel-sprints" component={ExcelSprints}/>
        <Route path="/career-quiz" component={CareerQuiz}/>
        <Route path="/subject-recommender" component={SubjectRecommenderComingSoon}/>
        <Route path="/recorded-classes" component={RecordedClassesComingSoon}/>
        <Route path="/alumni-webinars" component={AlumniWebinarsComingSoon}/>
        <Route path="/planb-webinars">{() => <Redirect to="/digital-skills" />}</Route>
        <Route path="*" component={LandingPage} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

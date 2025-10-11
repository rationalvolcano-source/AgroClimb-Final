import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/LandingPage";
import StudyWithMe from "@/pages/StudyWithMe";
import WellnessCentre from "@/pages/WellnessCentre";
import Books from "@/pages/Books";
import Games from "@/pages/Games";
import PlanB from "@/pages/PlanB";
import CareerQuizComingSoon from "@/pages/CareerQuizComingSoon";
import SubjectRecommenderComingSoon from "@/pages/SubjectRecommenderComingSoon";
import RecordedClassesComingSoon from "@/pages/RecordedClassesComingSoon";
import AlumniWebinarsComingSoon from "@/pages/AlumniWebinarsComingSoon";
import PlanBWebinarsHub from "@/pages/PlanBWebinarsHub";
import FlashcardDuel from "@/pages/FlashcardDuel";
import ExcelQuiz from "@/pages/ExcelQuiz";
import ExcelOrientation from "@/pages/ExcelOrientation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage}/>
      <Route path="/swm" component={StudyWithMe}/>
      <Route path="/wellness" component={WellnessCentre}/>
      <Route path="/books" component={Books}/>
      <Route path="/games" component={Games}/>
      <Route path="/flashcard-duel" component={FlashcardDuel}/>
      <Route path="/planb" component={PlanB}/>
      <Route path="/planb-webinars" component={PlanBWebinarsHub}/>
      <Route path="/excel-quiz" component={ExcelQuiz}/>
      <Route path="/excel-orientation" component={ExcelOrientation}/>
      <Route path="/career-quiz" component={CareerQuizComingSoon}/>
      <Route path="/subject-recommender" component={SubjectRecommenderComingSoon}/>
      <Route path="/recorded-classes" component={RecordedClassesComingSoon}/>
      <Route path="/alumni-webinars" component={AlumniWebinarsComingSoon}/>
      <Route path="*" component={LandingPage} />
    </Switch>
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

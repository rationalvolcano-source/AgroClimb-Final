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

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage}/>
      <Route path="/swm" component={StudyWithMe}/>
      <Route path="/wellness" component={WellnessCentre}/>
      <Route path="/books" component={Books}/>
      <Route path="/games" component={Games}/>
      <Route path="/planb" component={PlanB}/>
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

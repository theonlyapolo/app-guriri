import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import MapPage from "@/pages/map";
import Itineraries from "@/pages/itineraries";
import Establishments from "@/pages/establishments";
import Emergency from "@/pages/emergency";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/map" component={MapPage} />
      <Route path="/itineraries" component={Itineraries} />
      <Route path="/establishments" component={Establishments} />
      <Route path="/emergency" component={Emergency} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-surface">
          <Header />
          <main className="pb-20">
            <Router />
          </main>
          <BottomNavigation />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

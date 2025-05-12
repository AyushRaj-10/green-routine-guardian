
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import RemindersPage from "./pages/RemindersPage";
import ChallengesPage from "./pages/ChallengesPage";
import CalculatorPage from "./pages/CalculatorPage";
import FAQPage from "./pages/FAQPage";
import FoundersPage from "./pages/FoundersPage";
import StoryPage from "./pages/StoryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/founders" element={<FoundersPage />} />
          <Route path="/story" element={<StoryPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import RemindersPage from "./pages/RemindersPage";
import ChallengesPage from "./pages/ChallengesPage";
import CalculatorPage from "./pages/CalculatorPage";
import FAQPage from "./pages/FAQPage";
import CommunityPage from "./pages/CommunityPage";
import StoryPage from "./pages/StoryPage";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if we're not on the home page
    if (pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/reminders" element={
              <ProtectedRoute>
                <RemindersPage />
              </ProtectedRoute>
            } />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/community" element={<CommunityPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<NotFound />} />
          <Route path="/services/:service" element={<NotFound />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="/gallery" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/booking" element={<NotFound />} />
          <Route path="/privacy-policy" element={<NotFound />} />
          <Route path="/terms-of-service" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

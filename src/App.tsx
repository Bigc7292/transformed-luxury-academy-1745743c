
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PriceList from "./pages/PriceList";
import Gallery from "./pages/Gallery";
import AboutCeo from "./pages/AboutCeo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/price-list" element={<PriceList />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-kayla" element={<AboutCeo />} />
        <Route path="/services" element={<NotFound />} />
        <Route path="/services/:service" element={<NotFound />} />
        <Route path="/about" element={<NotFound />} />
        <Route path="/contact" element={<NotFound />} />
        <Route path="/booking" element={<NotFound />} />
        <Route path="/privacy-policy" element={<NotFound />} />
        <Route path="/terms-of-service" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

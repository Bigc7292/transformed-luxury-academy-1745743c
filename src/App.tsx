
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import SeoHead from "./components/SeoHead";
import Index from "./pages/Index";
import PriceList from "./pages/PriceList";
import Gallery from "./pages/Gallery";
import AboutCeo from "./pages/AboutCeo";
import ContentPage from "./pages/ContentPage";
import AdminContentPage from "./pages/AdminContentPage";
import AdminAuth from "./pages/AdminAuth";
import AdminInbox from "./pages/AdminInbox";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SeoHead />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/price-list" element={<PriceList />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about-kayla" element={<AboutCeo />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/content/:category" element={<ContentPage />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin/content" element={<AdminContentPage />} />
          <Route path="/admin/inbox" element={<AdminInbox />} />
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
};

export default App;

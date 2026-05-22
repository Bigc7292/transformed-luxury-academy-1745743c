import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Index from './pages/Index';
import AboutCeo from './pages/AboutCeo';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import PriceList from './pages/PriceList';
import AdminAuth from './pages/AdminAuth';
import AdminContentPage from './pages/AdminContentPage';
import AdminInbox from './pages/AdminInbox';
import AdminMediaPage from './pages/AdminMediaPage';
import ContentPage from './pages/ContentPage';
import NotFound from './pages/NotFound';
import ServicesPage from './pages/ServicesPage';
// MediaShowcase is now only accessible through admin
import Partnership from './pages/Partnership';
import Staff from './pages/Staff';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-ceo" element={<AboutCeo />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/price-list" element={<PriceList />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/admin" element={<Navigate to="/admin/auth" replace />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin/content" element={<AdminContentPage />} />
          <Route path="/admin/inbox" element={<AdminInbox />} />
          <Route path="/admin/media" element={<AdminMediaPage />} />
          <Route path="/content/:id" element={<ContentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HelmetProvider>
  );
}

export default App;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import AboutCeo from './pages/AboutCeo';
import Gallery from './pages/Gallery';
import PriceList from './pages/PriceList';
import AdminAuth from './pages/AdminAuth';
import AdminContentPage from './pages/AdminContentPage';
import AdminInbox from './pages/AdminInbox';
import ContentPage from './pages/ContentPage';
import NotFound from './pages/NotFound';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about-ceo" element={<AboutCeo />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/price-list" element={<PriceList />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/admin/auth" element={<AdminAuth />} />
      <Route path="/admin/content" element={<AdminContentPage />} />
      <Route path="/admin/inbox" element={<AdminInbox />} />
      <Route path="/content/:id" element={<ContentPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

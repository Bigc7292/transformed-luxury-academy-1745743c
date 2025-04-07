import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the file with merge conflict
const appTsxPath = path.join(__dirname, '..', 'src', 'App.tsx');

// Read the current content
console.log('Reading file with merge conflicts...');
const currentContent = fs.readFileSync(appTsxPath, 'utf8');

// Create the resolved content by keeping all imports and routes
const resolvedContent = `
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
import MediaShowcase from './pages/MediaShowcase';
import Partnership from './pages/Partnership';
import Staff from './pages/Staff';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about-ceo" element={<AboutCeo />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/price-list" element={<PriceList />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/media-showcase" element={<MediaShowcase />} />
      <Route path="/partnership" element={<Partnership />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/admin/auth" element={<AdminAuth />} />
      <Route path="/admin/content" element={<AdminContentPage />} />
      <Route path="/admin/inbox" element={<AdminInbox />} />
      <Route path="/content/:id" element={<ContentPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
`;

// Write the resolved content back to the file
console.log('Writing resolved content...');
fs.writeFileSync(appTsxPath, resolvedContent);

// Mark the file as resolved using git add
console.log('Marking file as resolved with git add...');
try {
  execSync('git add src/App.tsx', { stdio: 'inherit' });
  console.log('Merge conflict in App.tsx has been resolved successfully!');
} catch (error) {
  console.error('Error marking file as resolved:', error);
}

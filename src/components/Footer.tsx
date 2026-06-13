import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Smartphone } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa'; // Import Instagram icon from react-icons
import { usePWAInstall } from '../hooks/usePWAInstall';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isInstallable, installApp } = usePWAInstall();

  return (
    <footer className="bg-black border-t border-gold-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-6">
              <div className="text-2xl font-serif text-gold-500 tracking-wider">
                Transformed<span className="font-cursive ml-1">Academy</span>
              </div>
            </Link>
            <p className="text-zinc-400 mb-6 text-sm">
              Premium aesthetic treatments to enhance your natural beauty. Our salon combines artistry with medical expertise.
            </p>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/transformedacademy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram"
                style={{ color: '#E1306C', fontSize: '24px', margin: '0 10px' }} // Instagram color and styling
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif text-gold-700 mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-gold-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-gold-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-zinc-400 hover:text-gold-500 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-zinc-400 hover:text-gold-500 transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-400 hover:text-gold-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif text-gold-700 mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin size={20} className="text-gold-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-zinc-400">Unit R05 Cardiff Bay Business Centre, CF24 5BS</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gold-500 mr-2 flex-shrink-0" />
                <a href="tel:+447716402303" className="text-zinc-400 hover:text-gold-500 transition-colors">+447716402303</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gold-500 mr-2 flex-shrink-0" />
                <a href="mailto:info@transformedacademy.com" className="text-zinc-400 hover:text-gold-500 transition-colors">info@transformedacademy.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif text-gold-700 mb-6">Install Our App</h3>
            <p className="text-zinc-400 mb-4 text-xs sm:text-sm leading-relaxed">
              Scan the code below or tap to save Transformed Academy directly to your phone's home screen as a standalone application.
            </p>
            <div className="flex gap-3 items-center">
              <button
                type="button"
                onClick={installApp}
                className="w-20 h-20 bg-white p-1 rounded-lg border border-gold-500/20 shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300 relative group"
                aria-label="Install App"
              >
                <img src="/app-qrcode.png" alt="Scan to Install" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                  <Smartphone className="w-5 h-5 text-gold-400" />
                </div>
              </button>
              <div className="text-[11px] text-zinc-400 space-y-1">
                <button 
                  onClick={installApp} 
                  className="font-semibold text-gold-400 hover:text-gold-300 underline block text-left cursor-pointer"
                >
                  Scan or Tap to Install
                </button>
                <p>1. Scan or tap the QR code</p>
                <p>2. Choose 'Install' or 'Add to Home screen'</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Transformed Academy and Salon. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm justify-center md:justify-end">
            <Link to="/privacy-policy" className="text-zinc-500 hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-zinc-500 hover:text-gold-500 transition-colors">Terms of Service</Link>
            <Link to="/complaints-policy" className="text-zinc-500 hover:text-gold-500 transition-colors">Complaints Policy</Link>
            <Link to="/clinical-risk-assessment" className="text-zinc-500 hover:text-gold-500 transition-colors">Clinical Risk Assessment</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

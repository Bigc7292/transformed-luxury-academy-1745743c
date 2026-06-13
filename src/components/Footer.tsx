import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Smartphone, X } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa'; // Import Instagram icon from react-icons
import { usePWAInstall } from '../hooks/usePWAInstall';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isInstallable, installApp, showInstallGuide, setShowInstallGuide, isAndroid, isIOS, isInApp } = usePWAInstall();

  // Track the timestamp when the modal is opened to guard against mobile tap-through/ghost clicks
  const modalOpenTime = React.useRef<number>(0);
  React.useEffect(() => {
    if (showInstallGuide) {
      modalOpenTime.current = Date.now();
    }
  }, [showInstallGuide]);


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

      {/* PWA Custom Installation Guide Modal */}
      <AnimatePresence>
        {showInstallGuide && (
          <motion.div
            key="pwa-install-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              // Prevent closing immediately if tapped within 400ms (avoids mobile ghost clicks)
              if (Date.now() - modalOpenTime.current < 400) return;
              setShowInstallGuide(false);
            }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-gold-500/30 w-full max-w-md rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl cursor-default"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowInstallGuide(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-gold-400 p-1 rounded-full bg-zinc-900 border border-zinc-800 transition-all cursor-pointer"
                aria-label="Close guide"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gold-950/50 border border-gold-500/30">
                  <Smartphone className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-gold-200">How to Install App</h4>
                  <p className="text-xs text-zinc-400 font-mono">Transformed Academy & Salon</p>
                </div>
              </div>

              {/* Guide Contents */}
              <div className="space-y-6 text-sm leading-relaxed">
                {isInApp ? (
                  <div className="bg-gold-950/10 border border-gold-500/20 p-4 rounded-xl space-y-3">
                    <p className="text-gold-300 font-medium text-xs uppercase tracking-wider font-mono">In-App Browser Detected</p>
                    <p className="text-zinc-300 text-xs">
                      You are currently browsing inside a chat app (like WhatsApp or Instagram). To install this application:
                    </p>
                    <ol className="list-decimal list-inside text-zinc-400 text-xs space-y-1.5 font-sans">
                      <li>Tap the menu button <span className="font-semibold text-white">···</span> or <span className="font-semibold text-white">⋮</span> in the top-right corner.</li>
                      <li>Select <span className="font-semibold text-gold-400">"Open in Chrome"</span> (Android) or <span className="font-semibold text-gold-400">"Open in Safari"</span> (iOS).</li>
                      <li>Once open in Chrome/Safari, tap the install prompt or QR code again.</li>
                    </ol>
                  </div>
                ) : isIOS ? (
                  <div className="space-y-4">
                    <p className="text-zinc-300">
                      Follow these steps in your Safari browser to save the app:
                    </p>
                    <div className="space-y-3 font-sans">
                      <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                        <p className="text-zinc-300 text-xs sm:text-sm">
                          Tap the <span className="font-semibold text-gold-400">Share button</span> (square icon with an arrow pointing up) at the bottom of the screen.
                        </p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                        <p className="text-zinc-300 text-xs sm:text-sm">
                          Scroll down and tap <span className="font-semibold text-gold-400">"Add to Home Screen"</span>.
                        </p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                        <p className="text-zinc-300 text-xs sm:text-sm">
                          Tap <span className="font-semibold text-gold-400">"Add"</span> in the top right to install it on your home screen.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-zinc-300">
                      Follow these steps in Chrome/Android browser to install:
                    </p>
                    <div className="space-y-3 font-sans">
                      <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                        <p className="text-zinc-300 text-xs sm:text-sm">
                          Tap the browser menu button <span className="font-semibold text-white">⋮</span> in the top-right corner.
                        </p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                        <p className="text-zinc-300 text-xs sm:text-sm">
                          Select <span className="font-semibold text-gold-400">"Install App"</span> or <span className="font-semibold text-gold-400">"Add to Home screen"</span>.
                        </p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                        <p className="text-zinc-300 text-xs sm:text-sm">
                          Confirm the installation. The app will be saved directly to your phone.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Button */}
              <button
                type="button"
                onClick={() => setShowInstallGuide(false)}
                className="w-full mt-8 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-semibold text-sm tracking-wider uppercase transition-colors duration-300 cursor-pointer"
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;

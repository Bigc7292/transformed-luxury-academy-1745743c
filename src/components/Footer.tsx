import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa'; // Import Instagram icon from react-icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-salon-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-6">
              <div className="text-2xl font-serif text-salon-pink-500 tracking-wider">
                Transformed<span className="font-cursive ml-1">Academy</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-6">
              Premium aesthetic treatments to enhance your natural beauty. Our salon combines artistry with medical expertise.
            </p>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/aestheticstraininghereford?igsh=MWp1dzlmeHU4cXRmbw=="
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
            <h3 className="text-lg font-serif text-salon-pink-700 mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-600 hover:text-salon-pink-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-salon-pink-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-salon-pink-500 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-600 hover:text-salon-pink-500 transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-salon-pink-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif text-salon-pink-700 mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/services/lip-fillers" className="text-gray-600 hover:text-salon-pink-500 transition-colors">Lip Fillers</Link>
              </li>
              <li>
                <Link to="/services/botox" className="text-gray-600 hover:text-salon-pink-500 transition-colors">Botox</Link>
              </li>
              <li>
                <Link to="/services/dermal-fillers" className="text-gray-600 hover:text-salon-pink-500 transition-colors">Dermal Fillers</Link>
              </li>
              <li>
                <Link to="/services/jawline-fillers" className="text-gray-600 hover:text-salon-pink-500 transition-colors">Jawline Fillers</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-salon-pink-500 transition-colors">View All Services</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif text-salon-pink-700 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-salon-pink-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">SALONS IN HEREFORD AND CARDIFF 
                  38 WIDEMARSH STREET HEREFORD HR4 9EP</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-salon-pink-500 mr-2 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-salon-pink-500 transition-colors">+447716402303</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-salon-pink-500 mr-2 flex-shrink-0" />
                <a href="mailto:info@transformedacademy.com" className="text-gray-600 hover:text-salon-pink-500 transition-colors">info@transformedacademy.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-salon-pink-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Transformed Academy and Salon. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-salon-pink-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-salon-pink-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

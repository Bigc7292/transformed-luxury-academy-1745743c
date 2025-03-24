
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const serviceDropdown = [
    { name: "Lip Fillers", path: "/services/lip-fillers" },
    { name: "Botox", path: "/services/botox" },
    { name: "Dermal Fillers", path: "/services/dermal-fillers" },
    { name: "Jawline Fillers", path: "/services/jawline-fillers" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-serif text-salon-pink-500 tracking-wider">
                Transformed<span className="font-cursive ml-1">Academy</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              item.name === "Services" ? (
                <div key={index} className="relative group">
                  <button className="flex items-center text-salon-pink-800 hover:text-salon-pink-500 transition-colors group-hover:text-salon-pink-500">
                    Services <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left z-50 invisible group-hover:visible">
                    {serviceDropdown.map((service, idx) => (
                      <Link
                        key={idx}
                        to={service.path}
                        className="block px-4 py-3 text-sm text-salon-pink-800 hover:bg-salon-pink-50 border-b border-salon-pink-100 last:border-b-0"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="text-salon-pink-800 hover:text-salon-pink-500 transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link
              to="/booking"
              className="bg-salon-pink-400 text-white px-5 py-2 rounded-full hover:bg-salon-pink-500 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-salon-pink-800 hover:text-salon-pink-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out transform ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden bg-white`}>
        <div className="px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item, index) => (
            item.name === "Services" ? (
              <div key={index} className="py-2">
                <div className="flex items-center justify-between text-salon-pink-800 py-2">
                  <span>Services</span>
                  <ChevronDown size={16} />
                </div>
                <div className="pl-4 py-2 space-y-2">
                  {serviceDropdown.map((service, idx) => (
                    <Link
                      key={idx}
                      to={service.path}
                      className="block text-salon-pink-600 hover:text-salon-pink-500 py-2"
                      onClick={toggleMenu}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={index}
                to={item.path}
                className="block text-salon-pink-800 hover:text-salon-pink-500 py-3 border-b border-salon-pink-100 last:border-b-0"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            )
          ))}
          <div className="pt-2">
            <Link
              to="/booking"
              className="block w-full text-center bg-salon-pink-400 text-white px-5 py-3 rounded-full hover:bg-salon-pink-500 transition-colors"
              onClick={toggleMenu}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

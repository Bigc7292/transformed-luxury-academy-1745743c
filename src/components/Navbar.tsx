
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { BOOKING_URL } from '../data/serviceCategories';
import InstallPrompt from '@/components/InstallPrompt';

interface SubItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path: string;
  hasSubmenu?: boolean;
  submenu?: SubItem[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Handle scroll events for navbar appearance
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

    // When opening the menu, ensure body doesn't scroll
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleNavigation = (path: string) => {
    // Simply navigate to the path - no need for hash handling with separate pages
    navigate(path);
    setIsOpen(false);

    // Reset body overflow when closing the menu
    document.body.style.overflow = '';
  };

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Meet the CEO Kayla", path: "/about-ceo" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Admin Login", path: "/admin/auth" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-gold-500/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src="/logo-hq.jpg"
                alt="Transformed Academy Logo"
                className="h-18 w-auto transition-transform duration-300 group-hover:scale-105"
                style={{ height: '4.5rem', borderRadius: '50%' }}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              item.hasSubmenu ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="relative group">
                  <button
                    type="button"
                    className="flex items-center text-gold-400 hover:text-gold-300 transition-colors group-hover:text-gold-300"
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    {item.name} <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-black/95 border border-gold-500/20 shadow-lg rounded-md overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left z-50 invisible group-hover:visible">
                    {item.submenu.map((subItem) => (
                      <button
                        type="button"
                        key={`submenu-item-${item.name}-${subItem.name}`}
                        onClick={() => handleNavigation(subItem.path)}
                        className="block w-full text-left px-4 py-3 text-sm text-gold-400 hover:bg-gold-500/10 border-b border-gold-500/20 last:border-b-0"
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  key={`nav-item-${item.name}`}
                  onClick={() => handleNavigation(item.path)}
                  className="text-gold-400 hover:text-gold-300 transition-colors"
                >
                  {item.name}
                </button>
              )
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 text-black px-5 py-2 rounded-full hover:bg-gold-400 transition-colors inline-block font-semibold"
            >
              Book Now
            </a>
            <InstallPrompt />
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gold-400 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500 p-2 rounded-md"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${isOpen ? 'max-h-screen opacity-100 shadow-lg' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden bg-black/95 border-b border-gold-500/20`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navItems.map((item) => (
            item.hasSubmenu ? (
              <div key={`mobile-submenu-${item.name}`} className="py-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-gold-400 py-3 cursor-pointer rounded-md hover:bg-gold-500/10 px-3"
                  onClick={() => toggleSubmenu(item.name)}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSubmenu(item.name)}
                  aria-expanded={openSubmenu === item.name}
                  aria-controls={`submenu-${item.name}`}
                >
                  <span className="text-lg font-medium">{item.name}</span>
                  <ChevronDown size={20} className={`transition-transform duration-200 ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id={`submenu-${item.name}`}
                  className={`pl-4 py-2 space-y-2 ${openSubmenu === item.name ? 'block animate-slide-down' : 'hidden'}`}
                >
                  {item.submenu.map((subItem) => (
                    <button
                      type="button"
                      key={`mobile-submenu-item-${item.name}-${subItem.name}`}
                      onClick={() => handleNavigation(subItem.path)}
                      className="block w-full text-left text-gold-400 hover:text-gold-300 py-3 px-3 rounded-md hover:bg-gold-500/10 text-base"
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                type="button"
                key={`mobile-nav-item-${item.name}`}
                onClick={() => handleNavigation(item.path)}
                className="block w-full text-left text-gold-400 hover:text-gold-300 py-4 px-3 border-b border-gold-500/20 last:border-b-0 text-lg font-medium rounded-md hover:bg-gold-500/10 my-1"
              >
                {item.name}
              </button>
            )
          ))}
          <div className="pt-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gold-500 text-black px-5 py-4 rounded-full hover:bg-gold-400 transition-colors text-lg font-semibold mt-4 shadow-md"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

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
    if (path.includes('#')) {
      const [routePath, hash] = path.split('#');

      if (window.location.pathname === '/services' && routePath === '/services') {
        // We're already on the services page, just need to switch tabs
        // Update the URL hash for consistency
        window.location.hash = hash;

        // Scroll to the section with a slight delay to ensure the component is ready
        setTimeout(() => {
          const section = document.getElementById(`${hash}-section`);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            // Adjust scroll position to account for fixed header
            setTimeout(() => window.scrollBy(0, -120), 100);
          }
        }, 50);

        setIsOpen(false);
        return;
      }

      // We need to navigate to the services page first, then handle the hash
      // Store the hash in sessionStorage so we can retrieve it after navigation
      sessionStorage.setItem('pendingHash', hash);
      navigate(routePath);

      // For mobile devices, add an additional delay and scroll handling
      if (window.innerWidth < 768) {
        setTimeout(() => {
          const section = document.getElementById(`${hash}-section`);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            // Adjust scroll position to account for fixed header
            setTimeout(() => window.scrollBy(0, -120), 100);
          }
        }, 500); // Longer delay for mobile to ensure page is loaded
      }
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services", hasSubmenu: true, submenu: [
      { name: "Hair", path: "/services#hair" },
      { name: "Aesthetics", path: "/services#aesthetics" },
      { name: "Non-Surgical", path: "/services#non-surgical" },
      { name: "Beauty Treatments", path: "/services#beauty-treatments" },
      { name: "Training Services", path: "/services#training" },
    ] },
    {
      name: "Meet the Team",
      path: "#",
      hasSubmenu: true,
      submenu: [
        { name: "Meet Kayla CEO", path: "/about-ceo" },
        { name: "Partnership with Dr. Martin", path: "/partnership" },
        { name: "Our Staff", path: "/staff" },
      ]
    },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Admin Login", path: "/admin/auth" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src="/lovable-uploads/f0b45bba-4b33-4147-99b0-bf9d1335bbd9.png"
                alt="Transformed Academy Logo"
                className="h-18 w-auto transition-transform duration-300 group-hover:scale-105"
                style={{ height: '4.5rem' }}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              item.hasSubmenu ? (
                <div key={index} className="relative group">
                  <button
                    type="button"
                    className="flex items-center text-salon-pink-800 hover:text-salon-pink-500 transition-colors group-hover:text-salon-pink-500"
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    {item.name} <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left z-50 invisible group-hover:visible">
                    {item.submenu.map((subItem, idx) => (
                      <button
                        type="button"
                        key={`submenu-item-${item.name}-${subItem.name}`}
                        onClick={() => handleNavigation(subItem.path)}
                        className="block w-full text-left px-4 py-3 text-sm text-salon-pink-800 hover:bg-salon-pink-50 border-b border-salon-pink-100 last:border-b-0"
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
                  className="text-salon-pink-800 hover:text-salon-pink-500 transition-colors"
                >
                  {item.name}
                </button>
              )
            ))}
            <a
              href="https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-salon-pink-400 text-white px-5 py-2 rounded-full hover:bg-salon-pink-500 transition-colors inline-block"
            >
              Book Now
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-salon-pink-800 hover:text-salon-pink-500 focus:outline-none focus:ring-2 focus:ring-salon-pink-300 p-2 rounded-md"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${isOpen ? 'max-h-screen opacity-100 shadow-lg' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden bg-white`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navItems.map((item, index) => (
            item.hasSubmenu ? (
              <div key={`mobile-submenu-${item.name}`} className="py-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-salon-pink-800 py-3 cursor-pointer rounded-md hover:bg-salon-pink-50 px-3"
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
                  {item.submenu.map((subItem, idx) => (
                    <button
                      type="button"
                      key={`mobile-submenu-item-${item.name}-${subItem.name}`}
                      onClick={() => handleNavigation(subItem.path)}
                      className="block w-full text-left text-salon-pink-600 hover:text-salon-pink-500 py-3 px-3 rounded-md hover:bg-salon-pink-50 text-base"
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
                className="block w-full text-left text-salon-pink-800 hover:text-salon-pink-500 py-4 px-3 border-b border-salon-pink-100 last:border-b-0 text-lg font-medium rounded-md hover:bg-salon-pink-50 my-1"
              >
                {item.name}
              </button>
            )
          ))}
          <div className="pt-2">
            <a
              href="https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-salon-pink-400 text-white px-5 py-4 rounded-full hover:bg-salon-pink-500 transition-colors text-lg font-medium mt-4 shadow-md"
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

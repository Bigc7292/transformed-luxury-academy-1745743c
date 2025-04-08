
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
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
      } else {
        // We need to navigate to the services page first, then handle the hash
        // Store the hash in sessionStorage so we can retrieve it after navigation
        sessionStorage.setItem('pendingHash', hash);
        navigate(routePath);
      }
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
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
                    className="flex items-center text-salon-pink-800 hover:text-salon-pink-500 transition-colors group-hover:text-salon-pink-500"
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    {item.name} <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left z-50 invisible group-hover:visible">
                    {item.submenu.map((subItem, idx) => (
                      <button
                        key={idx}
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
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="text-salon-pink-800 hover:text-salon-pink-500 transition-colors"
                >
                  {item.name}
                </button>
              )
            ))}
            <button
              onClick={() => handleNavigation('/booking')}
              className="bg-salon-pink-400 text-white px-5 py-2 rounded-full hover:bg-salon-pink-500 transition-colors"
            >
              Book Now
            </button>
          </div>

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

      <div className={`md:hidden transition-all duration-300 ease-in-out transform ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden bg-white`}>
        <div className="px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item, index) => (
            item.hasSubmenu ? (
              <div key={index} className="py-2">
                <div
                  className="flex items-center justify-between text-salon-pink-800 py-2 cursor-pointer"
                  onClick={() => toggleSubmenu(item.name)}
                >
                  <span>{item.name}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                </div>
                <div className={`pl-4 py-2 space-y-2 ${openSubmenu === item.name ? 'block' : 'hidden'}`}>
                  {item.submenu.map((subItem, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavigation(subItem.path)}
                      className="block w-full text-left text-salon-pink-600 hover:text-salon-pink-500 py-2"
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="block w-full text-left text-salon-pink-800 hover:text-salon-pink-500 py-3 border-b border-salon-pink-100 last:border-b-0"
              >
                {item.name}
              </button>
            )
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavigation('/booking')}
              className="block w-full text-center bg-salon-pink-400 text-white px-5 py-3 rounded-full hover:bg-salon-pink-500 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

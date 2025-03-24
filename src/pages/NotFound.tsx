
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlitterHearts from "../components/GlitterHearts";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-salon-pink-50">
      <Navbar />
      <GlitterHearts />
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-serif font-bold mb-4 text-salon-pink-500">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! We couldn't find the page you're looking for.</p>
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-salon-pink-100 blur-2xl rounded-full opacity-50 transform -rotate-12"></div>
            <Link to="/" className="btn-primary inline-flex">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;



import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  // Animation variants for text sweep effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const wordVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50, // Even words come from left, odd from right
    }),
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
      }
    }
  };

  // The words to be animated
  const animatedText = [
    "Premium", "Advanced", "Aesthetics", "Treatments,", "Skin",
    "Analysis", "Specialist,", "Hair", "Care", "Treatments",
    "And", "Fully", "Qualified", "Level", "5", "Educator"
  ];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gold-50 to-white">
      <div className="absolute inset-0">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<div className="absolute inset-0 bg-[url('/lovable-uploads/9a85e5ad-72e9-470b-bf98-bcd2ebda3d43.png')] bg-center bg-cover opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gold-800 mt-2 leading-tight">Transformed <span className="text-gold-500">Academy and Salon</span></h1>

              {/* Animated sweeping text */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="mt-6 flex flex-wrap justify-center lg:justify-start"
              >
                {animatedText.map((word, i) => (
                  <motion.span
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={i}
                    custom={i}
                    variants={wordVariants}
                    className="text-lg text-gray-600 mr-2 mb-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Consultation
              </a>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  // Navigate to the main services page
                  navigate('/services');
                }}
              >
                Explore Services
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8"
            >
              <div className="text-center px-4">
                <p className="text-3xl font-serif text-gold-500">500+</p>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<div className="hidden sm:block h-10 w-px bg-gold-200"></div>
              <div className="text-center px-4">
                <p className="text-3xl font-serif text-gold-500">15+</p>
                <p className="text-sm text-gray-500">Expert Services</p>
              </div>
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<div className="hidden sm:block h-10 w-px bg-gold-200"></div>
              <div className="text-center px-4">
                <p className="text-3xl font-serif text-gold-500">10+</p>
                <p className="text-sm text-gray-500">Years Experience</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <img
                src="/lovable-uploads/decb2b79-3774-449a-b7b7-479a89096676.png"
                alt="Transformed Academy Salon"
                className="rounded-lg shadow-2xl w-full h-64 sm:h-80 md:h-96 object-cover"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white p-2 sm:p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold-200 border-2 border-white flex items-center justify-center overflow-hidden">
                        <span className="text-xs text-gold-500">C{i}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">Our certified experts</p>
                    <p className="text-xs text-gray-500">Transform with confidence</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<div className="absolute top-1/3 -right-12 w-40 h-40 bg-gold-100 rounded-full blur-3xl opacity-50"></div>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<div className="absolute bottom-1/4 -left-12 w-32 h-32 bg-zinc-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Hero;

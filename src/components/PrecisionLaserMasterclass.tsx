import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Sparkles, Cpu, Award, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BOOKING_URL } from '../data/serviceCategories';

export const PrecisionLaserMasterclass: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  // Curriculum Data
  const pillars = [
    {
      title: "Technical Command & Clinical Science",
      icon: Cpu,
      modules: [
        {
          name: "Advanced Machine Mastery",
          detail: "Master premium maintenance protocols to eliminate downtime and protect your clinical asset."
        },
        {
          name: "Multi-Fiber Optimization",
          detail: "Learn the exact science of deploying the 3 distinct fibers across various tissue types and specialized regions."
        }
      ]
    },
    {
      title: "Premium Client Comfort & Treatment Execution",
      icon: Sparkles,
      modules: [
        {
          name: "Advanced Comfort Protocols",
          detail: "Learn to expertly administer Lidocaine utilizing an advanced cannula technique, ensuring a completely painless, premium experience."
        },
        {
          name: "Full-Body Aesthetics",
          detail: "Precision protocols across multiple anatomical zones, customizing energy delivery for ultimate safety and results."
        }
      ]
    },
    {
      title: "Luxury Business Architecture & Guidance",
      icon: Award,
      modules: [
        {
          name: "High-Tier Marketing & Pricing",
          detail: "Position your new treatment as a premium luxury service with verified, high-margin pricing architectures."
        },
        {
          name: "Regulatory & Insurance Alignment",
          detail: "Secure elite coverage smoothly with direct access to top industry insurers recognizing this CPD certification."
        },
        {
          name: "Continuous Mentorship",
          detail: "Benefit from lifetime, direct-line support as you build your market reputation."
        }
      ]
    }
  ];

  // Starter Suite Data
  const starterSuite = [
    {
      title: "Precision Laser Machine",
      desc: "A premium, medical-grade elite system designed for high performance, maximum safety, and pristine outcomes.",
      icon: Zap,
    },
    {
      title: "3 Advanced Laser Fibers",
      desc: "Expand your capability across various specialized body zones and specialized clinical needs.",
      icon: Cpu,
    },
    {
      title: "1-Year Full Warranty",
      desc: "Total operational security and absolute peace of mind as you scale your advanced aesthetics practice.",
      icon: Shield,
    },
    {
      title: "PPE & Professional Tools",
      desc: "Complete medical-grade safety wear for practitioner and client, plus specialized machine maintenance tools.",
      icon: Wrench,
    },
  ];

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="bg-neutral-950 text-white rounded-3xl border border-gold-500/20 overflow-hidden my-16 shadow-2xl relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-950/10 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Main Inner Wrapper */}
      <div className="px-6 py-12 md:py-20 max-w-6xl mx-auto relative z-10">
        
        {/* Brand Logos & Accredited Badge */}
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="text-[10px] tracking-[0.25em] font-serif border border-gold-500/40 text-gold-400 bg-gold-950/20 px-4 py-1.5 rounded-full shadow-lg shadow-gold-950/30 uppercase font-semibold">
              CPD Accredited Course
            </div>
          </motion.div>

          <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
            <div className="text-center md:text-right">
              <span className="block text-xs uppercase tracking-widest text-zinc-400">Accredited Device</span>
              <span className="font-serif text-sm tracking-wider text-gold-500 font-semibold">PRECISION SIGNATURE UK</span>
            </div>
            <div className="w-px h-8 bg-zinc-800 hidden sm:block" />
            <div className="text-center md:text-left">
              <span className="block text-xs uppercase tracking-widest text-zinc-400">Elite Training By</span>
              <span className="font-serif text-sm tracking-wider text-gold-500 font-semibold">TRANSFORMED ACADEMY HQ</span>
            </div>
          </div>
        </div>

        {/* Masterclass Hero Title */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-gold-600 tracking-wide mb-4 leading-tight">
            PRECISION LASER MASTERCLASS
          </h2>
          <p className="text-base md:text-xl font-serif italic text-gold-200/80 tracking-wider mb-8 max-w-2xl mx-auto">
            The Elite Training Program for High-Achieving Aesthetics Professionals
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto mb-8" />
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Elevate your clinic’s offerings and master the fine art of advanced laser treatments. 
            This prestigious course is custom-tailored for ambitious practitioners who refuse to 
            settle for average, providing the high-tier theoretical depth, hands-on masterclass 
            training, and state-of-the-art equipment needed to deliver flawless client transformations.
          </p>
        </motion.div>

        {/* The Starter Suite Section */}
        <div className="mb-20">
          <div className="border-l-2 border-gold-500 pl-4 mb-8">
            <h3 className="text-lg md:text-xl font-serif text-gold-500 tracking-wider uppercase">
              The Complete Premium Starter Suite
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm mt-1">
              Everything you need to step immediately into a high-revenue laser operation. Your tuition completely covers your clinical toolkit:
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {starterSuite.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={`suite-${index}`}
                  variants={cardVariants}
                  whileHover={{ y: -6, borderColor: "rgba(212, 175, 55, 0.4)" }}
                  className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl transition-all duration-300 flex flex-col h-full shadow-lg relative group overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold-950/20 rounded-full group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="p-3 rounded-xl bg-gold-950/40 border border-gold-500/20 text-gold-400 w-fit mb-5 relative z-10">
                    <IconComp className="w-5 h-5" />
                  </div>
                  
                  <h4 className="font-serif text-base text-gold-200 mb-3 tracking-wide relative z-10">
                    {item.title}
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed flex-grow relative z-10">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Elite Curriculum Overview */}
        <div className="mb-20">
          <div className="border-l-2 border-gold-500 pl-4 mb-8">
            <h3 className="text-lg md:text-xl font-serif text-gold-500 tracking-wider uppercase">
              Elite Curriculum Overview
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm mt-1">
              Deepen your theoretical base and master hands-on clinic execution with our structured three-tier curriculum.
            </p>
          </div>

          {/* Curriculum Pillars Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-8">
            {pillars.map((pillar, idx) => {
              const TabIcon = pillar.icon;
              const isActive = activePillar === idx;
              return (
                <button
                  key={`pillar-tab-${idx}`}
                  type="button"
                  onClick={() => setActivePillar(idx)}
                  className={`flex items-center gap-3 p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "bg-gold-950/30 border-gold-500/60 text-gold-200 shadow-md shadow-gold-950/20" 
                      : "bg-zinc-900/30 border-zinc-800/80 text-zinc-400 hover:border-zinc-700/80 hover:text-zinc-300"
                  }`}
                >
                  <div className={`p-2 rounded-lg border ${
                    isActive 
                      ? "bg-gold-500 text-black border-gold-400" 
                      : "bg-zinc-800/60 border-zinc-700/60 text-zinc-400"
                  }`}>
                    <TabIcon className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-xs md:text-sm tracking-wide font-medium leading-snug">
                    {idx + 1}. {pillar.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Box */}
          <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-6 md:p-8 min-h-[220px] flex flex-col justify-center shadow-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={`pillar-content-${activePillar}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {pillars[activePillar].modules.map((mod, modIdx) => (
                  <div key={`mod-${modIdx}`} className="flex gap-4 items-start">
                    <div className="w-5 h-5 rounded-full bg-gold-950/50 border border-gold-500/30 text-gold-400 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 shadow-md">
                      ✦
                    </div>
                    <div>
                      <h5 className="text-gold-200 font-semibold font-serif text-sm md:text-base tracking-wide mb-1">
                        {mod.name}
                      </h5>
                      <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                        {mod.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* The Learning Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="border-l-2 border-gold-500 pl-4">
              <h3 className="text-lg md:text-xl font-serif text-gold-500 tracking-wider uppercase">
                The Learning Experience
              </h3>
            </div>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Our training blends deep, thorough theoretical science with high-fidelity supervised practice. You will get essential hands-on training working on <strong className="text-gold-300">live models</strong> under the guidance of leading clinical educators to ensure absolute confidence upon graduation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-zinc-900/30 border border-zinc-800/40 p-4 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-xs text-zinc-300">Supervised Live Models</span>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900/30 border border-zinc-800/40 p-4 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-xs text-zinc-300">Top-Tier Clinical Educators</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative group"
          >
            {/* Visual border wrapper */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-600/30 to-transparent rounded-2xl filter blur-sm group-hover:blur-md transition-all duration-300" />
            <div className="relative rounded-2xl border border-gold-500/30 overflow-hidden shadow-2xl bg-zinc-950">
              <img 
                src="/precision-laser-machine.png" 
                alt="Precision Laser Machine training equipment" 
                className="w-full h-auto object-cover max-h-[300px] md:max-h-[360px] opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* CTA Section - Begin Your Journey to Excellence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 border border-gold-500/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Subtle gold gradient line at top */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
          
          <h3 className="text-2xl md:text-3xl font-serif text-gold-400 mb-4 tracking-wide">
            Begin Your Journey to Excellence
          </h3>
          <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto mb-8">
            Investment should never stand in the way of ambition. <strong>Flexible payment options are available</strong> to let you distribute your investment while launching your ultimate aesthetics career.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-semibold text-sm tracking-wider uppercase hover:shadow-lg hover:shadow-gold-500/20 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Enroll In Masterclass
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

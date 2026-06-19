'use client';

import { 
  Building2, 
  GraduationCap, 
  Microscope, 
  Sprout, 
  Stethoscope, 
  BadgeCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const clienteleInstitutes = [
  "IARI Pusa",
  "IIT",
  "National Institute of immunology for Cellular Endocrinology Lab. New Delhi",
  "National Institute of Pharmaceutical Education & Research Institute",
  "Thapar Research Institute of Engg. & Tech.",
  "The Energy & Research Institute Lodhi Road New Delhi",
  "Haryana Agril. University, Hissar",
  "Punjab Agril. University, Ludhiana",
  "National Institute of Pharmaceutical Educational & Research, Mohali",
  "Postgraduate Institute of Medical Education & Research, Chandigarh",
  "Punjabi University, Patiala",
  "Doaba College",
  "CIPHET, Ludhiana",
  "Kanya Mahavidhyalaya, Jalandhar",
  "Guru Nanak Dev University, Amritsar",
  "Guru Jambeshwar University, Hissar",
  "Jamia Milya Islamia University, New Delhi",
  "Delhi University, New Delhi",
  "G.B. Pant University, Pantnagar",
  "Rajasthan Agril University, Bikaner",
  "Banaras Hindu University, Varanasi",
  "Aligarh Muslim University, Aligarh",
  "International Crop Research Institute of semi Arid tropics (ICRISAT) Hyderabad"
];

// Helper to determine the best icon for the institute based on keywords
const getInstituteIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('medical') || lowerName.includes('health')) return <Stethoscope className="w-6 h-6" />;
  if (lowerName.includes('agril') || lowerName.includes('crop') || lowerName.includes('pantnagar')) return <Sprout className="w-6 h-6" />;
  if (lowerName.includes('lab') || lowerName.includes('research') || lowerName.includes('immunology') || lowerName.includes('pharmaceutical')) return <Microscope className="w-6 h-6" />;
  if (lowerName.includes('university') || lowerName.includes('college') || lowerName.includes('institute') || lowerName.includes('iit')) return <GraduationCap className="w-6 h-6" />;
  return <Building2 className="w-6 h-6" />;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function OurClienteleClient() {
  // Duplicate array for seamless infinite marquee scrolling
  const marqueeItems = [...clienteleInstitutes, ...clienteleInstitutes];

  return (
    <main className="clientele-page min-h-screen bg-[#f8fafc] overflow-hidden">
      
      {/* 1. HERO SECTION (Dark & Premium) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#020617] text-white overflow-hidden z-10">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0852A1] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-[#f3b216] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-[#323373] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8"
            >
              <Award className="text-[#f3b216] w-5 h-5" />
              <span className="text-sm font-semibold tracking-wider uppercase text-white/90">Trusted by the Best</span>
            </motion.div> */}
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]">Clientele</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
            >
              We are proud to serve and partner with some of the most prestigious institutes, universities, and research centers across the country. Our commitment to excellence is reflected in the organizations that trust us.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE TICKER */}
      <div className="bg-[#0852A1] py-4 border-y border-white/10 overflow-hidden flex whitespace-nowrap relative z-20 shadow-xl shadow-blue-900/20">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0852A1] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0852A1] to-transparent z-10"></div>
        
        <motion.div 
          className="flex items-center gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-white/80 font-medium text-lg">
              <BadgeCheck className="w-5 h-5 text-[#f3b216]" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. PREMIUM CLIENT GRID */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#323373] mb-4">Partner Institutes</h2>
              <div className="w-20 h-1.5 bg-[#f3b216] rounded-full"></div>
            </div>
            <p className="text-slate-500 font-medium mt-6 md:mt-0 max-w-md text-right">
              Delivering high-quality dairy and laboratory equipment to empower research and education.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {clienteleInstitutes.map((institute, idx) => {
              // Creating a staggered visual weight effect: every 5th item gets a prominent card
              const isProminent = idx % 5 === 0;
              
              return (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className={`group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden flex flex-col ${isProminent ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white to-slate-50' : ''}`}
                >
                  {/* Decorative glowing background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0852A1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner ${isProminent ? 'bg-[#0852A1] text-white shadow-blue-900/20' : 'bg-blue-50 text-[#0852A1]'}`}>
                    {getInstituteIcon(institute)}
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 relative z-10">
                    <h3 className={`font-bold text-slate-800 leading-snug group-hover:text-[#0852A1] transition-colors duration-300 ${isProminent ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                      {institute}
                    </h3>
                  </div>

                  {/* Decorative Arrow */}
                  <div className="mt-8 flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#f3b216] group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      
      {/* 4. CALL TO ACTION */}
      <section className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Want to join our growing list of partners?</h2>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto text-lg">Contact us today to discuss your laboratory, research, and dairy processing equipment needs.</p>
          <a href="/contact" className="inline-block bg-[#0852A1] hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 hover:shadow-xl">
            Get in Touch
          </a>
        </div>
      </section>

    </main>
  );
}

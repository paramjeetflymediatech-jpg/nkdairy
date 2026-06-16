'use client';

import { CheckCircle2 } from 'lucide-react';


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

export default function OurClienteleClient() {

  return (
    <main className="clientele-page pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm">
            Our Clientele
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We are proud to serve and partner with some of the most prestigious institutes, universities, and research centers in the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clienteleInstitutes.map((institute, idx) => (
            <div 
              key={idx} 
              className="institute-card-page bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-start gap-4 hover:-translate-y-1 hover:shadow-xl hover:border-blue-100 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-inner">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="text-slate-700 font-semibold text-sm leading-relaxed">
                {institute}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

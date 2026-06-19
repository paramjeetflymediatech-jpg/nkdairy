'use client';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Clock, Globe } from 'lucide-react';
import Image from 'next/image';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', productInterest: '', message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Submission failed');
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', productInterest: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Hero Section with Glassmorphism Overlay */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/factory-bg.jpg" // Ensure this image or a similar aesthetic one exists in public/images
            alt="Factory Background"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 font-medium text-sm tracking-widest uppercase backdrop-blur-sm">
            <Globe size={14} /> Global Support
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Great Together</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto drop-shadow">
            Whether you need a customized dairy plant, processing equipment, or a technical consultation, our engineering experts are ready to assist you.
          </p>
        </div>
      </section>

      <section className="relative z-20 -mt-12 container mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 transform transition-all hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Get In Touch</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-sm transition-all duration-300 group-hover:scale-110">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Head Office</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      NK Dairy Equipments<br />
                      119, Ishopur, Delhi Road<br />
                      Near Radha Swami Sat Sang Bhawan<br />
                      Yamuna Nagar, Haryana 135001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-sm transition-all duration-300 group-hover:scale-110">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Phone Numbers</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Mob. No. +91-93551-13913<br />
                      Mob. No. +91-93550-13913
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-sm transition-all duration-300 group-hover:scale-110">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Email Address</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      info@nkdairyequipments.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-sm transition-all duration-300 group-hover:scale-110">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Working Hours</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Monday - Saturday<br />9:00 AM to 6:00 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Google Maps Embed */}
            <div className="bg-white rounded-3xl p-2 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden h-64 relative">
              <iframe 
                src="https://maps.google.com/maps?q=30.1107738,77.2381642&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1rem' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="NK Dairy Equipments Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Send an Inquiry</h3>
                <p className="text-slate-500">Fill out the form below and our sales engineering team will get back to you within 24 hours.</p>
              </div>
              
              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl mb-8 flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
                  <div className="bg-green-100 p-2 rounded-full mt-0.5"><Send size={16} className="text-green-600" /></div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-1">Inquiry Submitted Successfully!</h4>
                    <p className="text-sm">Thank you for contacting us. A confirmation email has been sent to your address. Our team will review your requirements and reach out shortly.</p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="text-green-500 hover:text-green-700 ml-auto p-1">✕</button>
                </div>
              )}
              
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl mb-8 flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
                  <div className="bg-red-100 p-2 rounded-full mt-0.5"><span className="text-red-600 font-bold">!</span></div>
                  <div>
                    <h4 className="font-bold text-red-900 mb-1">Submission Failed</h4>
                    <p className="text-sm">There was an error processing your request. Please try again or contact us directly via email at sales@nkdairy.com.</p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="text-red-500 hover:text-red-700 ml-auto p-1">✕</button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      id="name"
                      required 
                      type="text" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      className="peer w-full bg-transparent border-b-2 border-slate-200 px-0 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition-colors" 
                      placeholder="Full Name"
                    />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600 font-medium">Full Name *</label>
                  </div>
                  <div className="relative group">
                    <input 
                      id="email"
                      required 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      className="peer w-full bg-transparent border-b-2 border-slate-200 px-0 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition-colors" 
                      placeholder="Email Address"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600 font-medium">Email Address *</label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      id="phone"
                      required 
                      type="tel" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                      className="peer w-full bg-transparent border-b-2 border-slate-200 px-0 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition-colors" 
                      placeholder="Phone Number"
                    />
                    <label htmlFor="phone" className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600 font-medium">Phone Number *</label>
                  </div>
                  <div className="relative group">
                    <input 
                      id="company"
                      type="text" 
                      value={formData.company} 
                      onChange={e => setFormData({...formData, company: e.target.value})} 
                      className="peer w-full bg-transparent border-b-2 border-slate-200 px-0 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition-colors" 
                      placeholder="Company Name"
                    />
                    <label htmlFor="company" className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600 font-medium">Company Name</label>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-slate-500 mb-2">Product / Plant of Interest</label>
                  <select 
                    value={formData.productInterest} 
                    onChange={e => setFormData({...formData, productInterest: e.target.value})} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer font-medium"
                  >
                    <option value="">Select a Category...</option>
                    <option value="Milk Processing">Complete Milk Processing Plant</option>
                    <option value="Paneer Plant">Paneer Making Plant</option>
                    <option value="Curd Plant">Curd Making Plant</option>
                    <option value="Ghee/Butter">Ghee & Butter Equipment</option>
                    <option value="Storage Tanks">Storage & Cooling Tanks</option>
                    <option value="Other">Other Equipment</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 pt-6 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>

                <div className="relative group">
                  <textarea 
                    id="message"
                    required 
                    rows={4} 
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    className="peer w-full bg-transparent border-b-2 border-slate-200 px-0 py-3 text-slate-900 placeholder-transparent focus:outline-none focus:border-blue-600 transition-colors resize-none"
                    placeholder="Your Message"
                  ></textarea>
                  <label htmlFor="message" className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600 font-medium">Your Message *</label>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    disabled={status === 'submitting'} 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-10 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 w-full md:w-auto shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                  >
                    {status === 'submitting' ? (
                      <><span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> Sending...</>
                    ) : (
                      <><Send size={20} /> Send Inquiry</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

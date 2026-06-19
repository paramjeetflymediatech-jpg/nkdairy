import React from 'react';
import { Shield, Lock, Eye, FileText, Database, Server } from 'lucide-react';
import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return await getSeoMetadata('/privacy');
}

export default function PrivacyPolicyPage() {

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Hero Section */}
      <div className="bg-[#323373] text-white pt-32 md:pt-40 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6 backdrop-blur-sm">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your privacy is critically important to us. Discover how we protect, manage, and secure your data.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 max-w-4xl mx-auto">

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-500 mb-8 font-medium">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#323373]">
                  <Eye size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">1. Information We Collect</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                At NK Dairy Equipments, we collect various types of information in connection with the services we provide, including:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                <li><strong className="text-slate-700">Personal Information:</strong> Name, email address, phone number, and company details when you submit an inquiry.</li>
                <li><strong className="text-slate-700">Usage Data:</strong> Information about how you use our website, such as IP address, browser type, pages visited, and time spent on pages.</li>
                <li><strong className="text-slate-700">Cookies:</strong> Small data files stored on your device that help us improve your browsing experience.</li>
              </ul>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#323373]">
                  <Database size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">2. How We Use Your Information</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                The information we collect is used in the following ways:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                  <h4 className="font-semibold text-slate-800 mb-2">Service Delivery</h4>
                  <p className="text-sm text-slate-600">To provide, operate, and maintain our website and services efficiently.</p>
                </div>
                <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                  <h4 className="font-semibold text-slate-800 mb-2">Communication</h4>
                  <p className="text-sm text-slate-600">To respond to your inquiries, send quotations, and provide customer support.</p>
                </div>
                <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                  <h4 className="font-semibold text-slate-800 mb-2">Improvement</h4>
                  <p className="text-sm text-slate-600">To understand how users interact with our site and improve functionality.</p>
                </div>
                <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                  <h4 className="font-semibold text-slate-800 mb-2">Marketing</h4>
                  <p className="text-sm text-slate-600">To send promotional emails about new equipment, special offers, or other information.</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#323373]">
                  <Lock size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">3. Data Security</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal information. We use state-of-the-art encryption to protect sensitive information transmitted online. However, no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#323373]">
                  <Server size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">4. Third-Party Services</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#323373]">
                  <FileText size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">5. Contact Us</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                If you have any questions regarding this Privacy Policy, you may contact us using the information below:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <p className="text-slate-700 font-semibold mb-1">NK Dairy Equipments</p>
                <p className="text-slate-600 text-sm mb-1">119, Ishopur, Delhi Road, Near Radha Swami Sat Sang Bhawan</p>
                <p className="text-slate-600 text-sm mb-1">Yamuna Nagar, Haryana 135001</p>
                <p className="text-slate-600 text-sm mb-1">Email: info@nkdairyequipments.com</p>
                <p className="text-slate-600 text-sm">Phone: +91-93550-13913</p>
              </div>
            </section>

          </div>
    </div>
      </div>
    </div>
  );
}

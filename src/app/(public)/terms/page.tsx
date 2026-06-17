import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, Copyright, HelpCircle, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | NK Dairy Equipments',
  description: 'Terms of Service and conditions for using NK Dairy Equipments website and services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Hero Section */}
      <div className="bg-[#1a3a5c] text-white pt-32 md:pt-40 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6 backdrop-blur-sm border border-white/20">
            <Scale size={32} className="text-[#f3b216]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services.
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
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <CheckCircle2 size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">1. Acceptance of Terms</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using the website of NK Dairy Equipments, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <Copyright size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">2. Intellectual Property Rights</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Site and its original content, features, and functionality are owned by NK Dairy Equipments and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <div className="bg-slate-50 border-l-4 border-[#f3b216] p-4 rounded-r-lg mt-4">
                <p className="text-slate-700 text-sm font-medium m-0">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website without our prior written consent.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <FileText size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">3. Products and Services</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                All descriptions of products or product pricing are subject to change at anytime without notice, at our sole discretion. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                We have made every effort to display as accurately as possible the colors and images of our products that appear on the website. We cannot guarantee that your computer monitor's display of any color will be accurate.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <AlertTriangle size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">4. Limitation of Liability</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                In no event shall NK Dairy Equipments, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <Scale size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">5. Governing Law</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <HelpCircle size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 m-0">6. Contact Information</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Questions about the Terms of Service should be sent to us via our contact page or directly at:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <p className="text-slate-700 font-semibold mb-1">NK Dairy Equipments</p>
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

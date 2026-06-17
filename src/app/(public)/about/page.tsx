import { Award, Shield, Target, Users, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import FAQAccordion from '@/components/home/FAQAccordion';

const faqs = [
  { q: "What is the price of dairy processing equipment in India?", a: "Dairy processing equipment price in India depends on the machine type, capacity, and automation level. Small machines used by startups and small dairy units are usually affordable. For large-scale production, high-capacity machines with a high automation level may cost more." },
  { q: "Are small khoya machines available for home use?", a: "Yes, there are small machines for home use as well. It can be used to make khoya, rabri, basundi, condensed milk and other sweets. It generally processes 5-10 litres of milk per batch. It requires minimal manual effort." },
  { q: "How to choose the right capacity of dairy processing equipment?", a: "The capacity of dairy processing equipment should match your daily milk production. For example, if you process 200 litres of milk, then choose equipment which is designed for 200-300 litres. It will handle peak production without overloading." },
  { q: "What is the list of essential dairy processing equipment?", a: "Dairy processing equipment list usually includes milk pasteurizers, cream pasteurizers, juice pasteurizers, cream separators, butter churners, homogenizers, milk storage plant, milk cooler, paneer pressers, milk packaging machines and Khoya/Mawa machine and curd/yoghurt making machine." },
  { q: "How much power is required for these machines to run?", a: "Well, these machines are able to function on a 1HP motor, which only requires a single-phase power supply of 220- 240 volts." },
  { q: "How often should I clean the dairy processing equipment?", a: "It depends on your production scale; generally, they are meant to be cleaned after every production cycle, with raw milk tanks emptied and sanitized at least every 72 hours to maintain hygiene and prevent bacterial contamination." },
  { q: "What should I check before paying for any dairy processing equipment?", a: "Do check the warranty, installation support, spare parts availability, future maintenance costs and material quality, which should be a Food-grade stainless steel (SS 304 and SS 316)." },
  { q: "For how long does dairy processing equipment usually last?", a: "The durability of such equipment is aligned with proper maintenance and cleaning. These equipment can last for 10-15 years or more." },
  { q: "What are the qualities of these machines?", a: "The machines are usually made from high-quality stainless steel. It ensures hygiene, corrosion resistance, and durability. They are valuable for automatic stirring mechanisms and can be adjusted manually with heating controls." },
  { q: "How to choose the right dairy equipment manufacturer in India?", a: "To choose the right manufacturer, ensure they offer high-quality, durable equipment with reliable after-sales support and warranties. Check their industry reputation, client reviews, and compliance with food safety standards." }
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white text-[#323373]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Pioneering Dairy Technology</h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            NK Dairy Equipments is a team of qualified technocrats with an engineering background, supported by skilled technicians and craftsmen. We engineer, manufacture, and export high-capacity dairy processing plants that set global standards for efficiency.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden relative shadow-sm border border-gray-100 flex items-center justify-center p-8">
            <div className="text-center">
               <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Award className="text-blue-600" size={40} />
               </div>
               <h3 className="text-2xl font-bold text-[#323373]">20+ Years Of Experience</h3>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Our Manufacturing Excellence</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                NK Dairy Equipments is a team of qualified technocrats with an engineering background, supported by skilled technicians and craftsmen. It is monitored by an energetic woman Mrs. Himpreet Kaur. Under her able leadership, the firm has installed and executed many projects in Milk Processing Plants. Her mindset of suggesting exact requirements to the Client and appropriate machinery/equipment for the Plant has proved the Projects quite successful and achieved good results and required needed rated capacity.
              </p>
              <p>
                Due to this, many of our Clients have repeated their orders for expansion of Plant Capacity. We have always lived up to the faith of our Clients. We have wide experience in the dairy field. We have a full-fledged Workshop for fabrication, as well as a to date machine shop for precision machining. Our skilled workers follow the instructions of their engineers as regards the production of equipment and are quite confident to take up any assignment of setting up a Milk Processing Plant. We follow N. D. D. B. norms and fabricate the equipment as per the guidance of our qualified engineers. We have separate teams to work on-site, for site fabrication, installation of equipment/machinery, piping, and its commissioning.
              </p>
              <p>
                It is monitored by our engineers and supervisors, who are able to complete the job as per schedule. Also, they are sufficiently skilled and experienced to overcome any unforeseen technical or administrative problem on site. A cordial relationship with the Client on-site helps in troubleshooting any difficulty to the satisfaction of the Client.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { icon: Shield, title: 'Uncompromising Quality', desc: 'SS 304/316 food-grade construction.' },
            { icon: Target, title: 'Precision Engineering', desc: 'CNC fabricated components for exact tolerances.' },
            { icon: Users, title: 'Turnkey Execution', desc: 'End-to-end project management and installation.' },
            { icon: Award, title: 'Global Standards', desc: 'ISO 9001:2015 & CE Certified machinery.' }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 p-8 rounded-2xl text-center hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <item.icon className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#323373]">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <FAQAccordion 
          title="Frequently Asked Questions"
          subtitle=""
          data={faqs.map(f => ({ question: f.q, answer: f.a }))}
        />

      </div>
    </div>
  );
}

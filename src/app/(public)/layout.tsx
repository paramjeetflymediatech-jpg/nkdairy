import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen text-[#323373]">
      <OrganizationSchema />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

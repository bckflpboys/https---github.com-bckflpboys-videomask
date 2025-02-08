'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Hero />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

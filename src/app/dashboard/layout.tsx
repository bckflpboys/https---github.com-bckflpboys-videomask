'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <div className="pt-20 pb-16">
        {children}
      </div>
    </div>
  );
}

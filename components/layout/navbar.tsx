import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { LoadingDots } from '@/components/icons';
import Image from 'next/image';
import { MenuIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Navbar({
  setSidebarOpen
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  return (
    <nav
      className="absolute right-0 w-full flex items-center justify-between md:justify-end px-4 h-16"
      aria-label="Navbar"
    >
  
    </nav>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();

  // Don't show navbar on dashboard pages
  const isDashboard =
    pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  if (isDashboard) {
    return null;
  }

  return <Navbar />;
}

'use client';

import ConvexClerkProvider from '@/providers/ConvexClerkProvider';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexClerkProvider>{children}</ConvexClerkProvider>;
}

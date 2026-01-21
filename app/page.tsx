import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import HomeClient from '@/components/HomeClient';

export default async function HomePage() {
  const user = await currentUser();

  // Pure server side redirect – fastest approach
  if (user) {
    redirect('/dashboard');
  }

  return <HomeClient />;
}

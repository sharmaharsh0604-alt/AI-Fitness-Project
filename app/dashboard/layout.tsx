import { UserButton } from '@clerk/nextjs';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen cyber-grid bg-[#0a0e1a] flex">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Sidebar />

      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Navigation */}
        <nav className="border-b border-cyan-500/20 bg-slate-900/30 backdrop-blur-xl">
          <div className="px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
              <p className="text-sm text-slate-400">
                Manage your fitness journey
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <span className="text-cyan-400 text-sm font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  AI Active
                </span>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

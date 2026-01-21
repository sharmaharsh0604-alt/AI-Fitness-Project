'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Dumbbell, Utensils, BarChart3, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  { icon: Dumbbell, label: 'Workouts', href: '/dashboard/workouts' },
  { icon: Utensils, label: 'Meal Plans', href: '/dashboard/meals' },
  { icon: BarChart3, label: 'Progress', href: '/dashboard/progress' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r border-cyan-500/20 bg-slate-900/30 backdrop-blur-xl p-6 relative z-20">
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="relative">
            <Zap className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <div className="absolute inset-0 blur-xl bg-cyan-400/30 group-hover:bg-cyan-300/50 transition-all"></div>
          </div>
          <span className="text-xl font-bold">
            <span className="text-white">AI</span>
            <span className="text-cyan-400">Fitness</span>
          </span>
        </Link>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative group',
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-cyan-400 border border-transparent'
              )}>
              {isActive && (
                <div className="absolute inset-0 bg-cyan-500/5 rounded-lg blur-xl"></div>
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
              {isActive && (
                <div className="absolute right-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-l-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Decoration */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-xs text-cyan-400 font-semibold mb-1">
            System Status
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-slate-400">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

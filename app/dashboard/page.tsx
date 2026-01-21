import { currentUser } from '@clerk/nextjs/server';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dumbbell,
  Utensils,
  Target,
  TrendingUp,
  Calendar,
  Zap,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold mb-2">
          Welcome back, {user?.firstName || 'User'}! 👋
        </h2>
        <p className="text-slate-400">Here's your fitness overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Days"
          value="12"
          icon={Calendar}
          description="This month"
          trend="↑ 20% from last month"
        />
        <StatsCard
          title="Workouts Done"
          value="8"
          icon={Dumbbell}
          description="This week"
          trend="↑ 2 more than last week"
        />
        <StatsCard
          title="Calories Burned"
          value="3,240"
          icon={Zap}
          description="This week"
          trend="↑ 15% increase"
        />
        <StatsCard
          title="Goal Progress"
          value="67%"
          icon={Target}
          description="Monthly target"
          trend="On track to hit 100%"
        />
      </div>

      {/* Quick Actions - CLICKABLE CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Workout Card - Fully Clickable */}
        <Link href="/dashboard/workouts" className="group">
          <Card className="p-6 bg-slate-900/50 border-slate-800 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer h-full">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-blue-600/10 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                <Dumbbell className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  Generate Workout Plan
                </h3>
                <p className="text-slate-400 mb-4">
                  Get a personalized workout routine based on your goals and
                  fitness level
                </p>
                <div className="flex items-center text-blue-500 font-medium">
                  Create Workout
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Meal Plan Card - Fully Clickable */}
        <Link href="/dashboard/meals" className="group">
          <Card className="p-6 bg-slate-900/50 border-slate-800 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer h-full">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-purple-600/10 rounded-lg group-hover:bg-purple-600/20 transition-colors">
                <Utensils className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  Generate Meal Plan
                </h3>
                <p className="text-slate-400 mb-4">
                  AI-powered nutrition plans tailored to your dietary
                  preferences
                </p>
                <div className="flex items-center text-purple-500 font-medium">
                  Create Meal Plan
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Recent Activity</h3>
          <Button
            variant="ghost"
            className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
            asChild>
            <Link href="/dashboard/progress">View All</Link>
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
            <div className="p-3 bg-green-600/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Completed Full Body Workout</p>
              <p className="text-sm text-slate-400">2 hours ago</p>
            </div>
            <span className="text-green-500 text-sm font-medium">+240 cal</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
            <div className="p-3 bg-blue-600/10 rounded-lg">
              <Utensils className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Logged Breakfast</p>
              <p className="text-sm text-slate-400">5 hours ago</p>
            </div>
            <span className="text-blue-500 text-sm font-medium">450 cal</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
            <div className="p-3 bg-purple-600/10 rounded-lg">
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Updated Fitness Goals</p>
              <p className="text-sm text-slate-400">Yesterday</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

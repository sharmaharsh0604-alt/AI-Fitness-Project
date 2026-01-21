'use client';

import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Utensils, Calendar, TrendingUp } from 'lucide-react';

export default function ProgressPage() {
  const { user } = useUser();

  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || '',
  });

  const workouts = useQuery(api.workouts.getUserWorkouts, {
    clerkId: user?.id || '',
  });

  const meals = useQuery(api.meals.getUserMeals, {
    clerkId: user?.id || '',
  });

  const totalPlans = (workouts?.length || 0) + (meals?.length || 0);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Progress Tracker 📊</h2>
        <p className="text-slate-400">
          Track your fitness journey and saved plans
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-900/50 border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600/10 rounded-lg">
              <Dumbbell className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm text-slate-400">Workout Plans</p>
          </div>
          <p className="text-3xl font-bold">{workouts?.length || 0}</p>
        </Card>

        <Card className="p-6 bg-slate-900/50 border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600/10 rounded-lg">
              <Utensils className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-sm text-slate-400">Meal Plans</p>
          </div>
          <p className="text-3xl font-bold">{meals?.length || 0}</p>
        </Card>

        <Card className="p-6 bg-slate-900/50 border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600/10 rounded-lg">
              <Calendar className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-slate-400">Total Plans</p>
          </div>
          <p className="text-3xl font-bold">{totalPlans}</p>
        </Card>

        <Card className="p-6 bg-slate-900/50 border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-600/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-sm text-slate-400">Current Goal</p>
          </div>
          <p className="text-lg font-bold text-orange-500">
            {userData?.fitnessGoal?.replace('-', ' ').toUpperCase() ||
              'Not Set'}
          </p>
        </Card>
      </div>

      {/* Profile Summary */}
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-xl font-semibold mb-4">Your Profile Summary</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Age:</span>
              <span className="font-semibold">
                {userData?.age || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Weight:</span>
              <span className="font-semibold">
                {userData?.weight ? `${userData.weight} kg` : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Height:</span>
              <span className="font-semibold">
                {userData?.height ? `${userData.height} cm` : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Gender:</span>
              <span className="font-semibold capitalize">
                {userData?.gender || 'Not set'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Fitness Goal:</span>
              <Badge className="bg-blue-600/10 text-blue-500">
                {userData?.fitnessGoal?.replace('-', ' ') || 'Not set'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fitness Level:</span>
              <Badge className="bg-green-600/10 text-green-500">
                {userData?.fitnessLevel || 'Not set'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Diet Preference:</span>
              <Badge className="bg-purple-600/10 text-purple-500">
                {userData?.dietaryPreference || 'Not set'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Member Since:</span>
              <span className="font-semibold">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Activity Timeline */}
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {/* Combine and sort all plans by date */}
          {[
            ...(workouts?.map((w) => ({ ...w, type: 'workout' as const })) ||
              []),
            ...(meals?.map((m) => ({ ...m, type: 'meal' as const })) || []),
          ]
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 10)
            .map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                <div
                  className={`p-3 rounded-lg ${
                    item.type === 'workout'
                      ? 'bg-blue-600/10'
                      : 'bg-purple-600/10'
                  }`}>
                  {item.type === 'workout' ? (
                    <Dumbbell className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Utensils className="w-5 h-5 text-purple-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {item.type === 'workout'
                      ? `Created Workout Plan - ${'goal' in item ? item.goal : ''}`
                      : `Created Meal Plan - ${'dietaryPreference' in item ? item.dietaryPreference : ''}`}
                  </p>
                  <p className="text-sm text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()} at{' '}
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <Badge
                  className={
                    item.type === 'workout'
                      ? 'bg-blue-600/10 text-blue-500'
                      : 'bg-purple-600/10 text-purple-500'
                  }>
                  {item.type === 'workout' ? 'Workout' : 'Meal'}
                </Badge>
              </div>
            ))}

          {totalPlans === 0 && (
            <div className="text-center py-8 text-slate-400">
              <p>
                No activity yet. Start by creating your first workout or meal
                plan!
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-slate-900/50 border-slate-800">
          <h3 className="text-lg font-semibold mb-4">Latest Workout</h3>
          {workouts && workouts.length > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Goal:</span>
                <Badge className="bg-blue-600/10 text-blue-500">
                  {workouts[0].goal}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Level:</span>
                <Badge className="bg-green-600/10 text-green-500">
                  {workouts[0].level}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Created:</span>
                <span className="font-semibold">
                  {new Date(workouts[0].createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-slate-400">No workouts created yet</p>
          )}
        </Card>

        <Card className="p-6 bg-slate-900/50 border-slate-800">
          <h3 className="text-lg font-semibold mb-4">Latest Meal Plan</h3>
          {meals && meals.length > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Diet:</span>
                <Badge className="bg-purple-600/10 text-purple-500">
                  {meals[0].dietaryPreference}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Created:</span>
                <span className="font-semibold">
                  {new Date(meals[0].createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-slate-400">No meal plans created yet</p>
          )}
        </Card>
      </div>
    </div>
  );
}

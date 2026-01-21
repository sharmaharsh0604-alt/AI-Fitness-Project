'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Dumbbell, Save, Sparkles, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/dashboard/LoadingState';

/* ✅ TYPE FOR WORKOUTS (fixes `any`) */
type Workout = {
  _id: string;
  plan: string;
  goal: string;
  level: string;
  createdAt: number;
};

export default function WorkoutsPage() {
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || '',
  });

  const workouts = useQuery(api.workouts.getUserWorkouts, {
    clerkId: user?.id || '',
  });

  const saveWorkout = useMutation(api.workouts.saveWorkoutPlan);

  const handleGenerate = async () => {
    if (!userData || !user) return;

    setIsGenerating(true);
    setGeneratedPlan(null);
    setError(null);

    try {
      const response = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: userData.age,
          weight: userData.weight,
          height: userData.height,
          gender: userData.gender,
          fitnessGoal: userData.fitnessGoal,
          fitnessLevel: userData.fitnessLevel,
          healthConditions: userData.healthConditions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate workout');
      }

      setGeneratedPlan(data.workoutPlan);
    } catch (error: unknown) {
      console.error('Error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to generate workout plan',
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedPlan || !user || !userData) return;

    setIsSaving(true);
    setError(null);

    try {
      await saveWorkout({
        clerkId: user.id,
        plan: generatedPlan,
        goal: userData.fitnessGoal || 'General fitness',
        level: userData.fitnessLevel || 'Beginner',
      });

      alert('✅ Workout plan saved successfully!');
      setGeneratedPlan(null);
    } catch (error: unknown) {
      console.error('Error:', error);
      setError('Failed to save workout plan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return <LoadingState message="Loading your profile..." />;
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Workout Plans 💪</h2>
        <p className="text-slate-400">
          AI-generated personalized workout routines
        </p>
      </div>

      {/* Generate Section */}
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-4 bg-blue-600/10 rounded-lg">
            <Sparkles className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Generate New Workout</h3>
            <p className="text-slate-400 mb-4">
              Create a personalized workout plan based on your fitness profile
            </p>

            {!userData?.fitnessGoal && (
              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-4">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <p className="text-yellow-500 text-sm">
                  Please complete your profile first to get personalized
                  workouts
                </p>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !userData?.fitnessGoal}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Generate Workout Plan
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Generated Plan */}
        {generatedPlan && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Your New Workout Plan</h4>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                variant="outline">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Plan
                  </>
                )}
              </Button>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 whitespace-pre-wrap text-sm max-h-[600px] overflow-y-auto border border-slate-700">
              {generatedPlan}
            </div>
          </div>
        )}
      </Card>

      {/* Saved Workouts */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Saved Workout Plans</h3>

        {!workouts ? (
          <LoadingState message="Loading your workouts..." />
        ) : workouts.length > 0 ? (
          <div className="space-y-4">
            {workouts.map((workout: Workout) => (
              <Card
                key={workout._id}
                className="p-6 bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      {workout.goal} – {workout.level}
                    </h4>
                    <p className="text-sm text-slate-400">
                      Created {new Date(workout.createdAt).toLocaleDateString()}{' '}
                      at {new Date(workout.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge className="bg-green-600/10 text-green-500">
                    Saved
                  </Badge>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 whitespace-pre-wrap text-sm max-h-96 overflow-y-auto border border-slate-700">
                  {workout.plan}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-slate-900/50 border-slate-800 text-center">
            <Dumbbell className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400 text-lg mb-2">No saved workouts yet</p>
            <p className="text-slate-500 text-sm">
              Generate your first one above!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

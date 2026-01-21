'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';

export function ProfileForm() {
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || '',
  });

  const updateProfile = useMutation(api.users.updateUserProfile);

  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    fitnessGoal: '',
    fitnessLevel: '',
    dietaryPreference: '',
    healthConditions: '',
  });

  // Load user data when available
  useEffect(() => {
    if (userData) {
      setFormData({
        age: userData.age?.toString() || '',
        weight: userData.weight?.toString() || '',
        height: userData.height?.toString() || '',
        gender: userData.gender || '',
        fitnessGoal: userData.fitnessGoal || '',
        fitnessLevel: userData.fitnessLevel || '',
        dietaryPreference: userData.dietaryPreference || '',
        healthConditions: userData.healthConditions || '',
      });
    }
  }, [userData]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setShowSuccess(false);

    try {
      await updateProfile({
        clerkId: user.id,
        age: formData.age ? Number(formData.age) : undefined,
        weight: formData.weight ? Number(formData.weight) : undefined,
        height: formData.height ? Number(formData.height) : undefined,
        gender: formData.gender || undefined,
        fitnessGoal: formData.fitnessGoal || undefined,
        fitnessLevel: formData.fitnessLevel || undefined,
        dietaryPreference: formData.dietaryPreference || undefined,
        healthConditions: formData.healthConditions || undefined,
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
      <h3 className="text-xl font-semibold mb-6">Fitness Information</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Row */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="25"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="bg-slate-800 border-slate-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              className="bg-slate-800 border-slate-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="175"
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              className="bg-slate-800 border-slate-700"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleChange('gender', value)}>
            <SelectTrigger className="bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fitness Goal */}
        <div className="space-y-2">
          <Label htmlFor="fitnessGoal">Fitness Goal</Label>
          <Select
            value={formData.fitnessGoal}
            onValueChange={(value) => handleChange('fitnessGoal', value)}>
            <SelectTrigger className="bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select your primary goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weight-loss">Weight Loss</SelectItem>
              <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
              <SelectItem value="strength">Build Strength</SelectItem>
              <SelectItem value="endurance">Improve Endurance</SelectItem>
              <SelectItem value="general-fitness">General Fitness</SelectItem>
              <SelectItem value="flexibility">
                Flexibility & Mobility
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fitness Level */}
        <div className="space-y-2">
          <Label htmlFor="fitnessLevel">Current Fitness Level</Label>
          <Select
            value={formData.fitnessLevel}
            onValueChange={(value) => handleChange('fitnessLevel', value)}>
            <SelectTrigger className="bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select your fitness level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">
                Beginner (Just starting out)
              </SelectItem>
              <SelectItem value="intermediate">
                Intermediate (Regular exercise)
              </SelectItem>
              <SelectItem value="advanced">
                Advanced (Experienced athlete)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dietary Preference */}
        <div className="space-y-2">
          <Label htmlFor="dietaryPreference">Dietary Preference</Label>
          <Select
            value={formData.dietaryPreference}
            onValueChange={(value) => handleChange('dietaryPreference', value)}>
            <SelectTrigger className="bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select dietary preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Restrictions</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
              <SelectItem value="paleo">Paleo</SelectItem>
              <SelectItem value="halal">Halal</SelectItem>
              <SelectItem value="gluten-free">Gluten-Free</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Health Conditions */}
        <div className="space-y-2">
          <Label htmlFor="healthConditions">Health Conditions / Notes</Label>
          <Textarea
            id="healthConditions"
            placeholder="Any injuries, medical conditions, or special considerations..."
            value={formData.healthConditions}
            onChange={(e) => handleChange('healthConditions', e.target.value)}
            className="bg-slate-800 border-slate-700 min-h-24"
          />
        </div>

        {/* Submit Button */}
        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </>
            )}
          </Button>

          {showSuccess && (
            <div className="flex items-center justify-center gap-2 text-green-500 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Profile saved successfully!</span>
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}

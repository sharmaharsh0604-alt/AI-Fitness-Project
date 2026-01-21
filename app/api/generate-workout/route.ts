import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { age, weight, height, gender, fitnessGoal, fitnessLevel, healthConditions } = body;

    // Mock AI-generated workout plan
    const workoutPlan = `**PERSONALIZED WEEKLY WORKOUT PLAN**

**Your Profile:**
- Age: ${age || "N/A"}
- Weight: ${weight ? weight + " kg" : "N/A"}
- Height: ${height ? height + " cm" : "N/A"}
- Gender: ${gender || "N/A"}
- Goal: ${fitnessGoal || "General Fitness"}
- Level: ${fitnessLevel || "Beginner"}
- Health Notes: ${healthConditions || "None"}

---

**Day 1: Upper Body Strength**
- Warm-up: 5 min arm circles & light cardio
- Push-ups: 3 sets x 10-12 reps - Rest: 60s
  *Keep core tight, full range of motion*
- Dumbbell Rows: 3 sets x 12 reps - Rest: 60s
  *Pull elbows back, squeeze shoulder blades*
- Shoulder Press: 3 sets x 10 reps - Rest: 60s
  *Press straight up, controlled descent*
- Bicep Curls: 3 sets x 12 reps - Rest: 45s
  *No swinging, focus on contraction*
- Cool-down: 5 min stretching

**Day 2: Lower Body Power**
- Warm-up: 5 min leg swings & bodyweight squats
- Squats: 4 sets x 12 reps - Rest: 90s
  *Chest up, knees track over toes*
- Lunges: 3 sets x 10 reps each leg - Rest: 60s
  *90-degree angles, controlled movement*
- Romanian Deadlifts: 3 sets x 12 reps - Rest: 75s
  *Hinge at hips, slight knee bend*
- Calf Raises: 3 sets x 20 reps - Rest: 45s
  *Full range, pause at top*
- Cool-down: Lower body stretches

**Day 3: Active Recovery**
- 30-40 minutes light cardio (walking, cycling, swimming)
- Gentle stretching or yoga
- Focus on mobility work

**Day 4: Full Body Circuit**
- Warm-up: 5 min dynamic stretches
- Circuit (3 rounds, minimal rest between exercises):
  * Burpees: 10 reps
  * Mountain Climbers: 20 reps
  * Plank Hold: 45 seconds
  * Jump Squats: 12 reps
  * Rest 2 minutes between rounds
- Cool-down: Full body stretch

**Day 5: Core & Cardio**
- Cardio: 20-30 minutes moderate intensity
- Core Work:
  * Crunches: 3 sets x 20 reps
  * Russian Twists: 3 sets x 30 reps
  * Leg Raises: 3 sets x 15 reps
  * Bicycle Crunches: 3 sets x 20 reps
  * Plank: 3 sets x 60 seconds

**Day 6: Upper Body & Abs**
- Pull-ups/Assisted Pull-ups: 3 sets x 8 reps
- Dips: 3 sets x 10 reps
- Dumbbell Chest Press: 3 sets x 12 reps
- Lateral Raises: 3 sets x 15 reps
- Hanging Knee Raises: 3 sets x 12 reps

**Day 7: Complete Rest**
- No structured exercise
- Focus on recovery, sleep, and nutrition
- Light walking if desired (under 20 min)

---

**Important Safety Notes:**
${healthConditions ? `- Consider your health condition: ${healthConditions}` : '- No specific restrictions noted'}
- Always consult a healthcare provider before starting new exercise
- Stop immediately if you feel pain (not just muscle fatigue)
- Stay hydrated - drink water before, during, and after workouts

**Progression Tips:**
- Start with lower weights/easier variations if needed
- Gradually increase difficulty as you get stronger
- Track your workouts to monitor progress
- Rest is crucial - don't skip recovery days

**Recovery Recommendations:**
- Aim for 7-9 hours of sleep per night
- Stay hydrated (2-3 liters water daily)
- Eat adequate protein (1.6-2.2g per kg bodyweight)
- Consider foam rolling and stretching on rest days

*Note: This is a simulated workout plan. For best results, consult a certified fitness trainer.*`;

    return NextResponse.json({ workoutPlan });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
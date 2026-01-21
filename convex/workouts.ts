import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save workout plan
export const saveWorkoutPlan = mutation({
  args: {
    clerkId: v.string(),
    plan: v.string(),
    goal: v.string(),
    level: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const workoutId = await ctx.db.insert("workoutPlans", {
      userId: user._id,
      clerkId: args.clerkId,
      plan: args.plan,
      goal: args.goal,
      level: args.level,
      createdAt: Date.now(),
    });

    return workoutId;
  },
});

// Get user's workout plans
export const getUserWorkouts = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const workouts = await ctx.db
      .query("workoutPlans")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .order("desc")
      .collect();

    return workouts;
  },
});
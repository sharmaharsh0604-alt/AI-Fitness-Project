import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save meal plan
export const saveMealPlan = mutation({
  args: {
    clerkId: v.string(),
    plan: v.string(),
    dietaryPreference: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const mealId = await ctx.db.insert("mealPlans", {
      userId: user._id,
      clerkId: args.clerkId,
      plan: args.plan,
      dietaryPreference: args.dietaryPreference,
      createdAt: Date.now(),
    });

    return mealId;
  },
});

// Get user's meal plans
export const getUserMeals = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const meals = await ctx.db
      .query("mealPlans")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .order("desc")
      .collect();

    return meals;
  },
});
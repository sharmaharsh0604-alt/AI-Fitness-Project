import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    
    // Fitness Profile
    age: v.optional(v.number()),
    weight: v.optional(v.number()),
    height: v.optional(v.number()),
    gender: v.optional(v.string()),
    fitnessGoal: v.optional(v.string()),
    fitnessLevel: v.optional(v.string()),
    dietaryPreference: v.optional(v.string()),
    healthConditions: v.optional(v.string()),
    
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  workoutPlans: defineTable({
    userId: v.id("users"),
    clerkId: v.string(),
    plan: v.string(),
    goal: v.string(),
    level: v.string(),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  mealPlans: defineTable({
    userId: v.id("users"),
    clerkId: v.string(),
    plan: v.string(),
    dietaryPreference: v.string(),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),
});
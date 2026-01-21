import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { age, weight, height, gender, fitnessGoal, dietaryPreference, healthConditions } = body;

    // Calculate approximate daily calorie needs (simple formula)
    const bmr = gender === "male" 
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    
    const activityMultiplier = 1.55; // Moderate activity
    const tdee = Math.round(bmr * activityMultiplier);
    
    // Adjust calories based on goal
    let targetCalories = tdee;
    if (fitnessGoal === "weight-loss") targetCalories = tdee - 500;
    if (fitnessGoal === "muscle-gain") targetCalories = tdee + 300;

    // Mock AI-generated meal plan
    const mealPlan = `**PERSONALIZED NUTRITION PLAN**

**Your Profile:**
- Age: ${age || "N/A"}
- Weight: ${weight ? weight + " kg" : "N/A"}
- Height: ${height ? height + " cm" : "N/A"}
- Gender: ${gender || "N/A"}
- Goal: ${fitnessGoal || "General Fitness"}
- Dietary Preference: ${dietaryPreference || "No restrictions"}
- Health Notes: ${healthConditions || "None"}

**Caloric Breakdown:**
- Basal Metabolic Rate (BMR): ~${Math.round(bmr)} calories/day
- Total Daily Energy Expenditure: ~${tdee} calories/day
- Target Daily Intake: ~${targetCalories} calories/day
- Protein: ${Math.round(weight * 2)}g (${Math.round(weight * 2 * 4)} cal)
- Carbs: ${Math.round(targetCalories * 0.45 / 4)}g (${Math.round(targetCalories * 0.45)} cal)
- Fats: ${Math.round(targetCalories * 0.25 / 9)}g (${Math.round(targetCalories * 0.25)} cal)

---

**7-DAY MEAL PLAN**
${dietaryPreference === "vegetarian" || dietaryPreference === "vegan" ? "(Vegetarian/Vegan Options)" : ""}

**Day 1:**

🌅 **Breakfast (${Math.round(targetCalories * 0.25)} cal)**
- Oatmeal with banana, almonds, and honey
- Greek yogurt (${dietaryPreference === "vegan" ? "plant-based" : ""})
- Green tea or coffee

🌞 **Mid-Morning Snack (${Math.round(targetCalories * 0.10)} cal)**
- Apple with peanut butter
- Handful of mixed nuts

🍽️ **Lunch (${Math.round(targetCalories * 0.30)} cal)**
- ${dietaryPreference === "vegan" ? "Chickpea & quinoa bowl" : "Grilled chicken breast"}
- Brown rice
- Mixed vegetables (broccoli, carrots, bell peppers)
- Side salad with olive oil dressing

🥤 **Afternoon Snack (${Math.round(targetCalories * 0.10)} cal)**
- Protein smoothie (banana, berries, protein powder, ${dietaryPreference === "vegan" ? "almond milk" : "milk"})

🌙 **Dinner (${Math.round(targetCalories * 0.25)} cal)**
- ${dietaryPreference === "vegan" ? "Tofu stir-fry" : "Baked salmon"}
- Sweet potato
- Steamed green beans
- Mixed greens salad

---

**Day 2:**

🌅 **Breakfast**
- Scrambled eggs (${dietaryPreference === "vegan" ? "tofu scramble" : "3 eggs"}) with spinach
- Whole grain toast with avocado
- Fresh orange juice

🌞 **Mid-Morning Snack**
- Protein bar
- Banana

🍽️ **Lunch**
- ${dietaryPreference === "vegan" ? "Lentil & vegetable curry" : "Turkey sandwich on whole grain"}
- Baby carrots with hummus
- Greek yogurt (${dietaryPreference === "vegan" ? "coconut yogurt" : ""})

🥤 **Afternoon Snack**
- Trail mix (nuts, seeds, dried fruit)

🌙 **Dinner**
- ${dietaryPreference === "vegan" ? "Black bean & sweet potato tacos" : "Lean beef stir-fry"}
- Quinoa
- Roasted Brussels sprouts

---

**Day 3:**

🌅 **Breakfast**
- Protein pancakes with berries
- ${dietaryPreference === "vegan" ? "Almond butter" : "Greek yogurt"}
- Coffee or tea

🌞 **Mid-Morning Snack**
- Cottage cheese (${dietaryPreference === "vegan" ? "Hummus" : ""}) with cucumber

🍽️ **Lunch**
- ${dietaryPreference === "vegan" ? "Buddha bowl with tempeh" : "Grilled chicken salad"}
- Mixed greens, quinoa, chickpeas
- Balsamic vinaigrette

🥤 **Afternoon Snack**
- Rice cakes with almond butter
- Apple slices

🌙 **Dinner**
- ${dietaryPreference === "vegan" ? "Vegetable & bean chili" : "Baked cod with herbs"}
- Brown rice
- Steamed broccoli

---

**Day 4:**

🌅 **Breakfast**
- Smoothie bowl (acai, banana, granola, berries)
- Boiled eggs (${dietaryPreference === "vegan" ? "Skip or add tofu" : "2 eggs"})

🌞 **Mid-Morning Snack**
- Mixed nuts and dark chocolate

🍽️ **Lunch**
- ${dietaryPreference === "vegan" ? "Falafel wrap" : "Tuna salad wrap"}
- Sweet potato fries (baked)
- Side salad

🥤 **Afternoon Snack**
- Protein shake
- Orange

🌙 **Dinner**
- ${dietaryPreference === "vegan" ? "Mushroom & spinach pasta" : "Grilled chicken thighs"}
- Whole wheat pasta or quinoa
- Roasted vegetables

---

**Day 5:**

🌅 **Breakfast**
- Avocado toast with ${dietaryPreference === "vegan" ? "cherry tomatoes" : "poached eggs"}
- Fresh fruit salad
- Green juice

🌞 **Mid-Morning Snack**
- Energy balls (dates, nuts, cocoa)

🍽️ **Lunch**
- ${dietaryPreference === "vegan" ? "Three-bean salad" : "Grilled shrimp"}
- Wild rice
- Steamed asparagus

🥤 **Afternoon Snack**
- Celery with peanut butter
- Berries

🌙 **Dinner**
- ${dietaryPreference === "vegan" ? "Veggie burger on whole grain bun" : "Lean pork tenderloin"}
- Baked potato
- Mixed vegetables

---

**Day 6:**

🌅 **Breakfast**
- Chia pudding with ${dietaryPreference === "vegan" ? "almond milk" : "milk"}, berries
- Whole grain toast with jam

🌞 **Mid-Morning Snack**
- Protein bar
- Pear

🍽️ **Lunch**
- ${dietaryPreference === "vegan" ? "Tofu poke bowl" : "Salmon poke bowl"}
- Brown rice, edamame, seaweed
- Miso soup

🥤 **Afternoon Snack**
- Greek yogurt (${dietaryPreference === "vegan" ? "Soy yogurt" : ""}) with honey

🌙 **Dinner**
- ${dietaryPreference === "vegan" ? "Eggplant parmesan (vegan cheese)" : "Grilled steak"}
- Zucchini noodles
- Caesar salad (${dietaryPreference === "vegan" ? "vegan dressing" : ""})

---

**Day 7:**

🌅 **Breakfast**
- French toast with berries (${dietaryPreference === "vegan" ? "made with plant milk" : ""})
- Turkey bacon (${dietaryPreference === "vegan" ? "tempeh bacon" : ""})

🌞 **Mid-Morning Snack**
- Smoothie (spinach, banana, protein powder)

🍽️ **Lunch**
- ${dietaryPreference === "vegan" ? "Quinoa & black bean bowl" : "Chicken burrito bowl"}
- Guacamole, salsa, brown rice
- Corn on the cob

🥤 **Afternoon Snack**
- Dark chocolate (70%+ cocoa)
- Almonds

🌙 **Dinner**
- ${dietaryPreference === "vegan" ? "Vegetable curry with tofu" : "Baked chicken with herbs"}
- Basmati rice
- Naan bread (${dietaryPreference === "vegan" ? "vegan" : ""})
- Cucumber raita (${dietaryPreference === "vegan" ? "coconut yogurt" : ""})

---

**Hydration Guidelines:**
- Drink 8-10 glasses (2-3 liters) of water daily
- More if exercising intensely or in hot weather
- Green tea, herbal tea acceptable
- Limit caffeine to 2-3 cups/day

**Meal Prep Tips:**
- Prepare proteins in bulk on Sunday
- Pre-cut vegetables for the week
- Cook grains (rice, quinoa) in batches
- Portion snacks into containers

**Important Notes:**
${healthConditions ? `- Health consideration: ${healthConditions}` : '- No specific dietary restrictions noted'}
- Adjust portions based on hunger and energy levels
- This plan is flexible - swap similar foods as needed
- Consider supplementing with Vitamin D, Omega-3, B12 (especially if vegan)

**Foods to Emphasize:**
- Lean proteins, whole grains, fruits, vegetables
- Healthy fats (avocado, nuts, olive oil)
- Fiber-rich foods

**Foods to Limit:**
- Processed foods, added sugars
- Excessive sodium
- Trans fats, deep-fried foods

*Note: This is a simulated meal plan. Consult a registered dietitian for personalized nutrition advice.*`;

    return NextResponse.json({ mealPlan });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
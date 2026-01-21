# 🏋️ AI Fitness Coach

An intelligent fitness and nutrition companion powered by AI that creates personalized workout and meal plans based on your goals, fitness level, and dietary preferences.

## ✨ Features

- 🔐 **Secure Authentication** - Powered by Clerk
- 👤 **User Profiles** - Track age, weight, height, goals, and preferences
- 💪 **AI Workout Plans** - Personalized 7-day workout routines
- 🥗 **AI Meal Plans** - Custom nutrition plans with calorie tracking
- 📊 **Progress Tracking** - Monitor your fitness journey
- 💾 **Cloud Database** - Save and access plans anywhere with Convex
- 🌙 **Dark Modern UI** - Beautiful, responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **Database**: Convex (Real-time, serverless)
- **AI**: Google Gemini API
- **Deployment**: Vercel



## 📁 Project Structure

```
ai-fitness-coach/
├── app/
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard pages
│   ├── sign-in/          # Auth pages
│   └── sign-up/
├── components/
│   ├── ui/               # shadcn components
│   ├── dashboard/        # Dashboard components
│   └── profile/          # Profile components
├── convex/               # Convex backend
│   ├── schema.ts         # Database schema
│   ├── users.ts          # User queries/mutations
│   ├── workouts.ts       # Workout queries/mutations
│   └── meals.ts          # Meal queries/mutations
├── providers/            # Context providers
└── lib/                  # Utilities
```

## 🎯 Usage

1. **Sign Up** - Create an account
2. **Complete Profile** - Add your fitness details
3. **Generate Workout** - Get a personalized 7-day workout plan
4. **Generate Meal Plan** - Get a custom nutrition plan
5. **Track Progress** - View all your saved plans

## 📝 License

MIT License - feel free to use this project for learning!

## 👨‍💻 Author

Built with ❤️ by [Harsh Sharma]

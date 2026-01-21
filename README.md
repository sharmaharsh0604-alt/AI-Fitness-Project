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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-fitness-coach
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Convex Database
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_deployment

# Google Gemini AI (Optional - mock data works without it)
GEMINI_API_KEY=your_gemini_key
```

4. Run Convex development server

```bash
npx convex dev
```

5. Run Next.js development server (in a new terminal)

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

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

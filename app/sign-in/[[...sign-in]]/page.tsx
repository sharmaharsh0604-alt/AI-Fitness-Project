import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 pt-24">
      {/* ☝️ Added pt-24 for navbar spacing */}
      <SignIn />
    </div>
  );
}

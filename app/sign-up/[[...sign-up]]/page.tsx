import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 pt-20">
      {/* ☝️ Added pt-24 for navbar spacing */}
      <SignUp />
    </div>
  );
}

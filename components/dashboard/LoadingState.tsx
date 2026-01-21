import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      <p className="text-slate-400 text-lg">{message}</p>
    </div>
  );
}

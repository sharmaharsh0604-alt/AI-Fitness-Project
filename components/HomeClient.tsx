'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import UserPrograms from '@/components/UserPrograms';

// Heavy component ko lazy load
const TerminalOverlay = dynamic(() => import('../components/TerminalOverlay'), {
  ssr: true,
});

// Reusable stat component
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-2xl text-primary">{value}</div>
      <div className="text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function HomeClient() {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <section className="relative z-10 pt-16 md:pt-20 flex-grow px-4 min-h-[90vh]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-7 space-y-7 pt-6 lg:pt-10 pl-2 md:pl-6 lg:pl-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Transform <br />
                <span className="text-primary">Your Body</span>
                <br />
                With Advanced <br />
                AI <span className="text-primary">Technology</span>
              </h1>

              <div className="h-px w-[70%] bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Talk to our AI assistant and get personalized diet plans and
                workout routines designed just for you
              </p>

              {/* STATS */}
              <div className="flex flex-wrap items-center gap-6 md:gap-10 py-2 font-mono">
                <Stat value="500+" label="ACTIVE USERS" />

                <div className="hidden md:block h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

                <Stat value="3min" label="GENERATION" />

                <div className="hidden md:block h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

                <Stat value="100%" label="PERSONALIZED" />
              </div>

              {/* BUTTON — FIXED */}
              <div className="pt-2">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary text-primary-foreground px-6 py-6 text-lg font-medium hover:scale-[1.02] transition-all w-full sm:w-auto">
                  <Link
                    href="/generate-program"
                    className="flex items-center justify-center font-mono whitespace-nowrap">
                    Build Your Program
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT IMAGE — PERFECT FIT */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square max-w-md lg:max-w-lg mx-auto">
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src="/hero-ai3.png"
                    alt="AI Fitness Coach"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-top"
                  />

                  <div className="absolute inset-0 animate-scanline pointer-events-none" />

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>
                <div className="h-[480px] lg:h-[520px]">
                  <TerminalOverlay />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserPrograms />
    </div>
  );
}

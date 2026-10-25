"use client";

import { Brand } from "@/components/brand";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-black px-6 text-center text-white">
      <Brand />
      <h1 className="text-4xl font-extrabold tracking-tight">A little out of the spectrum.</h1>
      <p className="max-w-md text-sm text-white/65">
        This page couldn’t load. Try again to continue exploring the colors.
      </p>
      <div className="flex gap-4">
        <button onClick={reset} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">
          Try again
        </button>
        <a href="/" className="rounded-full border border-white/30 px-6 py-3 text-sm">
          All colors
        </a>
      </div>
    </main>
  );
}

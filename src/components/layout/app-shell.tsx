"use client";

import React from "react";
import { DemoBanner } from "./demo-banner";
import { Header } from "./header";
import { Navigation } from "./navigation";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <DemoBanner />
      <Header />
      <Navigation />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-7 pb-24 md:pb-12">
        {children}
      </main>
    </div>
  );
}

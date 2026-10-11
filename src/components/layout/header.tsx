"use client";

import React from "react";
import Link from "next/link";
import { Activity, Flame, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const todayFormatted = "Wednesday, Oct 10";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 group-hover:bg-emerald-700 transition-colors">
            <Activity className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              FitTrack
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5">
              Personal PWA
            </span>
          </div>
        </Link>

        {/* Date & Streak Status */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200/70 rounded-lg px-2.5 py-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{todayFormatted}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50/80 border border-amber-200/60 rounded-lg px-2.5 py-1 font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>12 Day Streak</span>
          </div>

          <Badge variant="accent" className="hidden xs:inline-flex text-[11px]">
            Legs Day
          </Badge>
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-medium text-[11px] tracking-wide border border-emerald-500/30">
            <Sparkles className="w-3 h-3" /> DEMO MODE
          </span>
          <span className="text-slate-300 font-normal hidden sm:inline">
            Phase 1 UI Foundation — Displaying realistic sample workout, nutrition, and mess menu data.
          </span>
          <span className="text-slate-300 font-normal sm:hidden">
            Phase 1 UI Preview — Sample data loaded.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 hidden md:inline">
            No cloud database or paid APIs active
          </span>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss demo banner"
            className="text-slate-400 hover:text-slate-200 transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

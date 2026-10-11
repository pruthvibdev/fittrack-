"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Utensils, Droplets, Dumbbell, CalendarDays, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QuickActionsProps {
  onAddWater?: (liters: number) => void;
}

export function QuickActions({ onAddWater }: QuickActionsProps) {
  const [waterLogged, setWaterLogged] = useState(false);

  const handleQuickWater = () => {
    if (onAddWater) {
      onAddWater(0.25);
    }
    setWaterLogged(true);
    setTimeout(() => setWaterLogged(false), 2500);
  };

  return (
    <Card className="p-4 bg-white/90">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Quick Actions (Interactive)
        </h3>
        {waterLogged && (
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
            <Check className="w-3 h-3" /> +250ml Water (Demo Logged)
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={handleQuickWater}
          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-sky-50/70 hover:border-sky-200 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-100/80 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-800">
              +250ml Water
            </span>
            <span className="block text-[10px] text-slate-400">Quick hydrate (demo)</span>
          </div>
        </button>

        <Link
          href="/food"
          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50/70 hover:border-emerald-200 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-800">
              Log Meal
            </span>
            <span className="block text-[10px] text-slate-400">Food diary</span>
          </div>
        </Link>

        <Link
          href="/gym"
          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-indigo-50/70 hover:border-indigo-200 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-100/80 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-800">
              Start Workout
            </span>
            <span className="block text-[10px] text-slate-400">Today: Legs</span>
          </div>
        </Link>

        <Link
          href="/food"
          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-amber-50/70 hover:border-amber-200 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-800">
              Mess Menu
            </span>
            <span className="block text-[10px] text-slate-400">Hostel meals</span>
          </div>
        </Link>
      </div>
    </Card>
  );
}

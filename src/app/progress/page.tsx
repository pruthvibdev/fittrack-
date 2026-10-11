"use client";

import React from "react";
import { 
  WeightProgressChart, 
  NutritionProgressChart, 
  WorkoutVolumeChart 
} from "@/components/progress/charts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingDown, 
  Flame, 
  Target, 
  Award, 
  Sparkles
} from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Analytics & Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Visualize your weight trajectory, nutritional consistency, and training tonnage over time.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="accent">30-Day Tracking Window</Badge>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-3.5 border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Weight Delta
            </span>
            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              -3.3
            </span>
            <span className="text-xs font-semibold text-slate-400">kg</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-medium block mt-1">
            77.5kg → 74.2kg
          </span>
        </Card>

        <Card className="p-3.5 border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Active Streak
            </span>
            <Flame className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              12
            </span>
            <span className="text-xs font-semibold text-slate-400">days</span>
          </div>
          <span className="text-[10px] text-amber-700 font-medium block mt-1">
            Personal best!
          </span>
        </Card>

        <Card className="p-3.5 border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Protein Hit Rate
            </span>
            <Target className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              93%
            </span>
            <span className="text-xs font-semibold text-slate-400">adherence</span>
          </div>
          <span className="text-[10px] text-indigo-700 font-medium block mt-1">
            Avg 154g / day
          </span>
        </Card>

        <Card className="p-3.5 border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Monthly Volume
            </span>
            <Award className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              67.3
            </span>
            <span className="text-xs font-semibold text-slate-400">tons</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium block mt-1">
            +8% vs last month
          </span>
        </Card>
      </div>

      {/* Recharts: Weight Chart */}
      <WeightProgressChart />

      {/* Recharts: Nutrition Chart */}
      <NutritionProgressChart />

      {/* Recharts: Workout Volume Chart */}
      <WorkoutVolumeChart />

      {/* Key Insights Callout */}
      <Card className="border-slate-200 bg-emerald-50/40 p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Bi-Weekly Progress Summary
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Your rate of weight loss is approximately 0.45 kg per week, which is squarely within the optimal healthy fat loss range. High protein compliance (93%) in combination with steady progressive overload has preserved lean muscle mass.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

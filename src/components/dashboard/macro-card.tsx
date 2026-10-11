import React from "react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { MacroNutrient } from "@/types";
import { roundValue } from "@/lib/utils";

interface MacroPillProps {
  label: string;
  data: MacroNutrient;
  colorClass: string;
}

export function MacroPill({ label, data, colorClass }: MacroPillProps) {
  const percentage = Math.min(Math.round((data.current / (data.target || 1)) * 100), 100);
  const rawRemaining = Math.max(data.target - data.current, 0);

  // Sensible rounding for all calculated values
  const isLiters = data.unit.toLowerCase() === "l";
  const roundedRemaining = isLiters ? roundValue(rawRemaining, 1) : Math.round(rawRemaining);
  const roundedCurrent = isLiters ? roundValue(data.current, 1) : Math.round(data.current);
  const roundedTarget = isLiters ? roundValue(data.target, 1) : Math.round(data.target);

  // Formatted remaining string (e.g. "0.8 L left" or "22 g left")
  const formattedRemaining = isLiters
    ? `${roundedRemaining} L`
    : `${roundedRemaining} ${data.unit}`;

  return (
    <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span className="text-[11px] text-slate-400 font-mono">
          {percentage}%
        </span>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {roundedCurrent}
        </span>
        <span className="text-xs text-slate-400">
          / {roundedTarget} {data.unit}
        </span>
      </div>
      <ProgressBar
        value={data.current}
        max={data.target}
        colorClass={colorClass}
        heightClass="h-1.5"
      />
      <div className="text-[10px] text-slate-400 mt-1.5 flex justify-between">
        <span>{roundedRemaining > 0 ? `${formattedRemaining} left` : "Goal reached!"}</span>
      </div>
    </div>
  );
}

interface MacroCardProps {
  summary: {
    calories: MacroNutrient;
    protein: MacroNutrient;
    carbs: MacroNutrient;
    fat: MacroNutrient;
    fiber: MacroNutrient;
    water: MacroNutrient;
  };
}

export function MacroCard({ summary }: MacroCardProps) {
  const calPercent = Math.min(
    Math.round((summary.calories.current / (summary.calories.target || 1)) * 100),
    100
  );
  const remainingKcal = Math.round(Math.max(summary.calories.target - summary.calories.current, 0));
  const currentKcal = Math.round(summary.calories.current);
  const targetKcal = Math.round(summary.calories.target);

  return (
    <Card className="relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Daily Nutrition Summary
            </h2>
            <span className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200/80 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Sample calorie and macronutrient budget for preview only
          </p>
        </div>

        {/* Circular / Hero Calorie Stat */}
        <div className="flex items-center gap-3 bg-emerald-50/70 border border-emerald-100 rounded-xl px-4 py-2 self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
              Remaining (Demo)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
                {remainingKcal}
              </span>
              <span className="text-xs text-emerald-700 font-medium">kcal</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-3 border-emerald-500/20 flex items-center justify-center relative">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-emerald-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600 transition-all duration-700 ease-out"
                strokeDasharray={`${calPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-emerald-900">
              {calPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Main Calories Progress Bar */}
      <div className="pt-4 pb-2">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-slate-700">
            Total Calories (Demo): <span className="font-bold text-slate-900">{currentKcal}</span> / {targetKcal} kcal
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            {currentKcal} consumed
          </span>
        </div>
        <ProgressBar
          value={currentKcal}
          max={targetKcal}
          colorClass="bg-emerald-600"
          heightClass="h-2.5"
        />
      </div>

      {/* 5-Macro Grid (Protein, Carbs, Fat, Fiber, Water) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-3">
        <MacroPill
          label="Protein (Demo)"
          data={summary.protein}
          colorClass="bg-indigo-500"
        />
        <MacroPill
          label="Carbohydrates (Demo)"
          data={summary.carbs}
          colorClass="bg-amber-500"
        />
        <MacroPill
          label="Healthy Fat (Demo)"
          data={summary.fat}
          colorClass="bg-rose-400"
        />
        <MacroPill
          label="Dietary Fiber (Demo)"
          data={summary.fiber}
          colorClass="bg-teal-500"
        />
        <MacroPill
          label="Hydration (Demo)"
          data={summary.water}
          colorClass="bg-sky-500"
        />
      </div>
    </Card>
  );
}

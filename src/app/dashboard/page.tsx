"use client";

import React, { useState } from "react";
import { MacroCard } from "@/components/dashboard/macro-card";
import { TodayWorkoutCard } from "@/components/dashboard/today-workout-card";
import { WeightCard } from "@/components/dashboard/weight-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { 
  DEMO_NUTRITION_SUMMARY, 
  DEMO_TODAY_WORKOUT, 
  DEMO_WEIGHT, 
  DEMO_MEAL_GROUPS 
} from "@/lib/demo-data";
import { roundValue } from "@/lib/utils";
import { Utensils, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [nutrition, setNutrition] = useState(DEMO_NUTRITION_SUMMARY);
  const [workout] = useState(DEMO_TODAY_WORKOUT);
  const [weight] = useState(DEMO_WEIGHT);

  // Quick summary of demo logged meals
  const allLoggedItems = DEMO_MEAL_GROUPS.flatMap((g) => g.items);

  const handleAddWater = (liters: number) => {
    setNutrition((prev) => {
      const updatedCurrent = roundValue(prev.water.current + liters, 2);
      return {
        ...prev,
        water: {
          ...prev.water,
          current: updatedCurrent,
        },
      };
    });
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Personal Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Displaying sample demo metrics for workouts, macronutrients, and weight trajectory.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="outline" className="text-[11px] bg-white text-slate-600">
            Sample Profile: 74.2 kg (Demo)
          </Badge>
          <Badge variant="accent" className="text-[11px]">
            Demo Target: 2,400 kcal
          </Badge>
        </div>
      </div>

      {/* Hero Macro & Calorie Ring Card */}
      <MacroCard summary={nutrition} />

      {/* One-tap Quick Actions Bar */}
      <QuickActions onAddWater={handleAddWater} />

      {/* Two Column Workout & Weight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TodayWorkoutCard workout={workout} />
        <WeightCard weightData={weight} />
      </div>

      {/* Today's Food Diary Snapshot Card */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Utensils className="w-4 h-4" />
              </span>
              <CardTitle className="text-base sm:text-lg">Today&apos;s Logged Meals (Demo Data)</CardTitle>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {allLoggedItems.length} sample meal items loaded for UI demonstration
            </p>
          </div>
          <Link href="/food">
            <span className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              View All Meals <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </CardHeader>

        <CardContent className="pt-3">
          <div className="divide-y divide-slate-100">
            {allLoggedItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="py-2.5 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    {item.source === "mess" && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.2 rounded border border-amber-200/50">
                        Mess
                      </span>
                    )}
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1 rounded">
                      Demo
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{item.portion}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">{item.calories} kcal</span>
                  <span className="text-[10px] text-indigo-600 font-medium">{item.protein}g protein</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

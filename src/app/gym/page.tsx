"use client";

import React, { useState } from "react";
import { WeeklySplit } from "@/components/gym/weekly-split";
import { ExerciseSession } from "@/components/gym/exercise-session";
import { DEMO_WEEKLY_SPLIT, DEMO_TODAY_WORKOUT } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";

export default function GymPage() {
  const [split] = useState(DEMO_WEEKLY_SPLIT);
  const [workout] = useState(DEMO_TODAY_WORKOUT);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Gym & Training Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Log active workout sets, record weights, and review your weekly training split.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="accent">Wednesday: Legs & Core</Badge>
        </div>
      </div>

      {/* Active Workout Session with interactive sets */}
      <ExerciseSession initialWorkout={workout} />

      {/* Weekly Split Program Overview */}
      <WeeklySplit split={split} />
    </div>
  );
}

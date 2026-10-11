"use client";

import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkoutSession } from "@/types";

interface TodayWorkoutCardProps {
  workout: WorkoutSession;
}

export function TodayWorkoutCard({ workout }: TodayWorkoutCardProps) {
  // Count completed sets
  let totalSets = 0;
  let completedSets = 0;
  workout.exercises.forEach((ex) => {
    totalSets += ex.sets.length;
    completedSets += ex.sets.filter((s) => s.completed).length;
  });

  const percentage = Math.round((completedSets / (totalSets || 1)) * 100);

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Dumbbell className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Today&apos;s Training (Demo Data)
              </span>
            </div>
            <CardTitle className="text-base sm:text-lg">{workout.title}</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">{workout.focus} • Sample Session</p>
          </div>
          <Badge variant="accent">{percentage}% Complete (Demo)</Badge>
        </CardHeader>

        <CardContent className="space-y-3 pt-2">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {workout.estimatedDurationMin} mins (Sample)
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {completedSets} of {totalSets} sets done (Sample)
            </span>
          </div>

          {/* Exercise mini-list */}
          <div className="space-y-2 pt-1">
            {workout.exercises.map((exercise) => {
              const doneCount = exercise.sets.filter((s) => s.completed).length;
              const allDone = doneCount === exercise.sets.length;

              return (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        allDone
                          ? "bg-emerald-500"
                          : doneCount > 0
                          ? "bg-amber-500"
                          : "bg-slate-300"
                      }`}
                    />
                    <span className="font-medium text-slate-800">
                      {exercise.name}
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {doneCount}/{exercise.sets.length} sets
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-100">
        <Link href="/gym" className="w-full block">
          <Button variant="primary" className="w-full text-xs sm:text-sm">
            <span>Continue Workout in Gym</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

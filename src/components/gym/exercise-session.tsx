"use client";

import React, { useState, useEffect } from "react";
import { 
  Check, 
  Plus, 
  Timer, 
  Dumbbell, 
  Trophy, 
  Sparkles,
  Info
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Exercise, WorkoutSession, WorkoutSet } from "@/types";

interface ExerciseSessionProps {
  initialWorkout: WorkoutSession;
}

export function ExerciseSession({ initialWorkout }: ExerciseSessionProps) {
  const [exercises, setExercises] = useState<Exercise[]>(initialWorkout.exercises);
  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const [completedWorkout, setCompletedWorkout] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (restSeconds === null || restSeconds <= 0) return;
    const interval = setInterval(() => {
      setRestSeconds((prev) => (prev !== null && prev > 1 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [restSeconds]);

  const toggleSetComplete = (exerciseId: string, setNumber: number) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => {
            if (s.setNumber !== setNumber) return s;
            const newCompleted = !s.completed;
            if (newCompleted && restSeconds === null) {
              setRestSeconds(90); // Auto-start 90s rest on set completion
            }
            return {
              ...s,
              completed: newCompleted,
              actualReps: newCompleted ? s.actualReps || s.targetReps : s.actualReps,
            };
          }),
        };
      })
    );
  };

  const updateSetWeight = (exerciseId: string, setNumber: number, weight: number) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => (s.setNumber === setNumber ? { ...s, weightKg: weight } : s)),
        };
      })
    );
  };

  const updateSetReps = (exerciseId: string, setNumber: number, reps: number) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => (s.setNumber === setNumber ? { ...s, actualReps: reps } : s)),
        };
      })
    );
  };

  const addSet = (exerciseId: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSet: WorkoutSet = {
          setNumber: ex.sets.length + 1,
          targetReps: lastSet ? lastSet.targetReps : 10,
          weightKg: lastSet ? lastSet.weightKg : 60,
          completed: false,
        };
        return { ...ex, sets: [...ex.sets, newSet] };
      })
    );
  };

  // Stats calculation
  let totalSets = 0;
  let doneSets = 0;
  exercises.forEach((ex) => {
    totalSets += ex.sets.length;
    doneSets += ex.sets.filter((s) => s.completed).length;
  });

  return (
    <div className="space-y-4">
      {/* Session Header Card */}
      <Card className="border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Dumbbell className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {initialWorkout.title}
              </h2>
              <Badge variant="accent" className="text-[10px]">Active Session</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Target: {initialWorkout.focus} • Estimated: {initialWorkout.estimatedDurationMin} mins
            </p>
          </div>

          {/* Rest Timer Float */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between">
            {restSeconds !== null ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-emerald-800 text-xs font-semibold animate-pulse">
                <Timer className="w-4 h-4 text-emerald-600" />
                <span>Rest: {restSeconds}s</span>
                <button
                  onClick={() => setRestSeconds(null)}
                  className="text-emerald-600 hover:text-emerald-900 ml-1 text-[11px]"
                >
                  Skip
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => setRestSeconds(90)}
              >
                <Timer className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span>Start 90s Rest</span>
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              className="h-8 text-xs"
              onClick={() => setCompletedWorkout(true)}
            >
              <Trophy className="w-3.5 h-3.5 mr-1" />
              <span>Finish Workout</span>
            </Button>
          </div>
        </div>

        {/* Workout Progress Bar */}
        <div className="pt-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-600 font-medium">
              Overall Set Progress: {doneSets} / {totalSets} sets
            </span>
            <span className="font-mono text-slate-500 font-semibold text-[11px]">
              {Math.round((doneSets / (totalSets || 1)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(doneSets / (totalSets || 1)) * 100}%` }}
            />
          </div>
        </div>

        {completedWorkout && (
          <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Workout Logged!</strong> Great session. Volume recorded to demo session state.
              </span>
            </div>
            <button
              onClick={() => setCompletedWorkout(false)}
              className="text-emerald-700 underline text-[11px]"
            >
              Dismiss
            </button>
          </div>
        )}
      </Card>

      {/* Exercises Cards */}
      <div className="space-y-3.5">
        {exercises.map((exercise, index) => {
          const setsDone = exercise.sets.filter((s) => s.completed).length;
          const isAllSetsDone = setsDone === exercise.sets.length;

          return (
            <Card key={exercise.id} className="overflow-hidden border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/60 -mx-5 -mt-5 p-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <CardTitle className="text-sm sm:text-base">
                      {exercise.name}
                    </CardTitle>
                    <span className="text-[11px] text-slate-500 block mt-0.2">
                      {exercise.targetMuscle}
                    </span>
                  </div>
                </div>

                <Badge variant={isAllSetsDone ? "success" : "secondary"}>
                  {setsDone} / {exercise.sets.length} sets completed
                </Badge>
              </CardHeader>

              <CardContent className="pt-3 pb-2">
                {exercise.notes && (
                  <p className="text-[11px] text-slate-500 italic mb-2.5 flex items-center gap-1">
                    <Info className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{exercise.notes}</span>
                  </p>
                )}

                {/* Sets Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100 font-medium text-[11px]">
                        <th className="py-1.5 px-2 w-12 text-center">SET</th>
                        <th className="py-1.5 px-2">WEIGHT (KG)</th>
                        <th className="py-1.5 px-2">REPS</th>
                        <th className="py-1.5 px-2 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {exercise.sets.map((set) => (
                        <tr
                          key={set.setNumber}
                          className={`transition-colors ${
                            set.completed ? "bg-emerald-50/40" : "hover:bg-slate-50/60"
                          }`}
                        >
                          <td className="py-2 px-2 text-center font-bold text-slate-600">
                            {set.setNumber}
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="number"
                              value={set.weightKg}
                              onChange={(e) =>
                                updateSetWeight(
                                  exercise.id,
                                  set.setNumber,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-16 px-2 py-1 rounded-lg border border-slate-200 font-semibold text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                            />
                            <span className="ml-1 text-slate-400 text-[11px]">kg</span>
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="number"
                              value={set.actualReps !== undefined ? set.actualReps : set.targetReps}
                              onChange={(e) =>
                                updateSetReps(
                                  exercise.id,
                                  set.setNumber,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-16 px-2 py-1 rounded-lg border border-slate-200 font-semibold text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                            />
                            <span className="ml-1 text-slate-400 text-[11px]">
                              / {set.targetReps} reps
                            </span>
                          </td>
                          <td className="py-2 px-2 text-right">
                            <button
                              onClick={() => toggleSetComplete(exercise.id, set.setNumber)}
                              className={`p-1.5 rounded-xl transition-all ${
                                set.completed
                                  ? "bg-emerald-600 text-white shadow-xs"
                                  : "border border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"
                              }`}
                              aria-label={`Toggle set ${set.setNumber} complete`}
                            >
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-slate-600"
                    onClick={() => addSet(exercise.id)}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Add Set</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

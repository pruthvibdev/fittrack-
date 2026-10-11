"use client";

import React from "react";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SplitDay } from "@/types";

interface WeeklySplitProps {
  split: SplitDay[];
  onSelectDay?: (day: SplitDay) => void;
}

export function WeeklySplit({
  split,
  onSelectDay,
}: WeeklySplitProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Calendar className="w-4 h-4" />
            </span>
            <CardTitle className="text-base sm:text-lg">Weekly Training Split</CardTitle>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            4-Day Hypertrophy & Strength Program (Mon / Tue / Wed / Fri / Sat)
          </p>
        </div>
        <Badge variant="accent" className="hidden sm:inline-flex">
          4 of 5 Workouts Left
        </Badge>
      </CardHeader>

      <CardContent className="pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
          {split.map((item) => {
            const isToday = item.status === "today";
            const isCompleted = item.status === "completed";
            const isRest = item.type === "rest";

            return (
              <div
                key={item.day}
                onClick={() => onSelectDay && onSelectDay(item)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isToday
                    ? "bg-emerald-50/70 border-emerald-500 ring-1 ring-emerald-500/20 shadow-xs"
                    : isCompleted
                    ? "bg-slate-50/70 border-slate-200/90 hover:bg-slate-50"
                    : "bg-white border-slate-200/70 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900">
                      {item.day.slice(0, 3)}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    {isToday && (
                      <span className="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded-full">
                        TODAY
                      </span>
                    )}
                    {!isCompleted && !isToday && isRest && (
                      <span className="text-[10px] text-slate-400 font-medium">Rest</span>
                    )}
                  </div>

                  <p className="font-semibold text-slate-800 text-xs line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                    {item.focus}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-400">
                  {item.durationMin ? (
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {item.durationMin}m
                    </span>
                  ) : (
                    <span>Rest</span>
                  )}
                  {item.exercisesCount ? (
                    <span>{item.exercisesCount} ex</span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

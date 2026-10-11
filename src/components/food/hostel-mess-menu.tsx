"use client";

import React, { useState } from "react";
import { Utensils, Plus, Check, Sparkles, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DEMO_MESS_WEEKLY_MENU } from "@/lib/demo-data";
import { DayOfWeek, FoodItem, MealCategory } from "@/types";

interface HostelMessMenuProps {
  onLogMessMeal: (category: MealCategory, item: FoodItem) => void;
}

const DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function HostelMessMenu({ onLogMessMeal }: HostelMessMenuProps) {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("Wednesday"); // Wednesday = today
  const [loggedSlots, setLoggedSlots] = useState<Record<string, boolean>>({});

  const currentMenu =
    DEMO_MESS_WEEKLY_MENU.find((m) => m.day === selectedDay) ||
    DEMO_MESS_WEEKLY_MENU[0];

  const handleLog = (
    category: MealCategory,
    title: string,
    dishes: string[],
    kcal: number,
    protein: number
  ) => {
    const key = `${selectedDay}-${category}`;
    const slug = dishes[0]?.toLowerCase().replace(/[^a-z0-9]/g, "") || "dish";
    const newItem: FoodItem = {
      id: `mess-${selectedDay.toLowerCase()}-${category}-${slug}`,
      name: `Hostel Mess ${title}: ${dishes.slice(0, 2).join(", ")}`,
      portion: dishes.join(" • "),
      calories: kcal,
      protein: protein,
      carbs: Math.round((kcal - protein * 4) * 0.6 / 4),
      fat: Math.round((kcal - protein * 4) * 0.4 / 9),
      fiber: 6,
      timeLogged: "Just now",
      source: "mess",
    };

    onLogMessMeal(category, newItem);
    setLoggedSlots((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoggedSlots((prev) => ({ ...prev, [key]: false }));
    }, 2500);
  };

  const mealSlots: {
    slot: MealCategory;
    title: string;
    data: {
      dishes: string[];
      estimatedKcal: number;
      proteinGrams: number;
      notes?: string;
    };
    timing: string;
  }[] = [
    {
      slot: "breakfast",
      title: "Breakfast",
      data: currentMenu.breakfast,
      timing: "07:30 AM – 09:30 AM",
    },
    {
      slot: "lunch",
      title: "Lunch",
      data: currentMenu.lunch,
      timing: "12:30 PM – 02:30 PM",
    },
    {
      slot: "snacks",
      title: "Evening Snacks",
      data: currentMenu.snacks,
      timing: "05:00 PM – 06:15 PM",
    },
    {
      slot: "dinner",
      title: "Dinner",
      data: currentMenu.dinner,
      timing: "08:00 PM – 09:45 PM",
    },
  ];

  return (
    <Card className="border-slate-200" id="mess">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <Utensils className="w-4 h-4" />
            </span>
            <CardTitle className="text-base sm:text-lg">Hostel Mess Weekly Menu</CardTitle>
            <Badge variant="accent" className="text-[10px]">Mess Diet Mode</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            View rotating weekly meals, pre-estimated nutrition, and one-tap diary logging.
          </p>
        </div>

        {/* Day selection tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {DAYS.map((day) => {
            const isToday = day === "Wednesday";
            const isSelected = day === selectedDay;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                <span>{day.slice(0, 3)}</span>
                {isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-emerald-400" : "bg-emerald-600"}`} />
                )}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mealSlots.map((slotItem) => {
            const key = `${selectedDay}-${slotItem.slot}`;
            const isLogged = loggedSlots[key];
            return (
              <div
                key={slotItem.slot}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {slotItem.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {slotItem.timing}
                    </span>
                  </div>

                  {/* Dishes */}
                  <div className="flex flex-wrap gap-1.5 my-2">
                    {slotItem.data.dishes.map((dish, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-white border border-slate-200/90 text-slate-700 px-2 py-0.5 rounded-lg shadow-2xs"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>

                  {slotItem.data.notes && (
                    <div className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50/80 px-2 py-1 rounded-lg border border-amber-200/50 mt-1 mb-2">
                      <Sparkles className="w-3 h-3 shrink-0 text-amber-600" />
                      <span>{slotItem.data.notes}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2.5 mt-1 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold text-slate-800">
                      ~{slotItem.data.estimatedKcal} <span className="text-slate-400 font-normal">kcal</span>
                    </span>
                    <span className="font-semibold text-indigo-700">
                      ~{slotItem.data.proteinGrams}g <span className="text-slate-400 font-normal">protein</span>
                    </span>
                  </div>

                  <Button
                    variant={isLogged ? "secondary" : "outline"}
                    size="sm"
                    className="h-7 text-[11px] px-2.5"
                    onClick={() =>
                      handleLog(
                        slotItem.slot,
                        slotItem.title,
                        slotItem.data.dishes,
                        slotItem.data.estimatedKcal,
                        slotItem.data.proteinGrams
                      )
                    }
                  >
                    {isLogged ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 mr-1" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 mr-1 text-slate-500" />
                        <span>Log to Diary</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Hostel Tip Box */}
        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/70 text-xs flex items-start gap-2.5 text-emerald-950">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Hostel Mess Survival Tip</span>
            <span className="text-[11px] text-emerald-800">
              Mess curries tend to be cooked with vegetable oils. To easily hit 130g+ protein without excess calorie spillover, pair mess dal/paneer with boiled eggs from the canteen or a scoop of whey protein.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

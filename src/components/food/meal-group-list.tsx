"use client";

import React from "react";
import { Plus, Trash2, Camera } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MealGroup, MealCategory } from "@/types";

interface MealGroupListProps {
  mealGroups: MealGroup[];
  onOpenManualModal: (category: MealCategory) => void;
  onOpenPhotoModal: () => void;
  onRemoveItem: (categoryId: MealCategory, itemId: string) => void;
}

export function MealGroupList({
  mealGroups,
  onOpenManualModal,
  onOpenPhotoModal,
  onRemoveItem,
}: MealGroupListProps) {
  return (
    <div className="space-y-4">
      {mealGroups.map((group) => {
        const totalKcal = group.items.reduce((acc, curr) => acc + curr.calories, 0);
        const totalProtein = group.items.reduce((acc, curr) => acc + curr.protein, 0);

        return (
          <Card key={group.category} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/50 -mx-5 -mt-5 p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm sm:text-base capitalize">
                  {group.title}
                </CardTitle>
                <span className="text-[11px] text-slate-400 font-normal">
                  ({group.items.length} {group.items.length === 1 ? "item" : "items"})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-800">
                    {totalKcal} <span className="text-slate-400 font-normal">kcal</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-semibold text-indigo-700">
                    {totalProtein}g <span className="text-slate-400 font-normal">P</span>
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-3 pb-1">
              {group.items.length === 0 ? (
                <div className="py-5 text-center text-xs text-slate-400">
                  No food logged in {group.title.toLowerCase()} yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-2.5 flex items-start sm:items-center justify-between gap-3 text-xs group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-slate-800 text-xs sm:text-sm truncate">
                            {item.name}
                          </span>
                          {item.source === "mess" && (
                            <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.2 rounded border border-amber-200/60">
                              Mess
                            </span>
                          )}
                          {item.source === "photo" && (
                            <span className="text-[10px] bg-sky-50 text-sky-700 px-1.5 py-0.2 rounded border border-sky-200/60">
                              Photo
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {item.portion} {item.timeLogged ? `• ${item.timeLogged}` : ""}
                        </p>
                      </div>

                      {/* Macros row */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span className="font-bold text-slate-900 block text-xs">
                            {item.calories} <span className="text-[10px] font-normal text-slate-400">kcal</span>
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium block">
                            P: {item.protein}g • C: {item.carbs}g • F: {item.fat}g
                          </span>
                        </div>

                        <button
                          onClick={() => onRemoveItem(group.category, item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="opacity-40 group-hover:opacity-100 hover:text-rose-600 p-1 text-slate-400 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add item actions */}
              <div className="pt-3 pb-1 border-t border-slate-100 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-slate-600"
                  onClick={onOpenPhotoModal}
                >
                  <Camera className="w-3.5 h-3.5 mr-1" />
                  <span>Scan Photo</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => onOpenManualModal(group.category)}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Manual Add</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

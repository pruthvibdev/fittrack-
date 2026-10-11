"use client";

import React, { useState } from "react";
import { MealGroupList } from "@/components/food/meal-group-list";
import { ManualEntryModal } from "@/components/food/manual-entry-modal";
import { PhotoUploadModal } from "@/components/food/photo-upload-modal";
import { HostelMessMenu } from "@/components/food/hostel-mess-menu";
import { DEMO_MEAL_GROUPS } from "@/lib/demo-data";
import { FoodItem, MealCategory, MealGroup } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Plus, UtensilsCrossed, Sparkles } from "lucide-react";

export default function FoodPage() {
  const [mealGroups, setMealGroups] = useState<MealGroup[]>(DEMO_MEAL_GROUPS);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [targetCategory, setTargetCategory] = useState<MealCategory>("breakfast");
  const [activeTab, setActiveTab] = useState<"diary" | "mess">("diary");

  // Calculate live daily totals
  const allItems = mealGroups.flatMap((g) => g.items);
  const totalCalories = allItems.reduce((acc, i) => acc + i.calories, 0);
  const totalProtein = allItems.reduce((acc, i) => acc + i.protein, 0);
  const totalCarbs = allItems.reduce((acc, i) => acc + i.carbs, 0);
  const totalFat = allItems.reduce((acc, i) => acc + i.fat, 0);

  const handleOpenManual = (category: MealCategory) => {
    setTargetCategory(category);
    setManualModalOpen(true);
  };

  const handleAddFood = (category: MealCategory, item: FoodItem) => {
    setMealGroups((prev) =>
      prev.map((g) => {
        if (g.category !== category) return g;
        return {
          ...g,
          items: [item, ...g.items],
        };
      })
    );
  };

  const handleRemoveFood = (category: MealCategory, itemId: string) => {
    setMealGroups((prev) =>
      prev.map((g) => {
        if (g.category !== category) return g;
        return {
          ...g,
          items: g.items.filter((item) => item.id !== itemId),
        };
      })
    );
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Nutrition & Meals
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Log breakfast, lunch, snacks, dinner, scan meal photos, or pick from hostel mess.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPhotoModalOpen(true)}
            className="text-xs"
          >
            <Camera className="w-3.5 h-3.5 mr-1 text-slate-500" />
            <span>Photo Scan</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleOpenManual("lunch")}
            className="text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Manual Add</span>
          </Button>
        </div>
      </div>

      {/* Daily Macros Live Tally Bar */}
      <Card className="p-4 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Today&apos;s Nutrition Tally
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-900">
                {totalCalories}
              </span>
              <span className="text-xs text-slate-500">/ 2,400 kcal target</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl px-3 py-1.5 text-center">
              <span className="text-[10px] text-indigo-500 font-semibold uppercase block">Protein</span>
              <span className="font-bold text-indigo-900 text-sm">{totalProtein}g</span>
              <span className="text-[10px] text-slate-400 block">/ 160g</span>
            </div>
            <div className="bg-amber-50/70 border border-amber-100 rounded-xl px-3 py-1.5 text-center">
              <span className="text-[10px] text-amber-600 font-semibold uppercase block">Carbs</span>
              <span className="font-bold text-amber-900 text-sm">{totalCarbs}g</span>
              <span className="text-[10px] text-slate-400 block">/ 260g</span>
            </div>
            <div className="bg-rose-50/70 border border-rose-100 rounded-xl px-3 py-1.5 text-center">
              <span className="text-[10px] text-rose-500 font-semibold uppercase block">Fat</span>
              <span className="font-bold text-rose-900 text-sm">{totalFat}g</span>
              <span className="text-[10px] text-slate-400 block">/ 65g</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Sub-view switcher tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
        <button
          onClick={() => setActiveTab("diary")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "diary"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>Daily Diary (Breakfast, Lunch, Snacks, Dinner)</span>
        </button>

        <button
          onClick={() => setActiveTab("mess")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "mess"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Hostel Mess Weekly Menu</span>
        </button>
      </div>

      {/* Active Tab Content */}
      {activeTab === "diary" ? (
        <div className="space-y-5">
          <MealGroupList
            mealGroups={mealGroups}
            onOpenManualModal={handleOpenManual}
            onOpenPhotoModal={() => setPhotoModalOpen(true)}
            onRemoveItem={handleRemoveFood}
          />
          {/* Hostel Mess integrated below diary as well */}
          <div className="pt-2">
            <HostelMessMenu onLogMessMeal={handleAddFood} />
          </div>
        </div>
      ) : (
        <HostelMessMenu onLogMessMeal={handleAddFood} />
      )}

      {/* Manual Entry Modal */}
      <ManualEntryModal
        isOpen={manualModalOpen}
        onClose={() => setManualModalOpen(false)}
        onAddFood={handleAddFood}
        defaultCategory={targetCategory}
      />

      {/* Photo Upload Scanner Modal */}
      <PhotoUploadModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        onAddFood={handleAddFood}
      />
    </div>
  );
}

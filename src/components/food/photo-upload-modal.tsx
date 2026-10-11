"use client";

import React, { useState } from "react";
import { Camera, Sparkles, Check, RefreshCw } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FoodItem, MealCategory } from "@/types";

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (category: MealCategory, item: FoodItem) => void;
}

const SAMPLE_PREVIEWS = [
  {
    name: "Grilled Chicken & Rice Bowl",
    dish: "Lean chicken breast, jasmine rice, steamed broccoli",
    calories: 520,
    protein: 46,
    carbs: 55,
    fat: 9,
    fiber: 5,
    badge: "High Protein",
    emoji: "🥗",
  },
  {
    name: "Hostel Thali: Paneer, Dal & Rotis",
    dish: "120g Paneer curry, 1 katori dal, 2 whole wheat rotis",
    calories: 580,
    protein: 34,
    carbs: 62,
    fat: 21,
    fiber: 8,
    badge: "Mess Special",
    emoji: "🍛",
  },
  {
    name: "Overnight Oats & Whey Shake",
    dish: "Rolled oats, almond milk, 1 scoop isolate, blueberries",
    calories: 430,
    protein: 38,
    carbs: 48,
    fat: 7,
    fiber: 8,
    badge: "Balanced",
    emoji: "🥣",
  },
];

export function PhotoUploadModal({
  isOpen,
  onClose,
  onAddFood,
}: PhotoUploadModalProps) {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_PREVIEWS[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [customFileSelected, setCustomFileSelected] = useState<string | null>(null);
  const [targetCategory, setTargetCategory] = useState<MealCategory>("lunch");

  const handleSimulateAnalysis = (sample = selectedSample) => {
    setSelectedSample(sample);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFileSelected(file.name);
      handleSimulateAnalysis(SAMPLE_PREVIEWS[1]);
    }
  };

  const handleLogDetectedMeal = () => {
    const slug = selectedSample.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const newItem: FoodItem = {
      id: `photo-${targetCategory}-${slug}-${selectedSample.calories}`,
      name: `Photo Log: ${selectedSample.name}`,
      portion: selectedSample.dish,
      calories: selectedSample.calories,
      protein: selectedSample.protein,
      carbs: selectedSample.carbs,
      fat: selectedSample.fat,
      fiber: selectedSample.fiber,
      timeLogged: "Just now",
      source: "photo",
    };

    onAddFood(targetCategory, newItem);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Photo Meal Scanner (UI Preview)"
      description="Upload or snap a meal photo for automated macro estimation (Phase 1 UI)"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4 text-xs">
        {/* Notice */}
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Phase 1 UI Prototype</span>
            <span className="text-[11px] text-amber-800">
              Zero paid AI keys required. Test the photo detection flow below with realistic sample scans.
            </span>
          </div>
        </div>

        {/* Dropzone / Upload area */}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 sm:p-5 text-center bg-slate-50/60 hover:bg-slate-50 transition-colors">
          <input
            type="file"
            id="meal-photo-input"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="meal-photo-input"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-xs">
              <Camera className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="font-semibold text-slate-800 text-sm">
              {customFileSelected ? customFileSelected : "Take a photo or choose file"}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">
              Supports JPG, PNG, HEIC up to 10MB
            </span>
          </label>
        </div>

        {/* Quick Demo Previews */}
        <div>
          <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Or test with sample meal photos:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {SAMPLE_PREVIEWS.map((sample) => (
              <button
                key={sample.name}
                type="button"
                onClick={() => handleSimulateAnalysis(sample)}
                className={`p-2 rounded-xl text-left border transition-all ${
                  selectedSample.name === sample.name
                    ? "border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500/20"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <span className="text-xl block mb-1">{sample.emoji}</span>
                <span className="font-medium text-[11px] text-slate-800 line-clamp-1 block">
                  {sample.name}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {sample.calories} kcal
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mock Analysis Result Card */}
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/80">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
              {analyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  Analyzing visual contents...
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Detected Dish & Macros
                </>
              )}
            </span>
            <Badge variant="accent">{selectedSample.badge}</Badge>
          </div>

          <p className="font-semibold text-slate-800 text-sm">{selectedSample.name}</p>
          <p className="text-[11px] text-slate-500 mb-2.5">{selectedSample.dish}</p>

          <div className="grid grid-cols-4 gap-1.5 text-center">
            <div className="p-1.5 bg-white rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Energy</span>
              <span className="font-bold text-slate-800 text-xs">{selectedSample.calories} kcal</span>
            </div>
            <div className="p-1.5 bg-white rounded-lg border border-slate-100">
              <span className="text-[10px] text-indigo-500 block">Protein</span>
              <span className="font-bold text-indigo-900 text-xs">{selectedSample.protein}g</span>
            </div>
            <div className="p-1.5 bg-white rounded-lg border border-slate-100">
              <span className="text-[10px] text-amber-500 block">Carbs</span>
              <span className="font-bold text-amber-900 text-xs">{selectedSample.carbs}g</span>
            </div>
            <div className="p-1.5 bg-white rounded-lg border border-slate-100">
              <span className="text-[10px] text-rose-400 block">Fat</span>
              <span className="font-bold text-rose-900 text-xs">{selectedSample.fat}g</span>
            </div>
          </div>
        </div>

        {/* Meal Category Selector & Action */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 text-[11px]">Log into:</span>
            <select
              value={targetCategory}
              onChange={(e) => setTargetCategory(e.target.value as MealCategory)}
              className="rounded-lg border border-slate-200 px-2 py-1 text-slate-800 bg-white text-xs"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="snacks">Snacks</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleLogDetectedMeal}
              disabled={analyzing}
            >
              Add to Diary
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

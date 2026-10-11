"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FoodItem, MealCategory } from "@/types";

interface ManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (category: MealCategory, item: FoodItem) => void;
  defaultCategory?: MealCategory;
}

export function ManualEntryModal({
  isOpen,
  onClose,
  onAddFood,
  defaultCategory = "breakfast",
}: ManualEntryModalProps) {
  const [category, setCategory] = useState<MealCategory>(defaultCategory);
  const [name, setName] = useState("");
  const [portion, setPortion] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [fiber, setFiber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const newItem: FoodItem = {
      id: `manual-${category}-${slug}-${calories || "0"}`,
      name: name.trim(),
      portion: portion.trim() || "1 serving",
      calories: parseInt(calories) || 0,
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fat: parseInt(fat) || 0,
      fiber: parseInt(fiber) || 0,
      timeLogged: "Just now",
      source: "manual",
    };

    onAddFood(category, newItem);
    setName("");
    setPortion("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setFiber("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manual Nutrition Entry"
      description="Add a custom meal item to your daily tracker"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Meal Slot
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as MealCategory)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snacks">Evening Snacks</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Food Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Boiled eggs, Paneer salad, Whey shake"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Serving / Portion
          </label>
          <input
            type="text"
            placeholder="e.g. 2 whole eggs, 150g, 1 plate"
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Calories (kcal) *
            </label>
            <input
              type="number"
              placeholder="0"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Protein (g) *
            </label>
            <input
              type="number"
              placeholder="0"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Carbs (g)
            </label>
            <input
              type="number"
              placeholder="0"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Fat (g)
            </label>
            <input
              type="number"
              placeholder="0"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Fiber (g)
            </label>
            <input
              type="number"
              placeholder="0"
              value={fiber}
              onChange={(e) => setFiber(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Save Food Item
          </Button>
        </div>
      </form>
    </Modal>
  );
}

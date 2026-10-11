"use client";

import React, { useState } from "react";
import { Scale, TrendingDown, Plus, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { roundValue } from "@/lib/utils";

interface WeightCardProps {
  weightData: {
    currentKg: number;
    targetKg: number;
    startKg: number;
    weeklyChangeKg: number;
    lastLogged: string;
  };
}

export function WeightCard({ weightData }: WeightCardProps) {
  const [currentWeight, setCurrentWeight] = useState(weightData.currentKg);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputWeight, setInputWeight] = useState(weightData.currentKg.toString());
  const [saveToast, setSaveToast] = useState(false);

  // Apply sensible rounding to calculated delta values
  const totalLost = roundValue(weightData.startKg - currentWeight, 1);
  const toTarget = roundValue(currentWeight - weightData.targetKg, 1);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputWeight);
    if (!isNaN(val) && val > 30 && val < 250) {
      setCurrentWeight(roundValue(val, 1));
      setIsModalOpen(false);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }
  };

  return (
    <>
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                  <Scale className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                  Body Weight (Demo Data)
                </span>
              </div>
              <CardTitle className="text-base sm:text-lg">Sample Weight Tracker</CardTitle>
            </div>
            <Badge variant="success" className="text-[11px] gap-1">
              <TrendingDown className="w-3 h-3 text-emerald-600" />
              {weightData.weeklyChangeKg} kg this wk (Demo)
            </Badge>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {currentWeight}
              </span>
              <span className="text-slate-500 font-medium text-sm">kg (Demo)</span>
              <span className="text-xs text-slate-400 ml-auto font-mono">
                Sample entry: {weightData.lastLogged}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3">
              Sample profile metrics for UI preview only. No personal measurements stored.
            </p>

            {/* Target & Delta mini-stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Demo Goal</span>
                <span className="font-semibold text-slate-800 text-sm">
                  {weightData.targetKg} kg
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {toTarget} kg to target (sample)
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Demo Progress</span>
                <span className="font-semibold text-emerald-700 text-sm">
                  -{totalLost} kg
                </span>
                <span className="text-[10px] text-slate-400 block">
                  from sample {weightData.startKg} kg
                </span>
              </div>
            </div>

            {saveToast && (
              <div className="mt-3 p-2 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-1.5 border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Simulated weigh-in updated ({currentWeight} kg). Session state only.</span>
              </div>
            )}
          </CardContent>
        </div>

        <div className="pt-4 mt-2 border-t border-slate-100">
          <Button
            variant="outline"
            size="md"
            className="w-full text-xs sm:text-sm"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-1 text-slate-500" />
            <span>Simulate Weigh-in (Demo)</span>
          </Button>
        </div>
      </Card>

      {/* Quick Weight Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Simulate Weigh-in (Demo Data)"
        description="Updates session preview value only. No personal data stored."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Sample Weight (kg)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="30"
                max="250"
                value={inputWeight}
                onChange={(e) => setInputWeight(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-base font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                required
              />
              <span className="absolute right-3.5 top-2.5 text-sm text-slate-400 font-medium">
                kg
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Demo entry for testing UI layout and responsive display.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Update Demo Value
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

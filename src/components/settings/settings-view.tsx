"use client";

import React, { useState } from "react";
import { 
  Target, 
  Sliders, 
  Database, 
  Check, 
  Download, 
  RotateCcw, 
  ShieldCheck
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DEMO_USER_PREFERENCES } from "@/lib/demo-data";
import { UserPreferences } from "@/types";

export function SettingsView() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEMO_USER_PREFERENCES);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const handleTargetChange = (key: keyof UserPreferences["targets"], value: number) => {
    setPreferences((prev) => ({
      ...prev,
      targets: {
        ...prev.targets,
        [key]: value,
      },
    }));
  };

  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast("Nutrition targets updated in local state! (Will sync to Supabase in Phase 2)");
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(preferences, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "fittrack-demo-export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSaveToast("Exported session configuration as JSON.");
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleResetDemo = () => {
    setPreferences(DEMO_USER_PREFERENCES);
    setSaveToast("Reset all preferences to default Phase 1 demo settings.");
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Macro calorie math
  const proteinCals = preferences.targets.protein * 4;
  const carbCals = preferences.targets.carbs * 4;
  const fatCals = preferences.targets.fat * 9;
  const totalMacroCals = proteinCals + carbCals + fatCals;

  return (
    <div className="space-y-5">
      {saveToast && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center justify-between border border-emerald-200 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveToast}</span>
          </div>
          <button onClick={() => setSaveToast(null)} className="text-emerald-700 font-semibold ml-2">
            ×
          </button>
        </div>
      )}

      {/* Nutrition Goals Card */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Target className="w-4 h-4" />
              </span>
              <CardTitle className="text-base sm:text-lg">Daily Nutrition Goals</CardTitle>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize your target calorie budget and macronutrient split
            </p>
          </div>
          <Badge variant="accent">Phase 1 Editable</Badge>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSaveGoals} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Daily Calorie Target (kcal)
                </label>
                <input
                  type="number"
                  value={preferences.targets.calories}
                  onChange={(e) => handleTargetChange("calories", parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Protein Target (g)
                </label>
                <input
                  type="number"
                  value={preferences.targets.protein}
                  onChange={(e) => handleTargetChange("protein", parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Carbohydrates Target (g)
                </label>
                <input
                  type="number"
                  value={preferences.targets.carbs}
                  onChange={(e) => handleTargetChange("carbs", parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Healthy Fat Target (g)
                </label>
                <input
                  type="number"
                  value={preferences.targets.fat}
                  onChange={(e) => handleTargetChange("fat", parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dietary Fiber Target (g)
                </label>
                <input
                  type="number"
                  value={preferences.targets.fiber}
                  onChange={(e) => handleTargetChange("fiber", parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hydration Target (Liters)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={preferences.targets.water}
                  onChange={(e) => handleTargetChange("water", parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Macro Ratio Split Info */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-slate-500">
                Calculated Macro Total: <strong>{totalMacroCals} kcal</strong>
              </span>
              <div className="flex items-center gap-3 text-[11px] font-medium">
                <span className="text-indigo-600">
                  Protein: {Math.round((proteinCals / (totalMacroCals || 1)) * 100)}%
                </span>
                <span className="text-amber-600">
                  Carbs: {Math.round((carbCals / (totalMacroCals || 1)) * 100)}%
                </span>
                <span className="text-rose-500">
                  Fat: {Math.round((fatCals / (totalMacroCals || 1)) * 100)}%
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm">
                Save Nutrition Goals
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Measurement Preferences Card */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <Sliders className="w-4 h-4" />
              </span>
              <CardTitle className="text-base sm:text-lg">Measurement Preferences</CardTitle>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Units for weight, distance, energy, and special diet modes
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-3.5">
          {/* Weight Units */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
            <div>
              <span className="font-semibold text-slate-800 block">Body Weight Unit</span>
              <span className="text-slate-400 text-[11px]">Used on gym & progress charts</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
              {(["kg", "lbs"] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setPreferences((p) => ({ ...p, weightUnit: unit }))}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                    preferences.weightUnit === unit
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {unit.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Energy Units */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
            <div>
              <span className="font-semibold text-slate-800 block">Energy Unit</span>
              <span className="text-slate-400 text-[11px]">Kilocalories or Kilojoules</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
              {(["kcal", "kJ"] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setPreferences((p) => ({ ...p, energyUnit: unit }))}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                    preferences.energyUnit === unit
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Hostel Mess Diet Mode Switch */}
          <div className="flex items-center justify-between py-2 text-xs">
            <div>
              <span className="font-semibold text-slate-800 block">Hostel Mess Weekly Mode</span>
              <span className="text-slate-400 text-[11px]">
                Show rotating hostel mess menus and quick-log presets
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                setPreferences((p) => ({ ...p, messDietTracking: !p.messDietTracking }))
              }
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                preferences.messDietTracking ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  preferences.messDietTracking ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Data & Phase Roadmap Card */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
                <Database className="w-4 h-4" />
              </span>
              <CardTitle className="text-base sm:text-lg">Data & Phase 1 Scope</CardTitle>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              FitTrack local session management and Phase 2 roadmap
            </p>
          </div>
          <Badge variant="outline">Client State</Badge>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Phase 1 Architecture Compliance</span>
            </div>
            <p className="text-[11px] text-slate-500">
              This deployment does not connect to any paid APIs, OpenAI credentials, or external databases. All interactions are handled responsively in clean React 19 App Router state.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              className="text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              <span>Export Config (JSON)</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetDemo}
              className="text-xs text-slate-600"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span>Reset Demo Defaults</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

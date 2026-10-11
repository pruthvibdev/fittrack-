"use client";

import React from "react";
import { SettingsView } from "@/components/settings/settings-view";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Adjust your daily nutrition targets, units of measurement, and demo data presets.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="accent">Phase 1 Config</Badge>
        </div>
      </div>

      <SettingsView />
    </div>
  );
}

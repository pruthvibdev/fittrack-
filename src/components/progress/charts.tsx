"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DEMO_PROGRESS_WEIGHT, 
  DEMO_PROGRESS_NUTRITION, 
  DEMO_PROGRESS_WORKOUTS 
} from "@/lib/demo-data";
import { TrendingDown, Utensils, Dumbbell } from "lucide-react";

export function WeightProgressChart() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d">("30d");

  return (
    <Card className="border-slate-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <TrendingDown className="w-4 h-4" />
            </span>
            <CardTitle className="text-base sm:text-lg">Body Weight Trend</CardTitle>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Tracking morning fasted weigh-ins vs 72.0 kg target
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl self-start sm:self-auto">
          {(["7d", "30d", "90d"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                timeframe === t
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={DEMO_PROGRESS_WEIGHT}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <YAxis
                domain={[70, 78]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                unit="kg"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  borderColor: "#e2e8f0",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
                formatter={(val) => [`${val} kg`, "Weight"]}
              />
              <ReferenceLine
                y={72.0}
                stroke="#64748b"
                strokeDasharray="4 4"
                label={{ value: "Target 72kg", fill: "#64748b", fontSize: 10, position: "insideBottomRight" }}
              />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#059669"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#weightGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function NutritionProgressChart() {
  return (
    <Card className="border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Utensils className="w-4 h-4" />
            </span>
            <CardTitle className="text-base sm:text-lg">Calorie & Protein Consistency</CardTitle>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily intake vs 2,400 kcal & 160g protein targets
          </p>
        </div>
        <Badge variant="accent">Last 7 Days</Badge>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DEMO_PROGRESS_NUTRITION}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <YAxis
                domain={[0, 2600]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  borderColor: "#e2e8f0",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
                formatter={(val, name) => [
                  name === "calories" ? `${val} kcal` : `${val}g`,
                  name === "calories" ? "Calories" : "Protein",
                ]}
              />
              <ReferenceLine
                y={2400}
                stroke="#059669"
                strokeDasharray="3 3"
                label={{ value: "2400 kcal Goal", fill: "#059669", fontSize: 10 }}
              />
              <Bar dataKey="calories" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function WorkoutVolumeChart() {
  return (
    <Card className="border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <Dumbbell className="w-4 h-4" />
            </span>
            <CardTitle className="text-base sm:text-lg">Weekly Training Volume</CardTitle>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Total tonnage lifted across weekly splits (Sets × Reps × Weight)
          </p>
        </div>
        <Badge variant="accent">Monthly Progression</Badge>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DEMO_PROGRESS_WORKOUTS}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                unit="kg"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  borderColor: "#e2e8f0",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
                formatter={(val) => [
                  `${Number(val).toLocaleString()} kg`,
                  "Volume Load",
                ]}
              />
              <Bar dataKey="volumeKg" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

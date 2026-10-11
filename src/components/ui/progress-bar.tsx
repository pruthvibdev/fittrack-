import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
  className?: string;
  heightClass?: string;
}

export function ProgressBar({
  value,
  max,
  colorClass = "bg-emerald-500",
  className,
  heightClass = "h-2",
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / (max || 1)) * 100), 100);

  return (
    <div
      className={cn(
        "w-full bg-slate-100 rounded-full overflow-hidden",
        heightClass,
        className
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500 ease-out", colorClass)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

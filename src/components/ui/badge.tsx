import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "accent" | "success" | "warning";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border-slate-200/60",
    secondary: "bg-slate-100/80 text-slate-600 border-transparent",
    outline: "bg-transparent text-slate-600 border-slate-200",
    accent: "bg-emerald-50 text-emerald-700 border-emerald-200/60 font-medium",
    success: "bg-emerald-100/70 text-emerald-800 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200/60",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

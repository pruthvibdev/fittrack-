"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Dumbbell, 
  UtensilsCrossed, 
  TrendingUp, 
  Settings2 
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: "Gym",
    href: "/gym",
    icon: Dumbbell,
    badge: "Today",
  },
  {
    label: "Food",
    href: "/food",
    icon: UtensilsCrossed,
    badge: null,
  },
  {
    label: "Progress",
    href: "/progress",
    icon: TrendingUp,
    badge: null,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings2,
    badge: null,
  },
];

export function Navigation() {
  const pathname = usePathname();

  const isCurrent = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop / Tablet Navigation Bar (Visible on md and larger) */}
      <nav 
        aria-label="Desktop Navigation"
        className="hidden md:block bg-white border-b border-slate-200/80 sticky top-[57px] z-30"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-1 py-1">
            {NAV_ITEMS.map((item) => {
              const active = isCurrent(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all relative",
                    active
                      ? "text-emerald-700 bg-emerald-50/90 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <Icon className={cn("w-4 h-4", active ? "text-emerald-600" : "text-slate-400")} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-medium bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar (Visible only on mobile < md) */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-2">
          {NAV_ITEMS.map((item) => {
            const active = isCurrent(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-1 relative transition-colors select-none",
                  active
                    ? "text-emerald-700 font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <div
                  className={cn(
                    "p-1 rounded-xl transition-all relative",
                    active && "bg-emerald-50 text-emerald-600"
                  )}
                >
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                  {item.badge && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

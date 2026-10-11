export type MacroNutrient = {
  current: number;
  target: number;
  unit: string;
};

export type DailyNutritionSummary = {
  date: string;
  calories: MacroNutrient;
  protein: MacroNutrient;
  carbs: MacroNutrient;
  fat: MacroNutrient;
  fiber: MacroNutrient;
  water: MacroNutrient; // in liters or ml
};

export type MealCategory = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

export interface FoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  timeLogged?: string;
  source?: 'manual' | 'photo' | 'mess';
}

export interface MealGroup {
  category: MealCategory;
  title: string;
  recommendedKcal: number;
  items: FoodItem[];
}

export interface WorkoutSet {
  setNumber: number;
  targetReps: number;
  actualReps?: number;
  weightKg: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  sets: WorkoutSet[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  title: string;
  focus: string;
  estimatedDurationMin: number;
  completed: boolean;
  exercises: Exercise[];
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface SplitDay {
  day: DayOfWeek;
  title: string;
  type: 'workout' | 'rest';
  focus: string;
  status: 'completed' | 'today' | 'upcoming';
  durationMin?: number;
  exercisesCount?: number;
}

export interface MessDayMenu {
  day: DayOfWeek;
  breakfast: {
    dishes: string[];
    estimatedKcal: number;
    proteinGrams: number;
    notes?: string;
  };
  lunch: {
    dishes: string[];
    estimatedKcal: number;
    proteinGrams: number;
    notes?: string;
  };
  snacks: {
    dishes: string[];
    estimatedKcal: number;
    proteinGrams: number;
    notes?: string;
  };
  dinner: {
    dishes: string[];
    estimatedKcal: number;
    proteinGrams: number;
    notes?: string;
  };
}

export interface WeightRecord {
  date: string;
  weight: number; // in kg
  note?: string;
}

export interface UserPreferences {
  weightUnit: 'kg' | 'lbs';
  heightUnit: 'cm' | 'ft';
  energyUnit: 'kcal' | 'kJ';
  waterUnit: 'L' | 'oz';
  messDietTracking: boolean;
  theme: 'light' | 'system';
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    water: number;
  };
}

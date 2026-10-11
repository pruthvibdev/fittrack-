import { 
  DailyNutritionSummary, 
  MealGroup, 
  SplitDay, 
  WorkoutSession, 
  MessDayMenu, 
  UserPreferences 
} from "@/types";

export const IS_DEMO_MODE = true;

export const DEMO_NUTRITION_SUMMARY: DailyNutritionSummary = {
  date: "Today, Oct 10",
  calories: { current: 1840, target: 2400, unit: "kcal" },
  protein: { current: 138, target: 160, unit: "g" },
  carbs: { current: 210, target: 260, unit: "g" },
  fat: { current: 52, target: 65, unit: "g" },
  fiber: { current: 28, target: 35, unit: "g" },
  water: { current: 2.7, target: 3.5, unit: "L" },
};

export const DEMO_WEIGHT = {
  currentKg: 74.2,
  targetKg: 72.0,
  startKg: 77.5,
  weeklyChangeKg: -0.4,
  lastLogged: "Today at 7:15 AM",
};

export const DEMO_MEAL_GROUPS: MealGroup[] = [
  {
    category: "breakfast",
    title: "Breakfast",
    recommendedKcal: 600,
    items: [
      {
        id: "m-1",
        name: "Rolled Oats with Almond Milk & Whey",
        portion: "1 medium bowl (80g oats, 1 scoop whey)",
        calories: 440,
        protein: 34,
        carbs: 58,
        fat: 7,
        fiber: 9,
        timeLogged: "08:15 AM",
        source: "manual",
      },
      {
        id: "m-2",
        name: "Banana & Chia Seeds",
        portion: "1 large banana (120g) + 10g seeds",
        calories: 145,
        protein: 3,
        carbs: 32,
        fat: 3,
        fiber: 5,
        timeLogged: "08:20 AM",
        source: "manual",
      },
    ],
  },
  {
    category: "lunch",
    title: "Lunch",
    recommendedKcal: 750,
    items: [
      {
        id: "m-3",
        name: "Hostel Mess: Grilled Paneer & Mixed Dal",
        portion: "150g paneer + 1 bowl yellow dal",
        calories: 490,
        protein: 38,
        carbs: 26,
        fat: 26,
        fiber: 6,
        timeLogged: "01:20 PM",
        source: "mess",
      },
      {
        id: "m-4",
        name: "Steamed Brown Rice & Cucumber Salad",
        portion: "1.5 cup cooked rice + greens",
        calories: 260,
        protein: 6,
        carbs: 54,
        fat: 2,
        fiber: 4,
        timeLogged: "01:25 PM",
        source: "mess",
      },
    ],
  },
  {
    category: "snacks",
    title: "Evening Snacks / Pre-Workout",
    recommendedKcal: 350,
    items: [
      {
        id: "m-5",
        name: "Greek Yogurt with Roasted Almonds",
        portion: "1 cup unsweetened (170g) + 15 almonds",
        calories: 245,
        protein: 19,
        carbs: 10,
        fat: 14,
        fiber: 2,
        timeLogged: "05:10 PM",
        source: "manual",
      },
      {
        id: "m-6",
        name: "Black Coffee & Apple",
        portion: "1 cup espresso + 1 apple",
        calories: 70,
        protein: 1,
        carbs: 18,
        fat: 0,
        fiber: 3,
        timeLogged: "05:15 PM",
        source: "photo",
      },
    ],
  },
  {
    category: "dinner",
    title: "Dinner",
    recommendedKcal: 700,
    items: [
      {
        id: "m-7",
        name: "Planned: Tofu / Soya Chunks Stir-fry & 2 Whole Wheat Rotis",
        portion: "Planned evening meal",
        calories: 430,
        protein: 37,
        carbs: 42,
        fat: 10,
        fiber: 8,
        timeLogged: "Planned for 08:30 PM",
        source: "mess",
      },
    ],
  },
];

export const DEMO_TODAY_WORKOUT: WorkoutSession = {
  id: "session-wed-legs",
  title: "Legs & Core Hypertrophy",
  focus: "Quads, Hamstrings, Glutes & Abs",
  estimatedDurationMin: 55,
  completed: false,
  exercises: [
    {
      id: "ex-1",
      name: "Barbell Back Squats",
      targetMuscle: "Quadriceps & Glutes",
      notes: "Focus on controlled depth, pause slightly at the bottom.",
      sets: [
        { setNumber: 1, targetReps: 10, actualReps: 10, weightKg: 80, completed: true },
        { setNumber: 2, targetReps: 8, actualReps: 8, weightKg: 90, completed: true },
        { setNumber: 3, targetReps: 8, actualReps: 8, weightKg: 95, completed: true },
        { setNumber: 4, targetReps: 6, weightKg: 100, completed: false },
      ],
    },
    {
      id: "ex-2",
      name: "Romanian Deadlifts (RDL)",
      targetMuscle: "Hamstrings & Glutes",
      notes: "Hinge at the hips, neutral spine.",
      sets: [
        { setNumber: 1, targetReps: 10, actualReps: 10, weightKg: 70, completed: true },
        { setNumber: 2, targetReps: 10, weightKg: 75, completed: false },
        { setNumber: 3, targetReps: 8, weightKg: 80, completed: false },
      ],
    },
    {
      id: "ex-3",
      name: "Bulgarian Split Squats",
      targetMuscle: "Quads & Stabilizers",
      notes: "Dumbbells in each hand, vertical shin angle.",
      sets: [
        { setNumber: 1, targetReps: 12, weightKg: 18, completed: false },
        { setNumber: 2, targetReps: 12, weightKg: 18, completed: false },
        { setNumber: 3, targetReps: 10, weightKg: 20, completed: false },
      ],
    },
    {
      id: "ex-4",
      name: "Hanging Leg Raises",
      targetMuscle: "Abdominals & Hip Flexors",
      notes: "Avoid swinging, toes to bar if possible.",
      sets: [
        { setNumber: 1, targetReps: 15, weightKg: 0, completed: false },
        { setNumber: 2, targetReps: 12, weightKg: 0, completed: false },
        { setNumber: 3, targetReps: 12, weightKg: 0, completed: false },
      ],
    },
  ],
};

export const DEMO_WEEKLY_SPLIT: SplitDay[] = [
  {
    day: "Monday",
    title: "Push Focus (Chest & Shoulders)",
    type: "workout",
    focus: "Bench Press, Overhead Press, Incline Dumbbell, Lateral Raises",
    status: "completed",
    durationMin: 55,
    exercisesCount: 5,
  },
  {
    day: "Tuesday",
    title: "Pull Focus (Back & Biceps)",
    type: "workout",
    focus: "Pull-ups, Barbell Rows, Lat Pulldown, Incline Bicep Curls",
    status: "completed",
    durationMin: 60,
    exercisesCount: 5,
  },
  {
    day: "Wednesday",
    title: "Legs & Core Hypertrophy",
    type: "workout",
    focus: "Squats, RDLs, Bulgarian Split Squats, Hanging Leg Raises",
    status: "today",
    durationMin: 55,
    exercisesCount: 4,
  },
  {
    day: "Thursday",
    title: "Active Recovery & Mobility",
    type: "rest",
    focus: "30-min brisk walk, foam rolling, hip & thoracic spine openers",
    status: "upcoming",
    durationMin: 35,
    exercisesCount: 0,
  },
  {
    day: "Friday",
    title: "Upper Power & Speed",
    type: "workout",
    focus: "Weighted Dips, Barbell Row, Push Press, Face Pulls",
    status: "upcoming",
    durationMin: 50,
    exercisesCount: 5,
  },
  {
    day: "Saturday",
    title: "Lower Hypertrophy & Calves",
    type: "workout",
    focus: "Front Squats, Leg Curls, Standing Calf Raises, Planks",
    status: "upcoming",
    durationMin: 50,
    exercisesCount: 4,
  },
  {
    day: "Sunday",
    title: "Full Rest & Meal Prep",
    type: "rest",
    focus: "Hydration reset, sleep replenishment, weekly menu check",
    status: "upcoming",
    durationMin: 0,
    exercisesCount: 0,
  },
];

export const DEMO_MESS_WEEKLY_MENU: MessDayMenu[] = [
  {
    day: "Monday",
    breakfast: {
      dishes: ["Poha with peanuts", "Boiled eggs / Sprouts", "Tea & Milk"],
      estimatedKcal: 420,
      proteinGrams: 18,
      notes: "Grab double boiled eggs or extra peanuts for protein",
    },
    lunch: {
      dishes: ["Dal Fry", "Mix Veg Sabzi", "Chapati (3x)", "Jeera Rice", "Curd"],
      estimatedKcal: 650,
      proteinGrams: 22,
    },
    snacks: {
      dishes: ["Roasted chana / Samosa", "Chai"],
      estimatedKcal: 250,
      proteinGrams: 8,
      notes: "Pick roasted chana over deep-fried snacks",
    },
    dinner: {
      dishes: ["Paneer Bhurji / Soya chunks", "Lauki Kofta", "Roti", "Salad bowl"],
      estimatedKcal: 580,
      proteinGrams: 32,
    },
  },
  {
    day: "Tuesday",
    breakfast: {
      dishes: ["Idli Sambhar with Coconut Chutney", "Boiled Eggs", "Coffee/Tea"],
      estimatedKcal: 380,
      proteinGrams: 16,
    },
    lunch: {
      dishes: ["Rajma Masala", "Steamed Basmati Rice", "Bhindi Masala", "Cucumber Raita"],
      estimatedKcal: 680,
      proteinGrams: 24,
      notes: "High fiber day; good complex carbs",
    },
    snacks: {
      dishes: ["Sweet Corn Chaat", "Lemon Tea"],
      estimatedKcal: 180,
      proteinGrams: 5,
    },
    dinner: {
      dishes: ["Egg Curry / Mushroom Mattar", "Tawa Roti", "Dal Tadka", "Green Salad"],
      estimatedKcal: 620,
      proteinGrams: 28,
    },
  },
  {
    day: "Wednesday",
    breakfast: {
      dishes: ["Aloo Paratha with Curd & Pickle", "Boiled Eggs", "Milk/Tea"],
      estimatedKcal: 480,
      proteinGrams: 15,
      notes: "Today's Breakfast! Ask for extra dahi for 8g extra protein",
    },
    lunch: {
      dishes: ["Chole Bhature / Chole Rice", "Onion & Tomato Salad", "Boondi Raita"],
      estimatedKcal: 720,
      proteinGrams: 26,
      notes: "Opt for steamed rice over bhature on training days",
    },
    snacks: {
      dishes: ["Paneer Pakora / Sprout Salad", "Tea"],
      estimatedKcal: 260,
      proteinGrams: 12,
    },
    dinner: {
      dishes: ["Palak Paneer / Chicken Curry (Spl)", "Jeera Rice", "Roti", "Moong Dal"],
      estimatedKcal: 690,
      proteinGrams: 36,
      notes: "Special Dinner night! High protein target reached effortlessly",
    },
  },
  {
    day: "Thursday",
    breakfast: {
      dishes: ["Upma with coconut chutney", "Banana & Milk", "Boiled Eggs"],
      estimatedKcal: 410,
      proteinGrams: 17,
    },
    lunch: {
      dishes: ["Kadhi Pakora", "Khichdi & Steamed Rice", "Aloo Gobi", "Papad"],
      estimatedKcal: 640,
      proteinGrams: 19,
    },
    snacks: {
      dishes: ["Bhel Puri / Fruit Chaat", "Chai"],
      estimatedKcal: 210,
      proteinGrams: 5,
    },
    dinner: {
      dishes: ["Soya Granules Keema", "Dal Makhani", "Tawa Roti", "Fresh Salad"],
      estimatedKcal: 610,
      proteinGrams: 34,
    },
  },
  {
    day: "Friday",
    breakfast: {
      dishes: ["Moong Dal Chilla", "Mint Chutney", "Boiled Eggs & Tea"],
      estimatedKcal: 390,
      proteinGrams: 22,
      notes: "Excellent high-protein breakfast choice",
    },
    lunch: {
      dishes: ["Paneer Butter Masala", "Dal Fry", "Tandoori Roti", "Veg Pulao"],
      estimatedKcal: 710,
      proteinGrams: 28,
    },
    snacks: {
      dishes: ["Bread Pakora / Boiled Chana", "Tea"],
      estimatedKcal: 240,
      proteinGrams: 9,
    },
    dinner: {
      dishes: ["Egg Bhurji / Veg Kofta", "Roti", "Yellow Dal", "Cucumber Salad"],
      estimatedKcal: 590,
      proteinGrams: 30,
    },
  },
  {
    day: "Saturday",
    breakfast: {
      dishes: ["Masala Dosa with Sambhar & Chutney", "Boiled Eggs"],
      estimatedKcal: 430,
      proteinGrams: 14,
    },
    lunch: {
      dishes: ["Kala Chana Curry", "Brown Rice / Chapati", "Aloo Beans", "Curd"],
      estimatedKcal: 660,
      proteinGrams: 25,
    },
    snacks: {
      dishes: ["Biscuits & Salted Peanuts", "Filter Coffee"],
      estimatedKcal: 220,
      proteinGrams: 7,
    },
    dinner: {
      dishes: ["Veg Biryani with Raita / Chicken Biryani (Spl)", "Gulab Jamun"],
      estimatedKcal: 780,
      proteinGrams: 29,
    },
  },
  {
    day: "Sunday",
    breakfast: {
      dishes: ["Puri Bhaji with Halwa (Sunday Brunch)", "Tea & Coffee"],
      estimatedKcal: 650,
      proteinGrams: 12,
      notes: "Cheat meal vibe; balance with higher protein dinner",
    },
    lunch: {
      dishes: ["Light Khichdi / Curd Rice", "Roasted Papad", "Salad"],
      estimatedKcal: 520,
      proteinGrams: 16,
    },
    snacks: {
      dishes: ["Fruit Bowl", "Green Tea"],
      estimatedKcal: 120,
      proteinGrams: 2,
    },
    dinner: {
      dishes: ["Paneer Tikka / Soya Chaap", "Dal Tadka", "Roti", "Ice Cream"],
      estimatedKcal: 670,
      proteinGrams: 33,
    },
  },
];

export const DEMO_PROGRESS_WEIGHT: { date: string; weight: number; target: number }[] = [
  { date: "Sep 12", weight: 77.2, target: 72.0 },
  { date: "Sep 19", weight: 76.5, target: 72.0 },
  { date: "Sep 26", weight: 75.9, target: 72.0 },
  { date: "Oct 03", weight: 75.1, target: 72.0 },
  { date: "Oct 06", weight: 74.6, target: 72.0 },
  { date: "Oct 08", weight: 74.4, target: 72.0 },
  { date: "Oct 10", weight: 74.2, target: 72.0 },
];

export const DEMO_PROGRESS_NUTRITION: { date: string; calories: number; targetCal: number; protein: number; targetProtein: number }[] = [
  { date: "Oct 04", calories: 2320, targetCal: 2400, protein: 152, targetProtein: 160 },
  { date: "Oct 05", calories: 2440, targetCal: 2400, protein: 165, targetProtein: 160 },
  { date: "Oct 06", calories: 2280, targetCal: 2400, protein: 148, targetProtein: 160 },
  { date: "Oct 07", calories: 2390, targetCal: 2400, protein: 158, targetProtein: 160 },
  { date: "Oct 08", calories: 2410, targetCal: 2400, protein: 162, targetProtein: 160 },
  { date: "Oct 09", calories: 2350, targetCal: 2400, protein: 155, targetProtein: 160 },
  { date: "Oct 10", calories: 1840, targetCal: 2400, protein: 138, targetProtein: 160 },
];

export const DEMO_PROGRESS_WORKOUTS: { week: string; workouts: number; volumeKg: number }[] = [
  { week: "Week 1", workouts: 4, volumeKg: 14200 },
  { week: "Week 2", workouts: 5, volumeKg: 16800 },
  { week: "Week 3", workouts: 5, volumeKg: 17400 },
  { week: "Week 4", workouts: 5, volumeKg: 18900 },
];

export const DEMO_USER_PREFERENCES: UserPreferences = {
  weightUnit: "kg",
  heightUnit: "cm",
  energyUnit: "kcal",
  waterUnit: "L",
  messDietTracking: true,
  theme: "light",
  targets: {
    calories: 2400,
    protein: 160,
    carbs: 260,
    fat: 65,
    fiber: 35,
    water: 3.5,
  },
};

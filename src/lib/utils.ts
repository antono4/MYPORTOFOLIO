import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateRange(
  startDate: string,
  endDate: string | null,
  isCurrent: boolean
): string {
  const start = formatDate(startDate);
  if (isCurrent) {
    return `${start} - Present`;
  }
  return endDate ? `${start} - ${formatDate(endDate)}` : start;
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "AI/ML",
  "Tools",
  "Soft Skills",
];

export const proficiencyLevels = [
  { value: "beginner", label: "Beginner", color: "text-gray-500" },
  { value: "intermediate", label: "Intermediate", color: "text-blue-500" },
  { value: "expert", label: "Expert", color: "text-emerald-500" },
];

export const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focused on content",
    preview: "/templates/minimal.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and expressive layout for creative developers",
    preview: "/templates/creative.png",
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Sleek dark theme for the night owls",
    preview: "/templates/dark.png",
  },
  {
    id: "card",
    name: "Card Based",
    description: "Modern card layout for showcasing projects",
    preview: "/templates/card.png",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional portfolio layout",
    preview: "/templates/classic.png",
  },
];

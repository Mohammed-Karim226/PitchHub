import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatedViews = (viewNo: number): string => {
  if (viewNo && viewNo >= 1_000_000) {
    return `${(viewNo / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  } else if (viewNo >= 1_000) {
    return `${(viewNo / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  } else {
    return viewNo?.toString();
  }
};

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

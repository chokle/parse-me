import { useEffect, useState, useCallback } from "react";

export type Reviewer = { name: string; email: string };

const KEY = "syntax.reviewer.v1";
const EVENT = "syntax-reviewer-updated";

export function readReviewer(): Reviewer | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Reviewer;
    if (!parsed?.name || !parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveReviewer(r: Reviewer) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(r));
  window.dispatchEvent(new Event(EVENT));
}

export function clearReviewer() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function useReviewer() {
  const [reviewer, setReviewer] = useState<Reviewer | null>(null);
  const refresh = useCallback(() => setReviewer(readReviewer()), []);
  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener(EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener(EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [refresh]);
  return reviewer;
}

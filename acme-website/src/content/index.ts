import { en, type SiteCopy } from "./en";

// The site is English-only. `Lang` is kept as a single-value type so the content helpers stay typed.
export type Lang = "en";
export const LANGS: Lang[] = ["en"];
export const copy: Record<Lang, SiteCopy> = { en };
export const isLang = (value: string): value is Lang => value === "en";

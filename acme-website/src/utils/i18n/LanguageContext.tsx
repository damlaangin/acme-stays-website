"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { copy, type Lang } from "@/content";
import type { SiteCopy } from "@/content/en";

type Ctx = {
  lang: Lang;
  c: SiteCopy;
  /** Site paths are not prefixed (the site is English-only); kept so links stay in one place. */
  href: (path: string) => string;
};

const LanguageContext = createContext<Ctx>({ lang: "en", c: copy.en, href: (p) => p });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const value = useMemo<Ctx>(() => ({ lang: "en", c: copy.en, href: (p) => p }), []);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);

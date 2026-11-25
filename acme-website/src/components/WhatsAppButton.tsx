"use client";

import { useLang } from "@/utils/i18n/LanguageContext";
import { BRAND } from "@/utils/dummy";

export default function WhatsAppButton() {
  const { c } = useLang();
  const phone = BRAND.whatsapp.replace("+", "");
  return (
    <a
      className="wa"
      href={`https://wa.me/${phone}?text=${encodeURIComponent(c.whatsapp.message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={c.whatsapp.label}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm5.77 14.07c-.24.68-1.4 1.3-1.95 1.35-.5.05-1.13.07-1.82-.12a16.6 16.6 0 0 1-1.65-.61 12.9 12.9 0 0 1-4.93-4.35c-.25-.33-1.1-1.46-1.1-2.8s.7-1.98.95-2.25c.24-.27.52-.34.7-.34h.5c.16 0 .38-.06.6.46.22.55.76 1.9.83 2.04.07.14.11.3.02.48-.1.18-.14.3-.28.46-.14.16-.3.35-.42.47-.14.14-.28.29-.12.57.16.27.7 1.15 1.5 1.87 1.03.92 1.9 1.2 2.17 1.34.27.14.43.12.6-.07.16-.19.7-.82.88-1.1.18-.27.37-.23.62-.14.25.1 1.6.76 1.87.9.27.14.45.2.52.32.07.11.07.66-.17 1.34Z" />
      </svg>
    </a>
  );
}

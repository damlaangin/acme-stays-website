"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/utils/i18n/LanguageContext";

export default function Header() {
  const { c, href } = useLang();
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { to: "/stays", label: c.nav.stays },
    { to: "/homeowner", label: c.nav.owners },
    { to: "/corporate", label: c.nav.corporate },
    { to: "/whoweare", label: c.nav.about },
    { to: "/blogs", label: c.nav.blog },
    { to: "/faqs", label: c.nav.faq },
  ];
  // Pages without a dark hero (listing detail) always use the solid header.
  const forceSolid = /\/stays\/[^/]+$/.test(pathname ?? "");
  const isActive = (to: string) => pathname?.startsWith(href(to));

  return (
    <>
      <header className={`site-header ${solid || open || forceSolid ? "is-solid" : ""}`}>
        <div className="container nav">
          <Link href={href("/")} className="nav-logo" aria-label={c.brand.name}>
            <img src="/images/logo-wide.png" alt={c.brand.name} />
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.to} href={href(l.to)} aria-current={isActive(l.to) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <Link href={href("/homeowner#valuation")} className="btn btn-accent btn-sm">
              {c.nav.cta}
            </Link>
            <button type="button" className="burger" aria-label={c.nav.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <nav id="mobile-menu" aria-label="Mobile" className={`mobile-menu ${open ? "is-open" : ""}`}>
        {links.map((l) => (
          <Link key={l.to} href={href(l.to)}>
            {l.label}
          </Link>
        ))}
        <Link href={href("/contact")}>{c.nav.contact}</Link>
        <Link href={href("/homeowner#valuation")} className="btn btn-accent">
          {c.nav.cta}
        </Link>
      </nav>
    </>
  );
}

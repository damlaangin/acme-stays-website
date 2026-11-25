"use client";

import Link from "next/link";
import { useLang } from "@/utils/i18n/LanguageContext";
import { BRAND } from "@/utils/dummy";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Icon } from "./Icon";

export default function Footer() {
  const { c, href } = useLang();
  const f = c.footer;
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href={href("/")} className="footer-logo" aria-label={c.brand.name}>
              <img src="/images/logo-wide.png" alt={c.brand.name} />
            </Link>
            <p>{f.about}</p>
            <div className="socials">
              <a href={BRAND.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram aria-hidden="true" /></a>
              <a href={BRAND.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedinIn aria-hidden="true" /></a>
              <a href={BRAND.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF aria-hidden="true" /></a>
            </div>
          </div>
          <div>
            <p className="footer-heading">{f.explore}</p>
            <ul>
              <li><Link href={href("/stays")}>{c.nav.stays}</Link></li>
              <li><Link href={href("/homeowner")}>{c.nav.owners}</Link></li>
              <li><Link href={href("/corporate")}>{c.nav.corporate}</Link></li>
              <li><Link href={href("/blogs")}>{c.nav.blog}</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">{f.company}</p>
            <ul>
              <li><Link href={href("/whoweare")}>{c.nav.about}</Link></li>
              <li><Link href={href("/faqs")}>{c.nav.faq}</Link></li>
              <li><Link href={href("/contact")}>{c.nav.contact}</Link></li>
              <li><Link href={href("/privacy")}>{f.privacy}</Link></li>
              <li><Link href={href("/terms")}>{f.terms}</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">{f.contact}</p>
            <ul>
              <li style={{ display: "flex", gap: ".6rem" }}><Icon name="pin" size={18} />{BRAND.address}</li>
              <li style={{ display: "flex", gap: ".6rem" }}><Icon name="phone" size={18} /><a href={`tel:+${BRAND.phoneRaw}`}>{BRAND.phoneDisplay}</a></li>
              <li style={{ display: "flex", gap: ".6rem" }}><Icon name="mail" size={18} /><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {c.brand.name}. {f.rights}</span>
          <span>{f.demo}</span>
        </div>
      </div>
    </footer>
  );
}

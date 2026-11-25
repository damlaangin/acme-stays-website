import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { copy } from "@/content";
import { LanguageProvider } from "@/utils/i18n/LanguageContext";
import { BRAND } from "@/utils/dummy";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

// Same typeface as the Acme portfolio site.
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-montserrat" });

const c = copy.en;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08234d",
};

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: { default: c.meta.title, template: `%s | ${c.brand.name}` },
  description: c.meta.description,
  applicationName: c.brand.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    siteName: c.brand.name,
    images: [{ url: "/images/og_banner.jpg", width: 1200, height: 630, alt: c.brand.name }],
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: c.meta.title, description: c.meta.description, images: ["/images/og_banner.jpg"] },
  icons: {
    icon: [
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: c.brand.name,
  url: BRAND.siteUrl,
  logo: `${BRAND.siteUrl}/images/logo.png`,
  email: BRAND.email,
  telephone: BRAND.phoneDisplay,
  address: { "@type": "PostalAddress", streetAddress: "123 Example Street", addressLocality: "Springfield", addressCountry: "Exampleland" },
  sameAs: [BRAND.social.instagram, BRAND.social.linkedin, BRAND.social.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <LanguageProvider>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}

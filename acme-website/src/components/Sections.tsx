import Link from "next/link";
import { Icon } from "./Icon";
import type { Lang } from "@/content";
import { POSTS, CATEGORY_LABELS, formatDate, type Post } from "@/content/blog";

export function SectionHead({ eyebrow, title, text, center }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`section-head ${center ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle, image, children }: { eyebrow: string; title: string; subtitle?: string; image?: string; children?: React.ReactNode }) {
  return (
    <section className={`page-hero ${image ? "has-image" : ""}`}>
      {image && (
        <div className="hero-bg"><img src={image} alt="" /></div>
      )}
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="stars" role="img" aria-label={`Rated ${n} out of 5`}>
      {Array.from({ length: n }, (_, i) => <Icon key={i} name="star" size={16} />)}
    </span>
  );
}

export function CtaBand({ title, text, primary, secondary }: { title: string; text?: string; primary: { label: string; to: string }; secondary?: { label: string; to: string } }) {
  return (
    <section className="section--tight">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            {text && <p>{text}</p>}
          </div>
          <div className="cta-actions">
            <Link href={primary.to} className="btn btn-accent">{primary.label}</Link>
            {secondary && <Link href={secondary.to} className="btn btn-light">{secondary.label}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PostCard({ post, lang, readLabel, minLabel }: { post: Post; lang: Lang; readLabel: string; minLabel: string }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="post-card">
      <img src={post.image} alt="" loading="lazy" />
      <div className="post-card-body">
        <div className="post-meta">
          <span className="post-cat">{CATEGORY_LABELS[post.category][lang]}</span>
          <span>{formatDate(post.date, lang)}</span>
          <span>{post.readMin} {minLabel}</span>
        </div>
        <h3>{post.title[lang]}</h3>
        <p>{post.excerpt[lang]}</p>
        <span className="link-arrow" style={{ marginTop: "auto" }}>{readLabel} <Icon name="arrow" size={16} /></span>
      </div>
    </Link>
  );
}

export { POSTS };

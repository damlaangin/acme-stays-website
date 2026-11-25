import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import { CATEGORY_LABELS, POSTS, formatDate, getPost } from "@/content/blog";
import { CtaBand, PageHero, PostCard } from "@/components/Sections";
import { Icon } from "@/components/Icon";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const lang = "en" as const;
  const { slug } = await params;
  const post = getPost(slug);
  if (!isLang(lang) || !post) return {};
  return { title: post.title[lang], description: post.excerpt[lang], openGraph: { images: [post.image] } };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const lang = "en" as const;
  const { slug } = await params;
  if (!isLang(lang)) notFound();
  const post = getPost(slug);
  if (!post) notFound();
  const c = copy[lang];
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={CATEGORY_LABELS[post.category][lang]} title={post.title[lang]} subtitle={`${c.blog.by} ${post.author} · ${formatDate(post.date, lang)} · ${post.readMin} ${c.common.minRead}`} />
      <div className="container">
        <div className="article-hero-img"><img src={post.image} alt="" /></div>
        <article className="article">
          {post.body[lang].reduce<React.ReactNode[]>((nodes, block, i, all) => {
            if (block.type === "h") nodes.push(<h2 key={i}>{block.text}</h2>);
            else if (block.type === "p") nodes.push(<p key={i}>{block.text}</p>);
            else if (all[i - 1]?.type !== "li") {
              const items: string[] = [];
              for (let j = i; all[j]?.type === "li"; j++) items.push(all[j].text);
              nodes.push(<ul key={i}>{items.map((t) => <li key={t}>{t}</li>)}</ul>);
            }
            return nodes;
          }, [])}
          <Link href={`/blogs`} className="link-arrow" style={{ marginTop: "2rem" }}><Icon name="back" size={16} /> {c.blog.back}</Link>
        </article>

        <section className="section">
          <h2>{c.blog.related}</h2>
          <div className="grid grid-3">
            {related.map((p) => <PostCard key={p.slug} post={p} lang={lang} readLabel={c.common.readMore} minLabel={c.common.minRead} />)}
          </div>
        </section>
      </div>
      <CtaBand title={c.home.final.title} primary={{ label: c.home.final.primary, to: `/stays` }} secondary={{ label: c.home.final.secondary, to: `/contact` }} />
    </>
  );
}

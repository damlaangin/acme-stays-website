import { SectionHead } from "./Sections";

export default function HqGallery({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="section section--surface">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} text={text} />
        <div className="hq-grid">
          <img className="hq-main" src="/images/hq/hq-1.jpg" alt="" loading="lazy" />
          <img src="/images/hq/hq-2.jpg" alt="" loading="lazy" />
          <img src="/images/hq/hq-3.jpg" alt="" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

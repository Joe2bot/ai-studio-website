import { content } from "../../data/content";
import { process } from "../../data/site";
import { Button } from "./Button";
export function ContactCTA() {
  return (
    <section className="cta">
      <div>
        <span className="eyebrow">{content.cta.eyebrow}</span>
        <h2>
          {content.cta.title[0]}
          <br className="mobile-only" />
          {content.cta.title[1]}
        </h2>
        <p>{content.cta.description}</p>
      </div>
      <Button to="/contact">{content.cta.button}</Button>
    </section>
  );
}
export function Process() {
  return (
    <div className="process-grid">
      {process.map((p, i) => (
        <article key={p.title}>
          <span className="step">
            0{i + 1}
            <span>↗</span>
          </span>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </article>
      ))}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

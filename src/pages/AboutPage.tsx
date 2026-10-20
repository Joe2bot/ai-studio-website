import { content } from "../data/content";
import { site, values } from "../data/site";
import { services } from "../data/services";
import { ContactCTA, PageIntro, Process } from "../components/ui/Shared";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Icon } from "../components/ui/Icon";
export function AboutPage() {
  return (
    <div className="container">
      <PageIntro
        {...content.about}
        description={`${site.name} ${content.about.description}`}
      />
      <section className="mission">
        <span className="eyebrow">OUR MISSION</span>
        <h2>
          技术的意义，
          <br />
          在于让<span className="cyan">人更有创造力。</span>
        </h2>
        <p>{content.about.mission}</p>
      </section>
      <section className="section">
        <SectionHeading eyebrow="OUR PRINCIPLES" title="我们相信的合作方式" />
        <div className="principle-grid">
          {values.map((v) => (
            <article key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <SectionHeading
          eyebrow="TECHNOLOGY DIRECTIONS"
          title="围绕应用，构建能力"
        />
        <div className="tags technology-tags">
          {services.map((s) => (
            <span key={s.id}>
              <Icon name={s.icon} size={20} />
              {s.title}
            </span>
          ))}
        </div>
        <p className="muted">{content.about.placeholder}</p>
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="HOW WE COLLABORATE"
          title="透明沟通，分步推进。"
        />
        <Process />
      </section>
      <ContactCTA />
    </div>
  );
}

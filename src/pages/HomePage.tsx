import { ServicesBallpit } from "../components/backgrounds/ServicesBallpit";
import { content } from "../data/content";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { CaseCard } from "../components/ui/CaseCard";
import { ContactCTA, Process } from "../components/ui/Shared";
import { Icon } from "../components/ui/Icon";
import { services } from "../data/services";
import { solutions } from "../data/solutions";
import { cases } from "../data/cases";
import { values } from "../data/site";
function Orbit() {
  return (
    <div className="orbit-scene" aria-hidden="true">
      <div className="orbit-grid" />
      <div className="orbit-halo" />
      <div className="orbit-system">
        <div className="orbit orbit-one">
          <div className="orbit-traveler">
            <i className="satellite" />
          </div>
        </div>
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three">
          <div className="orbit-traveler orbit-traveler-reverse">
            <i className="satellite satellite-b" />
          </div>
        </div>
        <div className="orbit orbit-four" />
        <div className="orb">
          <span>AI</span>
        </div>
      </div>
      <div className="orbit-label label-top">
        <span className="status-dot" /> HUMAN IDEAS × AI POSSIBILITIES
      </div>
      <div className="orbit-chip chip-one">
        <Icon name="database" size={18} />
        <span>
          企业知识库<small>KNOWLEDGE</small>
        </span>
      </div>
      <div className="orbit-chip chip-two">
        <Icon name="workflow" size={18} />
        <span>
          自动化工作流<small>AUTOMATION</small>
        </span>
      </div>
      <div className="orbit-chip chip-three">
        <Icon name="bot" size={18} />
        <span>
          智能业务助手<small>AI AGENTS</small>
        </span>
      </div>
      <div className="orbit-caption">
        <span>01 / CONNECTING POSSIBILITIES</span>
        <span>从技术，到业务价值 ↗</span>
      </div>
    </div>
  );
}
export function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="pill">
            <span className="status-dot" />
            {content.home.badge}
          </span>
          <h1>
            {content.home.title[0]}
            <br />
            {content.home.title[1]}
            <span className="gradient-text">{content.home.title[2]}</span>
            <span className="cyan">。</span>
          </h1>
          <p>
            {content.home.description[0]}
            <br />
            {content.home.description[1]}
            <br className="desktop-only" />
            {content.home.description[2]}
          </p>
          <div className="hero-actions">
            <Button to="/solutions">探索解决方案</Button>
            <Button to="/contact" secondary>
              免费咨询
            </Button>
          </div>
          <div className="hero-notes">
            {content.home.notes.map((n) => (
              <span key={n}>
                <Check size={14} />
                {n}
              </span>
            ))}
          </div>
        </div>
        <Orbit />
      </section>
      <div className="capability-strip">
        <div className="container">
          <span>
            从想法到落地<span className="strip-slash"> / </span>
          </span>
          {content.home.capabilities.map((s) => (
            <span key={s}>
              {s}
              <span className="strip-star">✳</span>
            </span>
          ))}
        </div>
      </div>
      <section className="services-section">
        <ServicesBallpit />
        <div className="section container">
          <div className="section-top">
            <SectionHeading {...content.home.services} />
            <Link className="text-link" to="/services">
              探索全部服务
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <Link
                className={`service-card service-${i}`}
                to={`/services#${s.id}`}
                key={s.id}
              >
                <div className="flex items-center justify-between">
                  <span className="icon-box">
                    <Icon name={s.icon} />
                  </span>
                  <span className="card-number">0{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <span className="micro">{s.english}</span>
                <p>{s.intro}</p>
                <ArrowUpRight className="service-arrow" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="values-section">
        <div className="container values-grid">
          <div>
            <span className="eyebrow">LESS COMPLEXITY. MORE POSSIBILITY.</span>
            <h2>
              不止于技术演示，
              <br />
              更关心如何<span className="cyan">用起来。</span>
            </h2>
          </div>
          <div className="value-list">
            {values.map((v, i) => (
              <div key={v.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-top">
          <SectionHeading {...content.home.scenarios} />
          <Link to="/solutions" className="text-link">
            查看行业方案
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="industry-grid">
          {solutions.slice(0, 4).map((s) => (
            <Link
              to={`/cases?category=${s.category}`}
              className="industry-card"
              key={s.industry}
            >
              <Icon name={s.icon} size={27} />
              <span className="micro">{s.english}</span>
              <h3>{s.industry}</h3>
              <p>{s.solution}</p>
              <ArrowRight size={19} />
            </Link>
          ))}
        </div>
      </section>
      <section className="case-section">
        <div className="container section">
          <div className="section-top">
            <SectionHeading {...content.home.cases} />
            <Link className="text-link" to="/cases">
              浏览全部案例
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="case-grid">
            {cases.slice(0, 3).map((c) => (
              <CaseCard key={c.slug} item={c} />
            ))}
          </div>
          <p className="case-disclaimer">
            <Sparkles size={14} />
            {content.home.disclaimer}
          </p>
        </div>
      </section>
      <section className="section container">
        <SectionHeading {...content.home.process} />
        <Process />
      </section>
      <div className="container">
        <ContactCTA />
      </div>
    </>
  );
}

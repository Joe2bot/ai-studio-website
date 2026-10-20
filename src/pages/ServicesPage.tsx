import { content } from "../data/content";
import { services } from "../data/services";
import { ContactCTA, PageIntro } from "../components/ui/Shared";
import { Icon } from "../components/ui/Icon";
import { Button } from "../components/ui/Button";
export function ServicesPage() {
  return (
    <div className="container">
      <PageIntro {...content.services} />
      <div className="service-details">
        {services.map((s, i) => (
          <article id={s.id} key={s.id}>
            <div className="service-detail-title">
              <span className="eyebrow">
                0{i + 1} / {s.english}
              </span>
              <span className="icon-box">
                <Icon name={s.icon} size={30} />
              </span>
              <h2>{s.title}</h2>
              <p>{s.intro}</p>
              <Button to="/contact" secondary>
                咨询这项服务
              </Button>
            </div>
            <div className="service-detail-content">
              <div>
                <h3>适用客户</h3>
                <p>{s.audience}</p>
              </div>
              <div>
                <h3>可交付内容</h3>
                <ul className="plain-list">
                  {s.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>典型应用</h3>
                <p>{s.application}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <ContactCTA />
    </div>
  );
}

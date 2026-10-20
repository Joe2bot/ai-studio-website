import { content } from "../data/content";
import { solutions } from "../data/solutions";
import { ContactCTA, PageIntro } from "../components/ui/Shared";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
export function SolutionsPage() {
  return (
    <div className="container">
      <PageIntro {...content.solutions} />
      <div className="solution-grid">
        {solutions.map((s) => (
          <article className="solution-card" key={s.industry}>
            <div className="flex items-center justify-between">
              <Icon name={s.icon} size={30} />
              <span className="eyebrow">{s.english}</span>
            </div>
            <h2>{s.industry}</h2>
            <dl>
              <dt>典型痛点</dt>
              <dd>{s.pain}</dd>
              <dt>AI 方案</dt>
              <dd>{s.solution}</dd>
              <dt>预期价值</dt>
              <dd>{s.value}</dd>
            </dl>
            <Button secondary to={`/cases?category=${s.category}`}>
              探索相关场景
            </Button>
          </article>
        ))}
      </div>
      <ContactCTA />
    </div>
  );
}

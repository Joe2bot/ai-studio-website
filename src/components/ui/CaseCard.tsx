import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories, demoNotice, type CaseStudy } from "../../data/cases";
export function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <article className="case-card">
      <Link
        to={`/cases/${item.slug}`}
        className="case-cover"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={item.cover} alt="" width="640" height="340" loading="lazy" />
        <span>场景演示</span>
      </Link>
      <div className="case-body">
        <div className="case-category">
          {categories.find((c) => c.id === item.category)?.label}
          <span>{item.summary}</span>
        </div>
        <h3>
          <Link to={`/cases/${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="pain">{item.painPoints[0]}</p>
        <p>{item.solution}</p>
        <div className="tags">
          {item.techTags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="case-bottom">
          <small>{demoNotice}</small>
          <Link
            to={`/cases/${item.slug}`}
            aria-label={`查看详情：${item.title}`}
          >
            <span>查看详情</span>
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}

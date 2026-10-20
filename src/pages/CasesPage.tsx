import { content } from "../data/content";
import { useSearchParams } from "react-router-dom";
import { ArrowDown, Layers3 } from "lucide-react";
import { cases, categories, demoNotice } from "../data/cases";
import { CaseCard } from "../components/ui/CaseCard";
import { ContactCTA, PageIntro } from "../components/ui/Shared";
export function CasesPage() {
  const [params, setParams] = useSearchParams();
  const selected = params.get("category") ?? "all";
  const items =
    selected === "all" ? cases : cases.filter((c) => c.category === selected);
  return (
    <div className="container">
      <div className="cases-intro-wrap">
        <PageIntro {...content.cases} />
        <div className="case-intro-mark" aria-hidden="true">
          <Layers3 size={66} strokeWidth={0.7} />
          <span>
            EXPLORE
            <br />
            THE POSSIBILITIES
          </span>
          <ArrowDown size={18} />
        </div>
      </div>
      <div className="notice">
        <span className="status-dot" />
        <span>
          {demoNotice}。{content.cases.notice}
        </span>
      </div>
      <div className="filter-bar">
        <div className="filters" role="group" aria-label="按行业筛选案例">
          {categories.map((c) => (
            <button
              key={c.id}
              aria-pressed={selected === c.id}
              className={selected === c.id ? "selected" : ""}
              onClick={() =>
                setParams(c.id === "all" ? {} : { category: c.id }, {
                  preventScrollReset: true,
                })
              }
            >
              {c.label}
              {c.id === "all" && <small>06</small>}
            </button>
          ))}
        </div>
        <span className="result-count" aria-live="polite">
          {String(items.length).padStart(2, "0")} 个场景
        </span>
      </div>
      {items.length ? (
        <div className="case-grid case-list">
          {items.map((c) => (
            <CaseCard key={c.slug} item={c} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Layers3 size={40} />
          <h2>这个分类的场景还在探索中</h2>
          <p>先看看其他行业，或和我们聊聊你的需求。</p>
          <button className="button" onClick={() => setParams({})}>
            查看全部案例
          </button>
        </div>
      )}
      <ContactCTA />
    </div>
  );
}

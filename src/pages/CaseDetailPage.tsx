import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { cases, categories, demoNotice } from "../data/cases";
import { ContactCTA } from "../components/ui/Shared";
import { NotFoundPage } from "./NotFoundPage";
export function CaseDetailPage() {
  const { slug } = useParams();
  const item = cases.find((c) => c.slug === slug);
  if (!item) return <NotFoundPage />;
  return (
    <div className="container detail-page">
      <nav className="breadcrumbs" aria-label="面包屑">
        <Link to="/">首页</Link>
        <ChevronRight size={14} />
        <Link to="/cases">案例展示</Link>
        <ChevronRight size={14} />
        <span aria-current="page">{item.summary}</span>
      </nav>
      <div className="detail-header">
        <span className="eyebrow">
          {categories.find((c) => c.id === item.category)?.label} / SCENARIO
          DEMO
        </span>
        <h1>{item.title}</h1>
        <p>{item.summary}</p>
        <span className="demo-badge">{demoNotice}</span>
      </div>
      <img
        className="detail-cover"
        src={item.cover}
        alt={`${item.summary}概念线框图`}
        width="640"
        height="340"
        fetchPriority="high"
      />
      <div className="detail-layout">
        <div>
          <section>
            <span className="eyebrow">01 / CONTEXT</span>
            <h2>业务背景与核心痛点</h2>
            <p>
              这是围绕「{item.summary}」设计的假设业务场景，用于探索 AI
              的适用方式与交付边界。
            </p>
            <ul className="plain-list">
              {item.painPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
          <section>
            <span className="eyebrow">02 / APPROACH</span>
            <h2>方案概述</h2>
            <p>{item.solution}</p>
          </section>
          <section>
            <span className="eyebrow">03 / WORKFLOW</span>
            <h2>从输入到应用的工作流程</h2>
            <ol className="workflow-list">
              {item.workflow.map((w, i) => (
                <li key={w}>
                  <span>0{i + 1}</span>
                  {w}
                </li>
              ))}
            </ol>
          </section>
          <section>
            <span className="eyebrow">04 / EXPECTED VALUE</span>
            <h2>预期价值</h2>
            <ul className="benefit-list">
              {item.benefits.map((b) => (
                <li key={b}>
                  <Check size={17} />
                  {b}
                </li>
              ))}
            </ul>
            <p className="muted">
              以上为定性预期，不构成效果承诺。实际价值需在明确的数据、权限与验收范围内验证。
            </p>
          </section>
        </div>
        <aside className="detail-aside">
          <span className="eyebrow">PROJECT NOTES</span>
          <h2>方案组件</h2>
          <div className="tags">
            {item.techTags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <hr />
          <h3>演示说明</h3>
          <p>
            本页不包含真实客户数据，也不连接在线 AI
            服务。流程与技术标签仅用于解释方案构想。
          </p>
          <Link className="text-link" to={`/cases?category=${item.category}`}>
            <ArrowLeft size={16} />
            返回行业案例
          </Link>
        </aside>
      </div>
      <Link className="text-link" to="/cases">
        <ArrowLeft size={16} />
        返回案例列表
      </Link>
      <ContactCTA />
    </div>
  );
}

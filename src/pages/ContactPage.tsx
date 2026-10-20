import { content } from "../data/content";
import { useState } from "react";
import { Copy, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { site } from "../data/site";
import { PageIntro } from "../components/ui/Shared";
export function ContactPage() {
  const [status, setStatus] = useState("");
  async function copy(value: string, label: string, placeholder: boolean) {
    try {
      await navigator.clipboard.writeText(value);
      setStatus(`${label}已复制。${placeholder ? "当前为占位信息。" : ""}`);
    } catch {
      setStatus(`无法自动复制，请手动选择并复制${label}：${value}`);
    }
  }
  return (
    <div className="container contact-page">
      <PageIntro {...content.contact} />
      {site.wechatPlaceholder && (
        <div className="notice">
          <span className="status-dot" />
          {content.contact.notice}
        </div>
      )}
      <div className="contact-grid">
        {[
          {
            label: "电子邮箱",
            value: site.email,
            icon: Mail,
            placeholder: site.emailPlaceholder,
          },
          {
            label: "微信咨询",
            value: site.wechat,
            icon: MessageCircle,
            placeholder: site.wechatPlaceholder,
          },
        ].map((c) => (
          <article className="contact-card" key={c.label}>
            <c.icon size={28} strokeWidth={1.5} />
            <span className="eyebrow">{c.label}</span>
            <h2>{c.value}</h2>
            <p>
              {c.placeholder
                ? "占位联系方式 · 正式上线前替换"
                : "欢迎联系，探讨你的业务需求"}
            </p>
            <div className="flex flex-wrap gap-5">
              <button
                className="text-link"
                onClick={() => copy(c.value, c.label, c.placeholder)}
              >
                <Copy size={16} />
                复制{c.label}
              </button>
              {c.label === "电子邮箱" && (
                <a className="text-link" href={`mailto:${site.email}`}>
                  打开邮件客户端
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="copy-status" role="status" aria-live="polite">
        {status}
      </p>
      <section className="consultation-guide">
        <div>
          <span className="eyebrow">BEFORE WE TALK</span>
          <h2>
            一次有效的沟通，
            <br />
            可以从这些信息开始。
          </h2>
        </div>
        <ol>
          {content.contact.questions.map((q, i) => (
            <li key={q}>
              <span>0{i + 1}</span>
              {q}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Brand } from "./Header";
import { site } from "../../data/site";
export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <div>
          <Brand />
          <p>{site.tagline}</p>
          <span className="eyebrow">HUMAN IDEAS. AI POSSIBILITIES.</span>
        </div>
        <nav aria-label="页脚导航">
          {site.nav.slice(1).map((n) => (
            <Link key={n.path} to={n.path}>
              {n.label}
            </Link>
          ))}
          <Link to="/contact">联系我们</Link>
        </nav>
        <div className="footer-contact">
          <span>让想法开始发生</span>
          <a href={`mailto:${site.email}`}>{site.email} ↗</a>
          {site.emailPlaceholder && <small>邮箱为占位信息，待正式更新</small>}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>所有案例均为原创场景演示{site.icp && ` · ${site.icp}`}</span>
        <a
          href="#main"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("main")?.focus();
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          回到内容顶部 ↑
        </a>
      </div>
    </footer>
  );
}

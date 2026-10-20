import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { site } from "../data/site";
import { cases } from "../data/cases";
const titles: Record<string, string> = {
  "/": "让 AI 真正走进你的业务",
  "/services": "AI 服务",
  "/solutions": "行业解决方案",
  "/cases": "案例展示",
  "/about": "关于我们",
  "/contact": "联系我们",
};
export function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const item = cases.find((c) => pathname === `/cases/${c.slug}`);
    document.title = `${item?.title ?? titles[pathname] ?? "页面未找到"} | ${site.name}`;
    const description = item?.solution ?? site.seo.description;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    if (hash) {
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main")?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);
  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
          document.getElementById("main")?.scrollIntoView();
        }}
      >
        跳至主要内容
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

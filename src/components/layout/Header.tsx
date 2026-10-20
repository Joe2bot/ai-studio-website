import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "../../data/site";
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label={`${site.name} 首页`}>
      <img src={site.logo} width="34" height="34" alt="" />
      {site.name}
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = drawer.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = [
          toggle.current,
          ...Array.from(
            drawer.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const index = nodes.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && index === 0) {
          e.preventDefault();
          nodes.at(-1)?.focus();
        } else if (!e.shiftKey && index === nodes.length - 1) {
          e.preventDefault();
          nodes[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia(
      "(min-width: 1024px), (min-width: 768px) and (pointer: fine)",
    );
    const resize = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="主导航">
          {site.nav.map((n) => (
            <NavLink key={n.path} to={n.path} end={n.path === "/"}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <Link className="header-cta" to="/contact">
          聊聊你的项目
          <ArrowUpRight size={16} />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <>
          <div
            className="menu-backdrop"
            onClick={() => {
              setOpen(false);
              toggle.current?.focus();
            }}
          />
          <nav
            ref={drawer}
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="移动导航"
          >
            {[...site.nav, { path: "/contact", label: "免费咨询" }].map((n) => (
              <NavLink
                key={n.path}
                to={n.path}
                end={n.path === "/"}
                onClick={() => {
                  setOpen(false);
                  toggle.current?.focus();
                }}
              >
                {n.label}
                <ArrowUpRight size={18} />
              </NavLink>
            ))}
            <p>LET’S MAKE AI WORK.</p>
          </nav>
        </>
      )}
    </header>
  );
}

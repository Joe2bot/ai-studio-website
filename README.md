# AI 落地陪跑 — 纯静态 AI 企业官网

依据 `TDD_AI_Company_Static_Website.md` 实现。React + TypeScript + Vite、Tailwind CSS v4 官方 Vite 插件、React Router、Lucide React。无后端、数据库、登录、CMS、真实表单提交或 AI API。页面内容、演示数据与原创 SVG 图形随静态文件一起交付，不依赖远程字体或图片。

## 本地运行

推荐 Node.js 22.12+（或满足 Vite 要求的更新版本）。

```sh
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` 先执行 TypeScript 检查，再输出 `dist/`。开发服务与预览服务只用于本地开发，不是产品后端。

## 页面与内容

- `/` 首页：价值主张、五类服务、四类行业场景、三个精选演示、合作流程与咨询入口。
- `/services` 服务详情；`/solutions` 行业方案；`/about` 品牌理念；`/contact` 静态联系信息与复制。
- `/cases` 六个原创演示，支持即时分类筛选和查询参数保留；`/cases/:slug` 独立详情。
- 未知路由和无效案例 slug 展示 404 页面。

编辑位置：

- `src/data/content.ts`：页面介绍、首页主要文案、联系引导与 CTA。
- `src/data/site.ts`：品牌、联系方式、导航、SEO 默认值、合作流程与理念。
- `src/data/cases.ts`：案例类型、分类、六条案例全部业务内容。
- `src/data/services.ts`：服务、适用客户、交付内容与应用。
- `src/data/solutions.ts`：行业痛点、方案与定性预期价值。
- `src/styles/index.css`：设计 token、响应式样式、克制动画与 reduced-motion 支持。
- `public/images/`：原创、本地、轻量 SVG 案例封面；`public/favicon.svg`：品牌图标。
- `src/pages/`：各页面布局；`src/components/`：共享卡片、导航、按钮与页脚。

所有案例均为“场景演示 / 非真实客户案例”，不包含客户 Logo、客户数据、伪造履历或未经验证的效果数字。服务描述表达可探讨的交付范围，不代表本站具有在线 AI 功能。

## 静态部署

上传 `dist/` 到静态托管平台即可。项目当前按域名根路径部署。使用 BrowserRouter，**必须配置 SPA fallback**，否则刷新 `/cases/team-knowledge` 等深层路由会返回托管服务器的 404。

Netlify / 支持 `_redirects` 的平台已提供 `public/_redirects`：

```text
/* /index.html 200
```

Vercel 可使用仓库 `vercel.json`。Nginx 示例：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

其他平台请配置相同规则；这只是静态文件回退，无需应用后端。子路径部署需同时设置 Vite `base` 和路由 `basename`。

## SEO 与上线前替换

每页有唯一 H1、语义化结构，路由变化时更新标题、description 和基础 Open Graph。**这是客户端渲染 SPA，没有 SSR 或预渲染**：不执行 JavaScript 的爬虫和社交分享机器人通常只能读取 `index.html` 默认元信息，不能保证获取案例专属摘要。若需要逐页搜索收录或分享卡片，请后续增加构建期预渲染。

正式发布前，请在 `site.ts` 替换中性品牌、联系邮箱 `1159760358@qq.com`、联系微信 `wishyourich99`，通过 `emailPlaceholder` 和 `wechatPlaceholder` 分别控制占位提示（邮箱和微信均已启用）。确认图标、`index.html` 默认 SEO 信息与正式品牌一致。`icp` 默认为空，不展示虚假备案号；获得实际备案后再填写。

## 浏览器验收

```sh
npx playwright install chromium
npm test
```

测试覆盖：全部公开路由与六个详情、无效路由、标题与描述、图片加载、JS 运行错误、行业筛选与空态、详情导航、375/768/1440px 横向溢出、移动菜单键盘循环及 Escape、联系复制成功与失败、路由滚动重置与服务锚点。

无障碍支持包括跳过导航、明确焦点态、当前路由标识、筛选 `aria-pressed`、复制状态播报、移动菜单焦点循环，以及减少动态效果偏好。未声称通过完整 WCAG 第三方认证。

## 手机 H5 适配

全站共用一套 URL，自动适配手机，无需单独的移动站。已优化 320–430px 手机布局、正文可读性、44px 主要触控区域、刘海屏安全区、单列案例与详情、自动缩放的星球动画。触屏设备在宽度小于 1024px 时使用抽屉导航，横屏时菜单可独立滚动；点击当前页面菜单项也会关闭抽屉。

浏览器模拟测试覆盖 320/360/375/390/430/768/1440px 和 844×390 触屏横屏；8 项测试通过。测试基于 Chromium 模拟，不等同于 iPhone、安卓或微信内置浏览器实机验收。手机预览截图位于 `artifacts/h5-*.png`。

## GitHub Pages 部署

已提供 `.github/workflows/deploy-pages.yml`。仓库的 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**，代码推送到 `main` 后自动构建发布；也可在 Actions 手动运行。仓库和 Pages 需先启用，工作流不负责创建仓库。

工作流根据 Pages 配置自动读取根路径或仓库子路径，无需硬编码仓库名。使用 Node.js 22、`npm ci` 和 `npm run build:pages`，仅将 `dist/` 上传为站点产物。

GitHub Pages 构建使用 Hash Router：示例地址为 `https://用户名.github.io/仓库名/#/cases/team-knowledge`，刷新和直接访问详情不需要服务器重写。普通 `npm run build` 继续使用 Browser Router，用于支持 SPA fallback 的其他托管平台。图片与 Logo 自动遵循构建 base 路径。Hash 路由不改善此前说明的客户端 SEO 局限。

本地模拟仓库子路径构建：

```sh
PAGES_BASE_PATH=/ai-studio/ npm run build:pages
npm run preview -- --base /ai-studio/
```

访问预览服务的 `/ai-studio/`。恢复常规构建运行 `npm run build`。

工作流依据 [Vite GitHub Pages 部署说明](https://vite.dev/guide/static-deploy.html#github-pages) 和 [GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 配置。

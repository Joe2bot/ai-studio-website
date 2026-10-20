# TDD — AI 企业落地服务静态官网

版本：v1.0  
状态：可交付 Codex 实施  
参考：https://9shengai.com/cases/index.html

## 1. 项目目标
开发一个专业、现代、响应式的 AI 科技公司展示官网，主要面向中小微企业、个体经营者和创业者。参考九昇智能官网的行业案例展示逻辑与科技感，但不得直接复制其品牌、源代码、文案、图片或客户数据。

**V1 严格限制为纯静态前端：** 无后端、数据库、身份认证、CMS、支付、在线聊天、真实表单提交或第三方 AI API。所有展示内容来自本地 TypeScript 数据文件。网站可以构建为静态文件并部署到任意静态托管服务。

## 2. 技术栈
- React + TypeScript + Vite
- Tailwind CSS（使用与当前版本匹配的官方集成方式）
- React Router（客户端路由）
- Lucide React（图标）
- 可选：Framer Motion / Motion（仅用于轻量动画；注意包名和版本兼容）
- 不引入 Node 服务端框架、数据库或后端 SDK。

## 3. 设计原则
- 风格：国际化 AI 科技公司；深色海军蓝/黑色背景，青蓝渐变强调色，简洁高级。
- 桌面优先设计，同时完整适配手机和平板。
- 强调可读性、留白、清晰的 CTA、真实业务场景。
- 动画克制，遵守 prefers-reduced-motion。
- 网站暂用中性品牌占位符 `AI Studio`，公司名称、Logo、联系方式集中配置，方便以后替换。
- 禁止使用参考站的商标、Logo、原图和未经授权的客户案例。

## 4. 信息架构与路由
| 路由 | 页面 | 主要模块 |
|---|---|---|
| `/` | 首页 | Hero、价值主张、核心服务、场景展示、合作流程、CTA |
| `/services` | AI 服务 | AI 智能体、工作流自动化、知识库/RAG、AI 营销、定制开发 |
| `/solutions` | 行业解决方案 | 电商、零售、餐饮、本地服务、专业服务等场景 |
| `/cases` | 客户案例 | 案例列表、行业筛选、案例卡片 |
| `/cases/:slug` | 案例详情 | 背景、痛点、解决方案、实施流程、效果说明 |
| `/about` | 关于我们 | 公司理念、技术能力、合作方式 |
| `/contact` | 联系我们 | 联系方式、咨询引导、可复制邮箱/微信占位信息 |
| `*` | 404 | 返回首页 |

## 5. 页面需求

### 5.1 全局布局
- 固定或粘性 Header：品牌、导航、咨询 CTA；移动端抽屉菜单。
- Footer：导航、联系方式、版权、备案信息占位符（仅在实际备案后展示真实备案号）。
- 页面切换后滚动位置重置。
- 清晰的键盘焦点态和无障碍导航。

### 5.2 首页
1. Hero：标题「让 AI 真正走进你的业务」，副标题说明帮助中小企业低成本落地 AI。
2. 双 CTA：「探索解决方案」跳转 `/solutions`；「免费咨询」跳转 `/contact`。
3. 服务卡片：智能体、自动化、企业知识库、营销内容、定制软件。
4. 行业场景：展示至少 4 个可落地场景。
5. 精选案例：展示 3 个示例项目，跳转案例详情。
6. 合作流程：需求沟通 → 场景诊断 → 方案设计 → 交付验证。
7. 底部咨询 CTA。

### 5.3 服务页
每项服务包含：标题、简介、适用客户、可交付内容、典型应用、跳转咨询按钮。不得承诺未验证的效果。

### 5.4 行业方案页
使用本地数组渲染行业卡片；每张卡片包含行业、典型痛点、AI 方案和预期价值（定性描述，不编造收益数字）。

### 5.5 案例列表页（重点）
- 页面标题、简介和行业筛选按钮（全部、电商零售、餐饮本地生活、企业办公、专业服务）。
- 卡片含封面、分类、案例标题、业务痛点、解决方案摘要、标签、查看详情。
- 至少 6 条原创**演示案例**，明确标记「场景演示 / 非真实客户案例」。
- 筛选即时生效，无需网络请求；筛选后空态友好。
- 不得伪造客户 Logo、合作关系、真实成果或使用参考网站的客户数据。

### 5.6 案例详情页
- 面包屑、标题、类别、封面。
- 业务背景、核心痛点、方案概述、工作流程、预期价值、技术组件。
- 上一页返回和底部咨询 CTA。
- 无效 slug 显示 404/未找到状态。

### 5.7 关于我们
展示品牌使命、服务理念、技术方向、合作流程。团队经历如未提供真实信息，使用通用占位文案，不捏造履历。

### 5.8 联系我们
只展示静态联系卡片：邮箱、微信、其他联系渠道（均在配置文件中提供占位值）。支持一键复制邮箱/微信；邮箱链接可使用 `mailto:`。不制作会让用户误以为已成功提交的假表单。

## 6. 静态数据模型
在 `src/data` 中维护所有内容；不要将案例内容硬编码在页面组件里。

```ts
export type CaseCategory =
  | 'ecommerce'
  | 'local-business'
  | 'office'
  | 'professional';

export interface CaseStudy {
  slug: string;
  title: string;
  category: CaseCategory;
  summary: string;
  painPoints: string[];
  solution: string;
  workflow: string[];
  benefits: string[];
  techTags: string[];
  cover: string;
  isDemo: true;
}
```

创建 `src/data/cases.ts`、`services.ts`、`solutions.ts`、`site.ts`。`site.ts` 统一维护品牌名、联系信息、导航和 SEO 默认值。

建议原创演示场景：AI 电商客服、门店预约与咨询助手、企业知识库问答、自动整理销售线索、短视频内容辅助、合同/文档信息提取。所有演示案例必须避免宣称已为真实客户交付。

## 7. 建议目录结构
```text
src/
  app/
    App.tsx
    router.tsx
  components/
    layout/Header.tsx
    layout/Footer.tsx
    ui/Button.tsx
    ui/SectionHeading.tsx
    ui/CaseCard.tsx
  pages/
    HomePage.tsx
    ServicesPage.tsx
    SolutionsPage.tsx
    CasesPage.tsx
    CaseDetailPage.tsx
    AboutPage.tsx
    ContactPage.tsx
    NotFoundPage.tsx
  data/
    cases.ts
    services.ts
    solutions.ts
    site.ts
  styles/
    index.css
  main.tsx
public/
  images/
```

## 8. 交互与响应式要求
- 导航在移动端可展开、关闭；点击链接后自动关闭。
- 案例分类筛选有效，并具有可见的选中状态。
- 案例卡片和按钮具备 hover/focus 状态。
- 移动端宽度 375px 不出现横向溢出。
- 断点建议：移动端 `<768px`、平板 `768–1023px`、桌面 `>=1024px`。
- 所有图片具有合适 alt 文本，图片懒加载；首屏主要图片可优先加载。

## 9. SEO、性能与可访问性
- 页面标题、meta description 随路由变化。
- 使用语义化 HTML、唯一 H1、正确标题层级。
- 为公开页面配置基础 Open Graph 元信息（可在静态部署时通过构建预渲染/生成 HTML 实现；V1 不强制）。
- 案例详情的动态 meta 若仅在客户端更新，需在 README 中说明对爬虫支持的局限；不宣称已实现 SSR。
- 禁止无意义的大型依赖；压缩静态图片。
- 交互元素可键盘操作，色彩对比符合 WCAG AA 的常见要求。

## 10. 质量验收
- `npm install`、`npm run dev`、`npm run build` 均可正常运行。
- 所有路由可通过站内导航访问，刷新深层路由需静态托管平台配置 SPA fallback（在 README 说明）。
- 无 TypeScript 构建错误、明显控制台错误或失效图片。
- 案例筛选与详情 slug 匹配正确。
- 至少 6 条原创演示案例，均有明确演示标识。
- PC、平板、手机布局正常；375px 下无横向滚动。
- 不包含后端、数据库、网络提交接口、虚假客户评价和虚假效果数据。
- README 包含运行命令、构建方式、内容编辑位置、部署说明。

## 11. Codex 实施步骤
1. 检查当前仓库；若为空，初始化 Vite React TypeScript 项目。
2. 安装 Tailwind CSS、React Router、Lucide React 等必要依赖。
3. 建立设计 token（字体、颜色、间距、阴影、圆角）和全局布局。
4. 创建静态数据及类型定义。
5. 实现首页和案例列表页，先完成核心视觉。
6. 实现案例详情、服务、解决方案、关于、联系、404 页面。
7. 完成响应式、交互、SEO 基础和可访问性。
8. 运行构建与必要检查，修复错误。
9. 更新 README，输出完成项和剩余注意事项。

## 12. 给 Codex 的执行指令
> 请严格按照本 TDD 实现一个可上线的纯静态 AI 企业落地服务官网。参考 https://9shengai.com/cases/index.html 的信息架构、卡片展示与科技感，但必须原创设计与文案，不得复制对方品牌、图片、客户案例或源码。使用 React + TypeScript + Vite + Tailwind CSS；数据保存在本地 TypeScript 文件中。优先完成首页与案例页，再补齐其他页面。不要实现后端、数据库、登录、CMS、真实表单提交或第三方 AI API。执行必要的构建检查，最后汇报完成内容、测试结果与部署说明。

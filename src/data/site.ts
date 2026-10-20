export const site = {
  name: "AI Studio",
  logo: `${import.meta.env.BASE_URL}favicon.svg`,
  tagline: "把 AI 的可能，变成业务的日常。",
  email: "hello@example.com",
  wechat: "AI_Studio_Demo",
  contactPlaceholder: true,
  icp: "",
  seo: {
    title: "AI Studio · 让 AI 真正走进你的业务",
    description:
      "面向中小企业、个体经营者与创业者的 AI 落地服务。探索智能体、工作流自动化、企业知识库与原创场景演示。",
  },
  nav: [
    { path: "/", label: "首页" },
    { path: "/services", label: "AI 服务" },
    { path: "/solutions", label: "行业方案" },
    { path: "/cases", label: "案例展示" },
    { path: "/about", label: "关于我们" },
  ],
};
export const process = [
  { title: "需求沟通", description: "聊清业务目标，找到值得解决的问题。" },
  { title: "场景诊断", description: "梳理数据与流程，评估 AI 的适用边界。" },
  { title: "方案设计", description: "从小范围原型开始，明确交付与验收标准。" },
  { title: "交付验证", description: "在实际场景中验证，培训交接并持续改进。" },
];
export const values = [
  {
    title: "业务先行",
    description: "先理解问题，再选择技术。让每一个方案都有清晰的使用场景。",
  },
  {
    title: "小步验证",
    description: "从可管理的范围开始，用原型验证可行性，再决定下一步投入。",
  },
  {
    title: "人机协作",
    description: "为关键环节保留人工审核，让团队理解、掌控并使用 AI。",
  },
];

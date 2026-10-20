export type CaseCategory =
  "ecommerce" | "local-business" | "office" | "professional";
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
export const categories: { id: "all" | CaseCategory; label: string }[] = [
  { id: "all", label: "全部案例" },
  { id: "ecommerce", label: "电商零售" },
  { id: "local-business", label: "餐饮本地生活" },
  { id: "office", label: "企业办公" },
  { id: "professional", label: "专业服务" },
];
export const demoNotice = "场景演示 / 非真实客户案例";
export const cases: CaseStudy[] = [
  {
    slug: "commerce-assistant",
    title: "懂商品，也懂顾客的问题",
    category: "ecommerce",
    summary: "AI 电商客服助手",
    painPoints: [
      "商品规格与售后规则分散，客服需要反复查找。",
      "高频问题占用时间，复杂问题缺少清晰转接路径。",
    ],
    solution:
      "将商品资料与服务规则整理成知识库，生成附来源的回复建议；复杂咨询交由人工处理。",
    workflow: [
      "整理商品与售后资料",
      "识别问题并检索相关知识",
      "生成有依据的回复建议",
      "人工确认或转接处理",
    ],
    benefits: [
      "帮助统一产品信息口径",
      "减少重复查找工作",
      "保留人工决策与服务温度",
    ],
    techTags: ["AI 智能体", "RAG", "对话设计"],
    cover: `${import.meta.env.BASE_URL}images/commerce.svg`,
    isDemo: true,
  },
  {
    slug: "local-booking",
    title: "从第一句咨询，到一次到店",
    category: "local-business",
    summary: "门店预约与咨询助手",
    painPoints: [
      "门店规则与服务时段需要重复解释。",
      "预约意向散落在对话中，容易遗漏。",
    ],
    solution:
      "用结构化对话说明门店信息、收集预约意向，并交由工作人员确认；演示不连接真实预约系统。",
    workflow: [
      "整理门店服务信息",
      "回答常见到店问题",
      "生成预约意向清单",
      "工作人员核对并确认",
    ],
    benefits: [
      "让咨询信息更完整",
      "为人工确认提供清晰依据",
      "帮助顾客了解服务流程",
    ],
    techTags: ["对话流程", "信息整理", "人工确认"],
    cover: `${import.meta.env.BASE_URL}images/local.svg`,
    isDemo: true,
  },
  {
    slug: "team-knowledge",
    title: "让团队知识，随问随用",
    category: "office",
    summary: "企业知识库问答",
    painPoints: [
      "制度、手册与项目文档分散在不同位置。",
      "新员工难以判断资料是否适用或过期。",
    ],
    solution:
      "围绕已授权的内部文档设计检索问答，展示来源与版本；无可靠依据时明确提示并引导人工确认。",
    workflow: [
      "筛选并整理授权文档",
      "建立分类与版本规则",
      "检索相关片段并生成回答",
      "展示引用并收集修订意见",
    ],
    benefits: [
      "让资料更容易被找到",
      "帮助答案追溯到原文",
      "推动团队知识持续整理",
    ],
    techTags: ["企业知识库", "语义检索", "来源引用"],
    cover: `${import.meta.env.BASE_URL}images/knowledge.svg`,
    isDemo: true,
  },
  {
    slug: "sales-workflow",
    title: "把零散线索，整理成下一步",
    category: "office",
    summary: "销售线索整理工作流",
    painPoints: [
      "线索字段格式不统一，整理耗时。",
      "跟进备注分散，下一步行动不清晰。",
    ],
    solution:
      "对授权的示例线索进行字段规范化、重复项提示与跟进摘要生成，由业务人员确认后使用。",
    workflow: [
      "导入脱敏示例资料",
      "规范字段并提示重复项",
      "生成线索摘要与待办建议",
      "人工复核整理结果",
    ],
    benefits: ["让线索记录更有结构", "减少重复整理", "方便团队安排后续跟进"],
    techTags: ["工作流", "结构化提取", "人工复核"],
    cover: `${import.meta.env.BASE_URL}images/workflow.svg`,
    isDemo: true,
  },
  {
    slug: "content-copilot",
    title: "让好想法，更快成为初稿",
    category: "ecommerce",
    summary: "短视频内容创作辅助",
    painPoints: [
      "日常选题容易重复，素材利用不足。",
      "脚本风格不统一，需要多轮修改。",
    ],
    solution:
      "以品牌语气与授权素材为输入，辅助生成选题、分镜和脚本初稿，发布前由内容团队审核。",
    workflow: [
      "梳理品牌与受众",
      "整理素材并确定选题",
      "生成脚本与分镜建议",
      "人工审校事实与表达",
    ],
    benefits: [
      "为创作提供更多起点",
      "帮助保持品牌表达一致",
      "沉淀可复用的内容模板",
    ],
    techTags: ["内容工作流", "提示词模板", "品牌表达"],
    cover: `${import.meta.env.BASE_URL}images/content.svg`,
    isDemo: true,
  },
  {
    slug: "document-extraction",
    title: "让文档重点，清晰可见",
    category: "professional",
    summary: "合同与文档信息提取",
    painPoints: [
      "关键字段分散在长文档中。",
      "人工核对需要在摘要与原文间来回切换。",
    ],
    solution:
      "从脱敏示例文档提取日期、主体与关键条款，并附原文位置；输出仅作整理辅助，不替代法律或专业意见。",
    workflow: [
      "选择授权或脱敏文档",
      "识别结构并提取字段",
      "关联原文与待核实项",
      "交由专业人员审阅",
    ],
    benefits: ["帮助定位重要字段", "支持对照原文复核", "让审核材料更有条理"],
    techTags: ["文档解析", "结构化提取", "原文溯源"],
    cover: `${import.meta.env.BASE_URL}images/document.svg`,
    isDemo: true,
  },
];

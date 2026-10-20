import {
  Bot,
  Workflow,
  Database,
  Sparkles,
  Code2,
  ShoppingBag,
  Store,
  Building2,
  FileText,
} from "lucide-react";
const icons = {
  bot: Bot,
  workflow: Workflow,
  database: Database,
  sparkles: Sparkles,
  code: Code2,
  shopping: ShoppingBag,
  store: Store,
  building: Building2,
  file: FileText,
};
export function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const Component = icons[name as keyof typeof icons] ?? Sparkles;
  return <Component size={size} strokeWidth={1.5} aria-hidden="true" />;
}

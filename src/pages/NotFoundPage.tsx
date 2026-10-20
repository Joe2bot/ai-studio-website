import { content } from "../data/content";
import { Button } from "../components/ui/Button";
export function NotFoundPage() {
  return (
    <div className="container not-found">
      <span className="eyebrow">{content.notFound.eyebrow}</span>
      <h1>{content.notFound.title}</h1>
      <p>{content.notFound.description}</p>
      <div className="flex justify-center flex-wrap gap-4">
        <Button to="/">返回首页</Button>
        <Button secondary to="/cases">
          探索案例
        </Button>
      </div>
    </div>
  );
}

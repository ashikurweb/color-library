import { RuntimeBoundary } from "@/components/runtime-boundary";
import { NotFoundMarkup } from "@/components/not-found-markup";

export default function NotFound() {
  return (
    <RuntimeBoundary kind="not-found">
      <NotFoundMarkup />
    </RuntimeBoundary>
  );
}

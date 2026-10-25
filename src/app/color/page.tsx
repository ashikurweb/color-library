import { RuntimeBoundary } from "@/components/runtime-boundary";
import { ColorDetailMarkup } from "@/features/color-detail/components/color-detail-markup";

/** Hex-entry route and the shared, server-rendered template for the explorer's animated overlay. */
export default function ColorPage() {
  return (
    <RuntimeBoundary kind="color">
      <ColorDetailMarkup />
    </RuntimeBoundary>
  );
}

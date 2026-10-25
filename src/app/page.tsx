import { RuntimeBoundary } from "@/components/runtime-boundary";
import { ExplorerMarkup } from "@/features/explorer/components/explorer-markup";

export default function HomePage() {
  return (
    <RuntimeBoundary kind="explorer">
      <ExplorerMarkup />
    </RuntimeBoundary>
  );
}

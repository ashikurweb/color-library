import type { Metadata } from "next";
import { LegalMarkup } from "@/features/legal/components/legal-markup";
export const metadata: Metadata = { title: "Legal" };

export default function LegalPage() {
  return (
    <div data-page="legal">
      <LegalMarkup />
    </div>
  );
}

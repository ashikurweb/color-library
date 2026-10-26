import { SITE } from "@/lib/site";
import type { NamedColor } from "@/types/color";

/** Render with text APIs so a typed name cannot inject markup into the download. */
export async function downloadColorCard(color: NamedColor, identity: string, slug: string): Promise<void> {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1380;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not create the card.");
  context.fillStyle = color.hex;
  context.fillRect(0, 0, 1080, 1080);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 1080, 1080, 300);
  context.fillStyle = "#101010";
  context.font = "700 84px Inter, sans-serif";
  context.fillText(color.hex, 60, 1190);
  context.font = "400 40px Inter, sans-serif";
  context.fillText(color.name, 60, 1250, 960);
  context.fillStyle = "#5a5a5a";
  context.font = "400 26px Inter, sans-serif";
  context.fillText(identity ? `A color for ${identity}` : "Your color, your inspiration.", 60, 1300, 960);
  context.font = "400 20px Inter, sans-serif";
  context.fillText(`Colors by ${SITE.name}`, 60, 1345);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("The card could not be exported."))),
      "image/png",
    ),
  );
  const href = URL.createObjectURL(blob);
  const anchor = Object.assign(document.createElement("a"), { href, download: `${slug}-color-card.png` });
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(href), 1000);
}

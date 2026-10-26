import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const notices = await Promise.all([
    readFile(path.join(process.cwd(), "THIRD_PARTY_NOTICES.md"), "utf8"),
    readFile(path.join(process.cwd(), "licenses", "color-engine.MIT.txt"), "utf8"),
    readFile(path.join(process.cwd(), "public", "fonts", "OFL.txt"), "utf8"),
    readFile(path.join(process.cwd(), "licenses", "gsap.NOTICE.txt"), "utf8"),
  ]);
  return new Response(notices.join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}

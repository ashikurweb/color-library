/** MIT-licensed engine adaptation. Copyright and provenance: THIRD_PARTY_NOTICES.md. */
import { ADOPT_FROM } from "./adopter.js";

export const SHINES = ["prism", "galaxy", "classic", "radiant", "aurora", "nova", "gold", "glitter"];
export { ADOPT_FROM };
export const HOLO_FROM = 10;
export const FOUNDING = 50;
export function counts(adopted) {
  const kept = Object.entries(adopted).filter(([, entry]) => entry.amount >= ADOPT_FROM);
  const people = new Set(kept.map(([slug, entry]) => entry.on === "anonymous" ? `anonymous:${slug}` : `${entry.on}:${entry.by}`));
  return { colors: kept.length, patrons: people.size, founding: Math.max(0, FOUNDING - people.size) };
}
export const ADOPTIONS = "/data/adopted.json";
let adoptions;
export const loadAdoptions = () => adoptions ??= fetch(ADOPTIONS)
  .then((response) => {
    if (!response.ok) throw new Error("Unable to load supporters");
    return response.json();
  })
  .catch(() => { adoptions = null; return {}; });

/** MIT-licensed engine adaptation. Copyright and provenance: THIRD_PARTY_NOTICES.md. */
import { gsap } from "gsap";
// small numbers for the wall: easing, and three-vectors as plain arrays
export let reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
export function watchMotionPreference(signal) {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  reduceMotion = query.matches;
  query.addEventListener("change", () => { reduceMotion = query.matches; }, { signal });
}
export const ease = gsap.parseEase("power3.out");
export const easeInOut = gsap.parseEase("power2.inOut");
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
// an angle into -π…π
export const wrap = (a) => a - 2 * Math.PI * Math.round(a / (2 * Math.PI));

export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = (a) => scale(a, 1 / Math.hypot(...a));
export const lerp3 = (a, b, k) => add(a, scale(sub(b, a), k));

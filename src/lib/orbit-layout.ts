/**
 * A continuous, hue-ordered torus. Saturation fills its tube; lightness travels
 * around that tube. Achromatic colors follow a small inner spiral.
 * Coordinates are independent of list order, so filtering never reshuffles it.
 */
export function orbitPosition(hue: number, saturation: number, lightness: number): [number, number, number] {
  const tau = Math.PI * 2;
  const angle = ((saturation < 0.015 ? lightness * 360 : hue) / 360) * tau - 0.8;
  const twist = lightness * tau + saturation * 0.7;
  const tube = 9 + saturation * 27;
  const radius = 78 + 5 * Math.sin(angle * 3) + tube * Math.cos(twist);

  return [
    radius * Math.cos(angle),
    radius * Math.sin(angle),
    tube * Math.sin(twist) + 9 * Math.sin(angle * 2),
  ];
}

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { converter } from "culori";
import { orbitPosition } from "../../src/lib/orbit-layout.ts";

test("every catalog color fits the orbit without non-finite coordinates or a collapsed center", () => {
  const colors = JSON.parse(readFileSync(new URL("../../public/data/colors.json", import.meta.url), "utf8"));
  const hsl = converter("hsl");
  const locations = new Set();
  for (const { hex } of colors) {
    const { h = 0, s, l } = hsl(hex);
    const point = orbitPosition(h, s, l);
    assert.ok(point.every(Number.isFinite), hex);
    assert.ok(Math.hypot(point[0], point[1]) > 35, `Open center for ${hex}`);
    assert.ok(Math.hypot(...point) < 130, `Camera bounds for ${hex}`);
    locations.add(point.map((value) => value.toFixed(3)).join(","));
  }
  assert.ok(locations.size / colors.length > 0.99, "Distinct swatches stay individually selectable");
});

test("the hue seam closes and neighboring shades stay near each other", () => {
  const distance = (a, b) => Math.hypot(...a.map((value, i) => value - b[i]));
  assert.ok(distance(orbitPosition(0, 0.8, 0.5), orbitPosition(360, 0.8, 0.5)) < 1e-10);
  assert.ok(distance(orbitPosition(359.9, 0.8, 0.5), orbitPosition(0.1, 0.8, 0.5)) < 1);
  assert.ok(distance(orbitPosition(200, 0.6, 0.4), orbitPosition(200.2, 0.601, 0.401)) < 1);
});

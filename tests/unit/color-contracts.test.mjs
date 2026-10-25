import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { normalizeHex, createColorSlugs, serializeJson } from "../../src/lib/colors.ts";
import { cleanIdentity, validIdentity } from "../../src/lib/patrons.ts";

test("accepts common pasted hex formats without accepting malformed colors", () => {
  assert.equal(normalizeHex("  #F69  "), "#ff6699");
  assert.equal(normalizeHex("663399"), "#663399");
  for (const value of ["#1234", "red", "#fffffff", "#gggggg", "", null, 123])
    assert.equal(normalizeHex(value), null);
});

test("the complete catalog resolves to unique, stable, safe page URLs", () => {
  const colors = JSON.parse(readFileSync(new URL("../../public/data/colors.json", import.meta.url), "utf8"));
  const slugs = createColorSlugs(colors);
  assert.equal(colors.length, 31993);
  assert.equal(slugs.size, colors.length);
  assert.equal(new Set(slugs.values()).size, colors.length);
  assert.equal(slugs.get("Rebecca Purple"), "rebecca-purple");
  assert.equal(slugs.get("Squirrel"), "squirrel");
  assert.ok(colors.every((color) => /^#[0-9a-f]{6}$/.test(color.hex)));
  assert.ok([...slugs.values()].every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)));
});

test("a name cannot break out of an embedded JSON script", () => {
  const data = { name: '</script><script>alert("color")</script>', text: "before\u2028after" };
  const serialized = serializeJson(data);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), data);
});

test("adoption identity handles common profile URLs and invalid domains", () => {
  assert.equal(cleanIdentity("https://github.com/colorlover", "github"), "colorlover");
  assert.equal(cleanIdentity("@colorlover", "bluesky"), "colorlover.bsky.social");
  assert.equal(cleanIdentity("https://www.example.com/about", "website"), "example.com");
  assert.equal(validIdentity("not a domain", "website"), false);
  assert.equal(validIdentity("example.com", "website"), true);
  assert.equal(validIdentity("", "name"), false);
  assert.equal(validIdentity("", "anonymous"), true);
});

import { test, expect } from "./fixtures";

test("loads a named color directly with its formats, neighbors, and ramps", async ({ page }) => {
  await page.goto("/color/rebecca-purple/");
  await expect(page.locator("[data-name]")).toHaveText("Rebecca Purple");
  await expect(page.locator("[data-formats]")).toContainText("102 51 153");
  await expect(page.locator("[data-neighbors] .swatchcard")).toHaveCount(12);
  await expect(page.locator("[data-ramp] .swatchcard")).toHaveCount(11);
  await page.locator("[data-copy]").first().click();
  await expect(page.locator("[data-copy]").first()).toHaveText("Copied");
  await page.locator("[data-neighbors] .swatchcard").first().click();
  await expect(page).toHaveURL(/\/color\/purple-heart\//);
  await expect(page.locator("[data-name]")).toHaveText("Purple Heart");
});

test("serves artwork and opens an accessible picture dialog", async ({ page }) => {
  await page.goto("/color/rebecca-purple/");
  const tile = page.locator(".tile__open").first();
  await expect(tile).toBeAttached();
  await page.locator("[data-art-slide]").scrollIntoViewIfNeeded();
  // The gallery continuously drifts; click its button without waiting for an animation to end.
  await tile.evaluate((button: HTMLButtonElement) => button.click());
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("shows the real supporter snapshot and local color links", async ({ page }) => {
  await page.goto("/supporters/");
  await expect(page.getByRole("heading", { name: "Supporters.", exact: true })).toBeVisible();
  await expect(page.locator(".supporter")).toHaveCount(113);
  await expect(page.locator(".supporters__stats")).toContainText("136 colors");
  await page.locator("#color-rebecca-purple").click();
  await expect(page).toHaveURL(/\/color\/rebecca-purple\//);
});

test("validates adoption details and hands payment off to the original site", async ({ page }) => {
  await page.goto("/adopt/?name=Bright%20Red");
  const cta = page.locator(".adopt__cta");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Adopt Bright Red.");
  await expect(cta).toHaveAttribute("aria-disabled", "true");
  await page.getByPlaceholder("Your name").fill("A Color Lover");
  await expect(cta).toHaveAttribute("aria-disabled", "false");
  await expect(cta).toHaveAttribute("href", "https://names.color.pizza/adopt/?name=Bright%20Red");
  await page.getByRole("combobox").selectOption("website");
  await page.getByPlaceholder("example.com").fill("invalid");
  await expect(cta).toHaveAttribute("aria-disabled", "true");
  await page.getByRole("combobox").selectOption("anonymous");
  await expect(cta).toHaveAttribute("aria-disabled", "false");
});

test("recognizes an adopted color and lets the user pick another", async ({ page }) => {
  await page.goto("/adopt/?name=Rebecca%20Purple");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Rebecca Purple is adopted.");
  const picker = page.getByLabel("Pick a color to adopt");
  await expect(picker).toBeEnabled();
  await picker.fill("#ff000d");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Adopt Bright Red.");
});

test("offers local recovery for an unknown color without a runtime error", async ({ page }) => {
  const response = await page.goto("/color/this-name-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator(".not-found__hex")).toHaveText("#404404");
  await expect(page.locator("[data-wheel]")).toHaveClass(/is-in/);
});

test("returns typed color data and rejects unsupported media paths", async ({ request }) => {
  const response = await request.get("/api/colors/rebecca-purple/");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toMatchObject({
    name: "Rebecca Purple",
    hex: "#663399",
    slug: "rebecca-purple",
  });
  expect((await request.get("/api/colors/not-a-real-name/")).status()).toBe(404);
  expect((await request.get("/media/not-allowed/file.json")).status()).toBe(404);
});

test("resolves a hex URL to its canonical color page", async ({ page }) => {
  await page.goto("/color/663399/");
  await expect(page).toHaveURL(/\/color\/rebecca-purple\//);
  await expect(page.locator("[data-name]")).toHaveText("Rebecca Purple");
});

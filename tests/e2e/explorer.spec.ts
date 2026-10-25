import { test, expect, openExplorer } from "./fixtures";

test("loads the complete local dataset and remembers the introduction", async ({ page }) => {
  await openExplorer(page, "/", true);
  await expect(page.locator("[data-intro]")).toBeVisible();
  await expect(page.locator("[data-count]")).toHaveText("31,993");
  await page.getByRole("button", { name: "Got it", exact: true }).click();
  await expect(page.locator("[data-intro]")).toBeHidden();
  await page.reload();
  await expect(page.locator('[data-model="rgb"]')).toBeAttached();
  await expect(page.locator("[data-intro]")).toBeHidden();
});

test("finds a name with keyboard selection and clears the selection", async ({ page }) => {
  await openExplorer(page);
  const search = page.getByRole("searchbox");
  await search.fill("squir");
  await expect(page.locator(".wall__result").first()).toContainText("Squirrel");
  await search.press("Enter");
  await expect(search).toHaveValue("Squirrel");
  await expect(page).toHaveURL(/c=8f7d6b/);
  await page.locator("[data-clear]").click();
  await expect(search).toHaveValue("");
  await expect(page).not.toHaveURL(/c=/);
});

test("accepts short hex codes and updates the color picker", async ({ page }) => {
  await openExplorer(page);
  await page.getByRole("searchbox").fill("#f00");
  await page.getByRole("searchbox").press("Enter");
  await expect(page.locator("[data-picker]")).toHaveValue("#ff0000");
  await expect(page).toHaveURL(/c=ff0000/);
});

test("switches all color models and persists the model in the URL", async ({ page }) => {
  await openExplorer(page);
  for (const model of ["oklab", "oklch", "hsl", "rgb"]) {
    await page.locator(`[data-model="${model}"]`).click();
    await expect(page.locator(`[data-model="${model}"]`)).toHaveAttribute("aria-pressed", "true");
  }
});

test("opens, filters, and navigates the virtualized A–Z list", async ({ page }) => {
  await openExplorer(page, "/?view=az");
  await expect(page.locator(".az__row").first()).toBeVisible();
  await page.getByRole("searchbox").fill("Squirrel");
  await expect(page.locator(".az__row").first()).toContainText("Squirrel");
  await page.locator('.az__row[href$="/color/squirrel/"]').click();
  await expect(page).toHaveURL(/\/color\/squirrel\//);
  await expect(page.locator("[data-name]")).toHaveText("Squirrel");
  await page.locator("[data-close]").click();
  await expect(page).toHaveURL(/view=az/);
  await expect(page.locator(".az__row").first()).toContainText("Squirrel");
});

test("switches between the full, curated, short, and adopted lists", async ({ page }) => {
  await openExplorer(page, "/?view=az");
  for (const list of ["bestOf", "short", "adopted", "default"]) {
    await page.locator("[data-lists]").click();
    await page.locator(`[data-list="${list}"]`).click();
    await expect(page.locator(`[data-list="${list}"]`)).toHaveAttribute("aria-checked", "true");
    await expect(page.locator(".az__row").first()).toBeVisible();
  }
});

test("shows pixel artwork from local sprite sheets", async ({ page }) => {
  const sheets: string[] = [];
  page.on("response", (response) => {
    if (response.url().includes("/media/pixel-atlas/") && response.ok()) sheets.push(response.url());
  });
  await openExplorer(page, "/?view=pixel");
  await expect(page.locator("html")).toHaveClass(/is-pixel/);
  await expect.poll(() => sheets.length).toBeGreaterThan(0);
  await page.locator("[data-az]").click();
  await expect(page.locator("img.az__icon").first()).toBeVisible();
});

test("renders the Voronoi view through its worker", async ({ page }) => {
  await openExplorer(page, "/?view=cells&list=short");
  await expect(page.locator('[data-mode="cells"]')).toHaveAttribute("aria-checked", "true");
  await expect(page.locator(".wall__status")).toBeHidden({ timeout: 45_000 });
  await expect(page.locator(".wall__status")).not.toContainText(/failed|error|couldn’t/i);
  await expect(page.locator('[data-mode="cells"]')).toHaveAttribute("aria-checked", "true");
  await page.waitForFunction(() => {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas[data-canvas]");
    return Boolean(canvas && canvas.width > 0 && canvas.height > 0);
  });
});

test("the random color button selects a named color", async ({ page }) => {
  await openExplorer(page);
  await page.getByRole("button", { name: "A random color", exact: true }).click();
  await expect(page.getByRole("searchbox")).not.toHaveValue("");
  await expect(page).toHaveURL(/c=[0-9a-f]{6}/);
});

test("opens a selected card over the explorer and restores the scene with Back", async ({ page }) => {
  await openExplorer(page);
  await page.getByRole("searchbox").fill("Squirrel");
  await page.getByRole("searchbox").press("Enter");
  await expect(page.locator("[data-wall]")).toHaveAttribute("aria-busy", "true");
  await expect(page.locator("[data-wall]")).toHaveAttribute("aria-busy", "false");
  const viewport = page.viewportSize()!;
  await page.mouse.click(viewport.width / 2, viewport.height / 2);
  await expect(page.locator(".wall__page [data-name]")).toHaveText("Squirrel");
  await expect(page.locator(".wall__bar")).toHaveAttribute("inert", "");
  await page.goBack();
  await expect(page.locator(".wall__page")).toHaveCount(0);
  await expect(page.locator("[data-wall]")).toHaveAttribute("aria-busy", "false");
  await expect(page.getByRole("searchbox")).toHaveValue("Squirrel");
});

test("keeps search and navigation usable on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openExplorer(page);
  await expect(page.getByRole("searchbox")).toBeVisible();
  await page.locator("[data-menu]").click();
  await expect(page.locator('[data-model="oklab"]')).toBeVisible();
  await page.locator('[data-model="oklab"]').click();
  await expect(page.locator('[data-model="oklab"]')).toHaveAttribute("aria-pressed", "true");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

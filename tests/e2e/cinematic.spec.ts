import { test, expect, openExplorer } from "./fixtures";

test("home opens directly on the interactive color collection", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openExplorer(page);
  const wall = page.locator("[data-wall]");
  const colors = page.locator("canvas[data-canvas]");
  await expect(colors).toBeVisible();
  await expect(page.locator("[data-count]")).toHaveText("31,993");
  await expect(page.getByRole("button", { name: "Explore colors", exact: true })).toHaveCount(0);
  await expect(page.locator(".wall__dock")).toBeVisible();
  const orbit = await colors.screenshot();

  await page.locator('[data-model="rgb"]').click();
  await expect(page.locator('[data-model="rgb"]')).toHaveAttribute("aria-pressed", "true");
  await expect(wall).toHaveAttribute("aria-busy", "false");
  expect((await colors.screenshot()).equals(orbit), "RGB rearranges the actual color collection").toBe(false);

  await page.locator('[data-model="orbit"]').click();
  await expect(wall).not.toHaveClass(/is-engaged/);
  await expect(page.getByRole("heading", { name: "Color, in motion." })).toBeVisible();
});

test("dragging the colors opens the space and Home restores the hero", async ({ page }) => {
  await openExplorer(page);
  const wall = page.locator("[data-wall]");
  const { width, height } = page.viewportSize()!;
  await page.mouse.move(width * 0.72, height * 0.4);
  await page.mouse.down();
  await page.mouse.move(width * 0.8, height * 0.45, { steps: 12 });
  await page.mouse.up();
  await expect(wall).toHaveClass(/is-engaged/);
  await expect(wall).toHaveClass(/is-away/);
  await expect(page.locator("[data-studio-stage]")).toHaveAttribute("inert", "");

  await page.getByRole("button", { name: "Show the whole space" }).click();
  await expect(wall).toHaveAttribute("aria-busy", "false");
  await expect(wall).not.toHaveClass(/is-engaged/);
  await expect(page.locator("[data-studio-stage]")).not.toHaveAttribute("inert", "");
  await expect(page.getByRole("heading", { name: "Color, in motion." })).toBeVisible();
  await expect(wall).toHaveAttribute("data-rotation", "playing");
});

test("mobile color rotation pauses and search suggestions stay in view", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openExplorer(page);
  const wall = page.locator("[data-wall]");
  const clip = (await page.locator("[data-studio-stage]").boundingBox())!;
  const captureColors = () => page.screenshot({ clip });
  await expect(wall).toHaveAttribute("data-rotation", "playing");
  await page.getByRole("button", { name: "Pause color rotation" }).click();
  await expect(wall).toHaveAttribute("data-rotation", "paused");
  await expect(async () => {
    const still = await captureColors();
    await page.waitForTimeout(300);
    expect((await captureColors()).equals(still), "Pause freezes the rendered colors").toBe(true);
  }).toPass({ timeout: 10_000 });
  const paused = await captureColors();
  await page.getByRole("button", { name: "Resume color rotation" }).click();
  await expect
    .poll(async () => (await captureColors()).equals(paused), {
      message: "Resume restarts the color camera",
    })
    .toBe(false);

  const caption = (await page.locator(".studio__scene-caption").boundingBox())!;
  const search = (await page.locator("[data-find]").boundingBox())!;
  expect(caption.y + caption.height).toBeLessThan(search.y);
  expect(search.y + search.height).toBeLessThan(844);
  await page.getByRole("searchbox").fill("Squirrel");
  await expect(page.locator(".wall__result").first()).toBeVisible();
  const suggestions = (await page.locator(".wall__results").boundingBox())!;
  expect(suggestions.y).toBeGreaterThanOrEqual(0);
  expect(suggestions.y + suggestions.height).toBeLessThan(search.y);
  await page.getByRole("searchbox").press("Enter");
  await expect(page).toHaveURL(/c=8f7d6b/);
  await expect(wall).toHaveClass(/is-engaged/);
});

import { readFile } from "node:fs/promises";
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

test("starts with an honest supporter page and the owner's profile", async ({ page }) => {
  await page.goto("/supporters/");
  await expect(page.getByRole("heading", { name: "Supporters.", exact: true })).toBeVisible();
  await expect(page.locator(".supporter")).toHaveCount(0);
  await expect(page.locator(".supporters__empty")).toContainText("No public supporters have been added yet");
  await expect(page.getByRole("link", { name: "Follow on GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/ashikurweb",
  );
});

test("validates card details and downloads a local PNG without checkout", async ({ page }) => {
  await page.goto("/adopt/?name=Bright%20Red");
  const cta = page.getByRole("button", { name: "Download your card" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Make Bright Red yours.");
  await expect(cta).toHaveAttribute("aria-disabled", "true");
  await page.getByPlaceholder("Your name").fill("Ashikur Rahman");
  await expect(cta).toHaveAttribute("aria-disabled", "false");
  await page.getByRole("combobox").selectOption("website");
  await page.getByPlaceholder("example.com").fill("invalid");
  await expect(cta).toHaveAttribute("aria-disabled", "true");
  await page.getByRole("combobox").selectOption("anonymous");
  await expect(cta).toHaveAttribute("aria-disabled", "false");
  const [download] = await Promise.all([page.waitForEvent("download"), cta.click()]);
  expect(download.suggestedFilename()).toBe("bright-red-color-card.png");
  const png = await readFile((await download.path())!);
  expect(png.subarray(1, 4).toString()).toBe("PNG");
  expect(png.readUInt32BE(16)).toBe(1080);
  expect(png.readUInt32BE(20)).toBe(1380);
  await expect(page).toHaveURL(/\/adopt\//);
  await expect(page.getByRole("status")).toContainText("Your card is ready");
});

test("lets every color be used for a card and updates the preview with the picker", async ({ page }) => {
  await page.goto("/adopt/?name=Rebecca%20Purple");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Make Rebecca Purple yours.");
  const picker = page.getByLabel("Pick a color for your card");
  await expect(picker).toBeEnabled();
  await picker.fill("#ff000d");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Make Bright Red yours.");
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

test("uses the owner's branding and only local services throughout the app", async ({ page }) => {
  const external: string[] = [];
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (["http:", "https:"].includes(url.protocol) && !["localhost", "127.0.0.1"].includes(url.hostname)) {
      external.push(url.href);
      await route.abort();
    } else await route.continue();
  });
  for (const route of ["/", "/color/rebecca-purple/", "/adopt/", "/supporters/", "/legal/"]) {
    await page.goto(route);
    await expect(page.locator(".brand")).toContainText("Ashikur Rahman");
    await expect(page).toHaveTitle(/Ashikur Rahman/);
    await expect(page.locator("body")).not.toContainText(/Color Names|Elastiq|David Aerne/);
    const foreign = await page
      .locator("a[href]")
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href"))
          .filter((href) => /color\.pizza|meodai/i.test(href || "")),
      );
    expect(foreign).toEqual([]);
    if (route.startsWith("/color/")) {
      await expect(page.locator("[data-neighbors] .swatchcard")).toHaveCount(12);
      await expect(page.locator(".tile__open").first()).toBeAttached();
    }
  }
  expect(external).toEqual([]);
});

test("serves local media and preserves both the owner's and third-party licenses", async ({ request }) => {
  const [own, notices, art, pixel, invalid] = await Promise.all([
    request.get("/license/"),
    request.get("/licenses/"),
    request.get("/media/studies/663399/0.svg"),
    request.get("/media/pixel/rebecca-purple.webp"),
    request.get("/media/studies/663399/99.svg"),
  ]);
  expect(await own.text()).toContain("Copyright (c) 2026 Ashikur Rahman");
  expect(await notices.text()).toContain("Copyright (c) 2017 David Aerne");
  expect(art.headers()["content-type"]).toContain("image/svg+xml");
  expect(pixel.status()).toBe(200);
  expect(pixel.headers()["content-type"]).toContain("image/webp");
  expect(invalid.status()).toBe(404);
});

import { test as base, expect, type Page } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, runTest) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await runTest(page);
    expect(errors, "No uncaught errors in the browser").toEqual([]);
  },
});
export { expect };

export async function openExplorer(page: Page, route = "/", intro = false) {
  if (!intro) await page.addInitScript(() => localStorage.setItem("wall-intro-seen", "1"));
  await page.goto(route);
  await expect(page.locator('[data-model="rgb"]')).toBeAttached();
  await expect(page.locator("[data-wall]")).not.toHaveClass(/is-opening/);
  await expect(page.locator("[data-wall]")).toHaveAttribute("aria-busy", "false");
}

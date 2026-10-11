import { test, expect } from "@playwright/test";

for (const route of ["/rentenluecken-rechner", "/fruehstart-rente-rechner", "/riester-vergleich-rechner"]) {
  test(`${route}: numeric controls update the calculator without browser errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    const main = page.getByRole("main");
    const input = main.locator('input[type="number"]').first();
    const initial = await input.inputValue();
    await main.getByRole("button", { name: /verringern/ }).first().click();
    await expect(input).not.toHaveValue(initial);
    for (const width of [375, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test("Riester comparison retains child controls", async ({ page }) => {
  await page.goto("/riester-vergleich-rechner");
  const main = page.getByRole("main");
  await main.getByRole("button", { name: "Kind hinzufügen" }).click();
  await expect(main.getByRole("button", { name: "Kind entfernen", exact: true })).toHaveCount(2);
  await main.getByRole("button", { name: "bis 25", exact: true }).first().click();
  await expect(main.getByRole("button", { name: "bis 25", exact: true }).first()).toHaveAttribute("aria-pressed", "true");
  await main.getByRole("button", { name: "Kind entfernen", exact: true }).last().click();
  await expect(main.getByRole("button", { name: "Kind entfernen", exact: true })).toHaveCount(1);
});
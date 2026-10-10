import { test, expect } from "../playwright-fixture";

test.describe("Interactive landing examples", () => {
  test("switches personas, supports keyboard scrubbing and matches editorial topics", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const example = page.locator("#rechenbeispiel");
    await page.getByRole("button", { name: "Julia 28", exact: true }).click();
    await expect(page.getByRole("button", { name: "Julia 28", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(example.getByRole("img")).toHaveAccessibleName(/Julia/);
    const scrubber = page.getByRole("slider", { name: "Jahr der Kapitalentwicklung" });
    await scrubber.focus();
    await scrubber.press("Home");
    await expect(scrubber).toHaveValue("0");
    await expect(example).toContainText("0 € gesamt");
    await page.getByRole("textbox", { name: "Deine Frage zur Altersvorsorge" }).fill("Riester pausieren");
    await page.getByRole("button", { name: "Passende Themen finden" }).click();
    await expect(page.getByRole("link", { name: /01 Riester und Altersvorsorgedepot vergleichen/ })).toHaveAttribute("href", "/altersvorsorgedepot-vs-riester");
  });
});
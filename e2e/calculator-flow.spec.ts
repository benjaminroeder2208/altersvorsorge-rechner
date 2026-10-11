import { test, expect } from "@playwright/test";

test("calculator completes its flow and updates the result scenario", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const calculator = page.locator("#rechner");
  await calculator.getByRole("slider", { name: "Monatlicher Beitrag" }).fill("200");
  await calculator.getByRole("button", { name: "Weiter", exact: true }).click();
  await calculator.getByRole("button", { name: "37.000 – 57.000 €", exact: true }).click();
  await calculator.getByRole("button", { name: "Weiter", exact: true }).click();
  await calculator.getByRole("button", { name: "Kind hinzufügen" }).click();
  await calculator.getByRole("button", { name: "Geburtsjahr erhöhen", exact: true }).click();
  await calculator.getByRole("button", { name: "Ergebnis anzeigen" }).click();
  await expect(calculator.getByText("Simuliertes Kapital zum Rentenbeginn", { exact: true })).toBeVisible();
  const result = calculator.getByText("Simuliertes Kapital zum Rentenbeginn", { exact: true }).locator("..").locator("p").nth(1);
  const initialCapital = await result.textContent();
  await calculator.getByRole("button", { name: "5 %", exact: true }).click();
  await expect(calculator.getByRole("button", { name: "5 %", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(result).not.toHaveText(initialCapital ?? "");
  await expect(page.locator("#pdf-chart-capture svg").first()).toBeVisible();
  await calculator.getByRole("button", { name: "Angaben ändern" }).click();
  await expect(calculator.getByRole("button", { name: "Kind entfernen" })).toBeVisible();
});
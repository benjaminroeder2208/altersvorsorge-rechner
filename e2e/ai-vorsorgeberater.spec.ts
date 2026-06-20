// E2E: /ai-vorsorgeberater muss ohne "Failed to fetch" starten.
// Verifiziert, dass die initiale Edge-Function-Anfrage erfolgreich ist
// und der Assistent eine erste Antwort rendert.

import { test, expect } from "../playwright-fixture";

test.describe("AI-Vorsorgeberater Seite", () => {
  test("lädt und startet den Chat ohne Failed to fetch", async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("requestfailed", (req) => {
      failedRequests.push(`${req.method()} ${req.url()} — ${req.failure()?.errorText}`);
    });

    await page.goto("/ai-vorsorgeberater");

    // Header sichtbar = Seite gerendert
    await expect(page.getByText("Vorsorge-Assistent")).toBeVisible();

    // Auf erste Assistant-Antwort der Edge Function warten (max. 30s).
    // Die Fehler-Fallback-Bubble enthält "schiefgelaufen".
    await expect(async () => {
      const bubbles = page.locator("main .bg-muted");
      const count = await bubbles.count();
      expect(count).toBeGreaterThan(0);
    }).toPass({ timeout: 30_000 });

    // Keine Fehler-Bubble
    await expect(
      page.getByText(/schiefgelaufen|Failed to fetch/i),
    ).toHaveCount(0);

    // Keine Fetch-Fehler an die Edge Function
    const edgeFailures = failedRequests.filter((r) =>
      r.includes("/functions/v1/vorsorge-assistent"),
    );
    expect(edgeFailures, edgeFailures.join("\n")).toHaveLength(0);

    // Keine "Failed to fetch"-Logs aus dem Client
    const fetchErrors = consoleErrors.filter((e) =>
      /Failed to fetch|FunctionsFetchError/i.test(e),
    );
    expect(fetchErrors, fetchErrors.join("\n")).toHaveLength(0);
  });
});

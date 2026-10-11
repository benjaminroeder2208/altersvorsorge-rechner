import { test, expect } from "@playwright/test";

test("homepage question opens the existing assistant as an unsent draft", async ({ page }) => {
  const requests: string[] = [];
  await page.route("**/functions/v1/vorsorge-assistent", async (route) => {
    requests.push(route.request().postData() ?? "");
    await route.fulfill({ json: { reply: "Hallo! Wie darf ich dich nennen?", suggestions: ["Überspringen"] } });
  });
  await page.goto("/");
  const teaser = page.locator("#vorsorgeassistent");
  const question = "Was passiert mit meinem alten Riester-Vertrag?";
  await teaser.getByRole("button", { name: question, exact: true }).click();
  await expect(page).toHaveURL(/\/ai-vorsorgeassistent$/);
  await expect(page.getByRole("textbox")).toHaveValue(question);
  await expect(page.getByText("Hallo! Wie darf ich dich nennen?", { exact: true })).toBeVisible();
  expect(requests).toHaveLength(1);
  expect(requests[0]).not.toContain(question);
});
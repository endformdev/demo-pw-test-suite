import { expect, test } from "@playwright/test";
import { 
  runComplexTestScenario,
  simulateNetworkDelay,
  simulateHeavyComputation,
  performComplexDOMOperations,
  fillFormWithValidation,
  simulateApiRequests,
  performCanvasOperations,
  simulateLargeDataInteraction,
  loadHeavyResources
} from "./test-utils";

/**
 * Complex navigation test for authentication - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("navigation-authentication-test-15", async ({ page }) => {
  // Test scenario 15
  await runComplexTestScenario(page, 15);
  
  // Add complexity variations based on test number to ensure diversity
  const complexityFactor = 5;
  
  // Additional test-specific operations
  await test.step("Performing navigation-specific operations", async () => {
    await simulateNetworkDelay(page, 500 * complexityFactor, 1500 * complexityFactor);
    await simulateHeavyComputation(complexityFactor + 1);
    
    
    
    
    
    
    
    
    await page.goto("https://playwright.dev/docs/intro");
    await expect(page).toHaveTitle(/Introduction/);
    await page.getByRole("link", { name: "Writing tests" }).click();
    await expect(page.getByRole("heading", { name: "Writing tests" })).toBeVisible();
    
  });
  
  // Feature area specific tests
  await test.step("Testing authentication functionality", async () => {
    
    
    await page.goto("https://demo.playwright.dev/todomvc");
    await simulateApiRequests(page, complexityFactor);
    await loadHeavyResources(page, complexityFactor);
    
    
    
    
    
    
    
  });
  
  // Final assertions and validations
  await test.step("Verifying results", async () => {
    // Simulate final verifications
    await simulateNetworkDelay(page, 500, 1500);
    
    // Create a dynamic verification point
    await page.evaluate((testIndex) => {
      const resultElement = document.createElement('div');
      resultElement.id = 'test-result';
      resultElement.textContent = `Test ${testIndex} completed successfully`;
      document.body.appendChild(resultElement);
      return resultElement.id;
    }, 15);
    
    await expect(page.locator('#test-result')).toHaveText(`Test 15 completed successfully`);
  });
});

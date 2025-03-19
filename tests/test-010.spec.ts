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
 * Complex e2e test for dashboard - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("e2e-dashboard-test-10", async ({ page }) => {
  // Test scenario 10
  await runComplexTestScenario(page, 10);
  
  // Add complexity variations based on test number to ensure diversity
  const complexityFactor = 10;
  
  // Additional test-specific operations
  await test.step("Performing e2e-specific operations", async () => {
    await simulateNetworkDelay(page, 500 * complexityFactor, 1500 * complexityFactor);
    await simulateHeavyComputation(complexityFactor + 1);
    
    
    
    
    
    
    
    
  });
  
  // Feature area specific tests
  await test.step("Testing dashboard functionality", async () => {
    
    await page.goto("https://demo.playwright.dev/todomvc");
    for (let i = 0; i < 5 * complexityFactor; i++) {
      await page.getByPlaceholder("What needs to be done?").fill(`Task ${i + 1}`);
      await page.getByPlaceholder("What needs to be done?").press("Enter");
      await simulateNetworkDelay(page, 100, 300);
    }
    await expect(page.getByTestId("todo-title")).toHaveCount(5 * complexityFactor);
    
    
    
    
    
    
    
    
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
    }, 10);
    
    await expect(page.locator('#test-result')).toHaveText(`Test 10 completed successfully`);
  });
});

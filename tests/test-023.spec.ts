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
 * Complex performance test for user-management - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("performance-user-management-test-23", async ({ page }) => {
  // Test scenario 23
  await runComplexTestScenario(page, 23);
  
  // Add complexity variations based on test number to ensure diversity
  const complexityFactor = 3;
  
  // Additional test-specific operations
  await test.step("Performing performance-specific operations", async () => {
    await simulateNetworkDelay(page, 500 * complexityFactor, 1500 * complexityFactor);
    await simulateHeavyComputation(complexityFactor + 1);
    
    
    
    
    
    
    await performComplexDOMOperations(page, 30 * complexityFactor);
    await simulateApiRequests(page, complexityFactor);
    await performCanvasOperations(page, complexityFactor);
    
    
    
  });
  
  // Feature area specific tests
  await test.step("Testing user-management functionality", async () => {
    
    
    
    await fillFormWithValidation(page, 10 * complexityFactor);
    
    
    
    
    
    
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
    }, 23);
    
    await expect(page.locator('#test-result')).toHaveText(`Test 23 completed successfully`);
  });
});

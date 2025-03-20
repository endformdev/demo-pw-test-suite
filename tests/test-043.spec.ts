import { expect, test } from "@playwright/test"
import {
	performCanvasOperations,
	performComplexDOMOperations,
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex performance test for reports - variation 1
 */
test("performance-reports-test-43", async ({ page }) => {
	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 2

	// Test scenario 43
	await runComplexTestScenario(page, complexityFactor)

	// Additional test-specific operations
	await test.step("Performing performance-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			500 * complexityFactor,
			1500 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await performComplexDOMOperations(page, 30 * complexityFactor)
		await simulateApiRequests(page, complexityFactor)
		await performCanvasOperations(page, complexityFactor)
	})

	// Feature area specific tests
	await test.step("Testing reports functionality", async () => {
		await performCanvasOperations(page, 3 * complexityFactor)
		await simulateHeavyComputation(complexityFactor * 2)
	})

	// Final assertions and validations
	await test.step("Verifying results", async () => {
		// Simulate final verifications
		await simulateNetworkDelay(page, 500, 1500)

		// Create a dynamic verification point
		await page.evaluate((testIndex) => {
			const resultElement = document.createElement("div")
			resultElement.id = "test-result"
			resultElement.textContent = `Test ${testIndex} completed successfully`
			document.body.appendChild(resultElement)
			return resultElement.id
		}, 43)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 43 completed successfully`
		)
	})
})

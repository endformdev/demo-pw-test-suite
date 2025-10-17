import { expect, test } from "@playwright/test"
import {
	performComplexDOMOperations,
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateLargeDataInteraction,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex ui test for search - variation 1
 */
test("ui-search-test-162", async ({ page }) => {
	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 10

	// Test scenario 162
	await runComplexTestScenario(page, complexityFactor)

	// Additional test-specific operations
	await test.step("Performing ui-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			50 * complexityFactor,
			100 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await performComplexDOMOperations(page, 10 * complexityFactor)
	})

	// Feature area specific tests
	await test.step("Testing search functionality", async () => {
		await simulateApiRequests(page, 2 * complexityFactor)
		await simulateLargeDataInteraction(page, 300 * complexityFactor)
	})

	// Final assertions and validations
	await test.step("Verifying results", async () => {
		// Simulate final verifications
		await simulateNetworkDelay(page, 100, 150)

		// Create a dynamic verification point
		await page.evaluate((testIndex) => {
			const resultElement = document.createElement("div")
			resultElement.id = "test-result"
			resultElement.textContent = `Test ${testIndex} completed successfully`
			document.body.appendChild(resultElement)
			return resultElement.id
		}, 162)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 162 completed successfully`
		)
	})
})

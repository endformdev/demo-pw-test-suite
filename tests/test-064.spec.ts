import { expect, test } from "@playwright/test"
import {
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateLargeDataInteraction,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex interaction test for search - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("interaction-search-test-64", async ({ page }) => {
	// Test scenario 64
	await runComplexTestScenario(page, 64)

	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 4

	// Additional test-specific operations
	await test.step("Performing interaction-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			500 * complexityFactor,
			1500 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await simulateLargeDataInteraction(page, 200 * complexityFactor)
	})

	// Feature area specific tests
	await test.step("Testing search functionality", async () => {
		await simulateApiRequests(page, 2 * complexityFactor)
		await simulateLargeDataInteraction(page, 300 * complexityFactor)
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
		}, 64)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 64 completed successfully`
		)
	})
})

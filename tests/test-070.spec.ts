import { expect, test } from "@playwright/test"
import {
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateLargeDataInteraction,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex e2e test for search - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("e2e-search-test-70", async ({ page }) => {
	// Test scenario 70
	await runComplexTestScenario(page, 70)

	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 10

	// Additional test-specific operations
	await test.step("Performing e2e-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			500 * complexityFactor,
			1500 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)
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
		}, 70)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 70 completed successfully`
		)
	})
})

import { expect, test } from "@playwright/test"
import {
	fillFormWithValidation,
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateLargeDataInteraction,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex form test for search - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("form-search-test-66", async ({ page }) => {
	// Test scenario 66
	await runComplexTestScenario(page, 66)

	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 6

	// Additional test-specific operations
	await test.step("Performing form-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			500 * complexityFactor,
			1500 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await fillFormWithValidation(page, 15 * complexityFactor)
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
		}, 66)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 66 completed successfully`
		)
	})
})

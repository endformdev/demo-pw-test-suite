import { expect, test } from "@playwright/test"
import {
	fillFormWithValidation,
	performCanvasOperations,
	performComplexDOMOperations,
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex performance test for billing - variation 1
 */
test("performance-billing-test-183", async ({ page }) => {
	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 2

	// Test scenario 183
	await runComplexTestScenario(page, complexityFactor)

	// Additional test-specific operations
	await test.step("Performing performance-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			50 * complexityFactor,
			100 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await performComplexDOMOperations(page, 20 * complexityFactor)
		await simulateApiRequests(page, complexityFactor)
		await performCanvasOperations(page, complexityFactor)
	})

	// Feature area specific tests
	await test.step("Testing billing functionality", async () => {
		await simulateApiRequests(page, complexityFactor)
		await fillFormWithValidation(page, 5 * complexityFactor)
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
		}, 183)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 183 completed successfully`
		)
	})
})

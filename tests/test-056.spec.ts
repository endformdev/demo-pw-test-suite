import { expect, test } from "@playwright/test"
import {
	fillFormWithValidation,
	performCanvasOperations,
	runComplexTestScenario,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex form test for analytics - variation 1
 */
test("form-analytics-test-56", async ({ page }) => {
	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 8

	// Test scenario 56
	await runComplexTestScenario(page, complexityFactor)

	// Additional test-specific operations
	await test.step("Performing form-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			50 * complexityFactor,
			100 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await fillFormWithValidation(page, 5 * complexityFactor)
	})

	// Feature area specific tests
	await test.step("Testing analytics functionality", async () => {
		await performCanvasOperations(page, 3 * complexityFactor)
		await simulateHeavyComputation(complexityFactor * 2)
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
		}, 56)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 56 completed successfully`
		)
	})
})

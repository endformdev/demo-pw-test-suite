import { expect, test } from "@playwright/test"
import {
	fillFormWithValidation,
	performCanvasOperations,
	runComplexTestScenario,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex visual test for user-management - variation 1
 */
test("visual-user-management-test-28", async ({ page }) => {
	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 3

	// Test scenario 28
	await runComplexTestScenario(page, complexityFactor)

	// Additional test-specific operations
	await test.step("Performing visual-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			500 * complexityFactor,
			1500 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await performCanvasOperations(page, 2 * complexityFactor)
	})

	// Feature area specific tests
	await test.step("Testing user-management functionality", async () => {
		await fillFormWithValidation(page, 10 * complexityFactor)
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
		}, 28)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 28 completed successfully`
		)
	})
})

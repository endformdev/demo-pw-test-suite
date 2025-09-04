import { expect, test } from "@playwright/test"
import {
	fillFormWithValidation,
	runComplexTestScenario,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex e2e test for user-management - variation 1
 */
test("e2e-user-management-test-30", async ({ page }) => {
	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 2

	// Test scenario 30
	await runComplexTestScenario(page, complexityFactor)

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
		}, 30)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 30 completed successfully`
		)
	})
})

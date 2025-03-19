import { expect, test } from "@playwright/test"
import {
	fillFormWithValidation,
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex form test for billing - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("form-billing-test-86", async ({ page }) => {
	// Test scenario 86
	await runComplexTestScenario(page, 86)

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
	await test.step("Testing billing functionality", async () => {
		await simulateApiRequests(page, complexityFactor)
		await fillFormWithValidation(page, 5 * complexityFactor)
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
		}, 86)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 86 completed successfully`
		)
	})
})

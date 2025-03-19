import { expect, test } from "@playwright/test"
import {
	fillFormWithValidation,
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex navigation test for billing - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("navigation-billing-test-85", async ({ page }) => {
	// Test scenario 85
	await runComplexTestScenario(page, 85)

	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 5

	// Additional test-specific operations
	await test.step("Performing navigation-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			500 * complexityFactor,
			1500 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await page.goto("https://playwright.dev/docs/intro")
		await expect(page).toHaveTitle(/Introduction/)
		await page.getByRole("link", { name: "Writing tests" }).click()
		await expect(
			page.getByRole("heading", { name: "Writing tests" })
		).toBeVisible()
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
		}, 85)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 85 completed successfully`
		)
	})
})

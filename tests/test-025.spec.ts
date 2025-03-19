import { expect, test } from "@playwright/test"
import {
	fillFormWithValidation,
	runComplexTestScenario,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex navigation test for user-management - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("navigation-user-management-test-25", async ({ page }) => {
	// Test scenario 25
	await runComplexTestScenario(page, 25)

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
		await expect(page).toHaveTitle(/Installation/)
		await page.getByRole("link", { name: "Writing tests" }).click()
		await expect(
			page.getByRole("heading", { name: "Writing tests" })
		).toBeVisible()
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
		}, 25)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 25 completed successfully`
		)
	})
})

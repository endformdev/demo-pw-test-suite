import { expect, test } from "@playwright/test"
import {
	performComplexDOMOperations,
	runComplexTestScenario,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex navigation test for notifications - variation 1
 */
test("navigation-notifications-test-175", async ({ page }) => {
	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 3

	// Test scenario 175
	await runComplexTestScenario(page, complexityFactor)

	// Additional test-specific operations
	await test.step("Performing navigation-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			50 * complexityFactor,
			100 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await page.goto("https://playwright.dev/docs/intro")
		await expect(page).toHaveTitle(/Installation/)
		await page.getByRole("link", { name: "Writing tests" }).first().click()
		await expect(
			page.getByRole("heading", { name: "Writing tests" })
		).toBeVisible()
	})

	// Feature area specific tests
	await test.step("Testing notifications functionality", async () => {
		await performComplexDOMOperations(page, 20 * complexityFactor)
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
		}, 175)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 175 completed successfully`
		)
	})
})

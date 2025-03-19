import { expect, test } from "@playwright/test"
import {
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateLargeDataInteraction,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex navigation test for search - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("navigation-search-test-65", async ({ page }) => {
	// Test scenario 65
	await runComplexTestScenario(page, 65)

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
		}, 65)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 65 completed successfully`
		)
	})
})

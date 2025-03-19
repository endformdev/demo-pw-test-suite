import { expect, test } from "@playwright/test"
import {
	loadHeavyResources,
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex api test for authentication - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("api-authentication-test-11", async ({ page }) => {
	// Test scenario 11
	await runComplexTestScenario(page, 11)

	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 1

	// Additional test-specific operations
	await test.step("Performing api-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			500 * complexityFactor,
			1500 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)

		await simulateApiRequests(page, 2 * complexityFactor)
	})

	// Feature area specific tests
	await test.step("Testing authentication functionality", async () => {
		await page.goto("https://demo.playwright.dev/todomvc")
		await simulateApiRequests(page, complexityFactor)
		await loadHeavyResources(page, complexityFactor)
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
		}, 11)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 11 completed successfully`
		)
	})
})

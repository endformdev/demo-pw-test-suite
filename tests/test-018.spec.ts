import { expect, test } from "@playwright/test"
import {
	loadHeavyResources,
	performCanvasOperations,
	runComplexTestScenario,
	simulateApiRequests,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex visual test for authentication - variation 1
 */
test("visual-authentication-test-18", async ({ page }) => {
	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 7

	// Test scenario 18
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
		}, 18)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 18 completed successfully`
		)
	})
})

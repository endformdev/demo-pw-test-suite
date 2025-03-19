import { expect, test } from "@playwright/test"
import {
	fillFormWithValidation,
	runComplexTestScenario,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex form test for dashboard - variation 1
 * This test is designed to take 20-90 seconds to execute
 */
test("form-dashboard-test-6", async ({ page }) => {
	// Test scenario 6
	await runComplexTestScenario(page, 6)

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
	await test.step("Testing dashboard functionality", async () => {
		await page.goto("https://demo.playwright.dev/todomvc")
		for (let i = 0; i < 5 * complexityFactor; i++) {
			await page
				.getByPlaceholder("What needs to be done?")
				.fill(`Task ${i + 1}`)
			await page.getByPlaceholder("What needs to be done?").press("Enter")
			await simulateNetworkDelay(page, 100, 300)
		}
		await expect(page.getByTestId("todo-title")).toHaveCount(
			5 * complexityFactor
		)
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
		}, 6)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 6 completed successfully`
		)
	})
})

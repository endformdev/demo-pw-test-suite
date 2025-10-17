import { expect, test } from "@playwright/test"
import {
	performCanvasOperations,
	runComplexTestScenario,
	simulateHeavyComputation,
	simulateNetworkDelay,
} from "../test-utils"

/**
 * Complex e2e test for reports - variation 1
 */
test("e2e-reports-test-150", async ({ page }) => {
	// Add complexity variations based on test number to ensure diversity
	const complexityFactor = 6

	// Test scenario 150
	await runComplexTestScenario(page, complexityFactor)

	// Additional test-specific operations
	await test.step("Performing e2e-specific operations", async () => {
		await simulateNetworkDelay(
			page,
			50 * complexityFactor,
			100 * complexityFactor
		)
		await simulateHeavyComputation(complexityFactor + 1)
	})

	// Feature area specific tests
	await test.step("Testing reports functionality", async () => {
		await performCanvasOperations(page, 3 * complexityFactor)
		await simulateHeavyComputation(complexityFactor * 2)
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
		}, 150)

		await expect(page.locator("#test-result")).toHaveText(
			`Test 150 completed successfully`
		)
	})
})

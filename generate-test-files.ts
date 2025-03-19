import fs from "fs"
import path from "path"

// Array of test types with variations to ensure diversity
const testTypes = [
	"api",
	"ui",
	"performance",
	"interaction",
	"navigation",
	"form",
	"accessibility",
	"visual",
	"component",
	"e2e",
]

// Array of features to test
const featureAreas = [
	"dashboard",
	"authentication",
	"user-management",
	"settings",
	"reports",
	"analytics",
	"search",
	"notifications",
	"billing",
	"profile",
]

// Generate a template for each test file
function generateTestFile(index) {
	const testType = testTypes[index % testTypes.length]
	const featureArea = featureAreas[Math.floor(index / 10) % featureAreas.length]
	const variationNumber = Math.floor(index / 100) + 1

	// Create unique test name
	const testName = `${testType}-${featureArea}-test-${index + 1}`

	// Create content
	const testContent = `import { expect, test } from "@playwright/test";
import {
  runComplexTestScenario,
  simulateNetworkDelay,
  simulateHeavyComputation,
  performComplexDOMOperations,
  fillFormWithValidation,
  simulateApiRequests,
  performCanvasOperations,
  simulateLargeDataInteraction,
  loadHeavyResources
} from "../test-utils";

/**
 * Complex ${testType} test for ${featureArea} - variation ${variationNumber}
 * This test is designed to take 20-90 seconds to execute
 */
test("${testName}", async ({ page }) => {
  // Test scenario ${index + 1}
  await runComplexTestScenario(page, ${index + 1});

  // Add complexity variations based on test number to ensure diversity
  const complexityFactor = ${(index % 10) + 1};

  // Additional test-specific operations
  await test.step("Performing ${testType}-specific operations", async () => {
    await simulateNetworkDelay(page, 500 * complexityFactor, 1500 * complexityFactor);
    await simulateHeavyComputation(complexityFactor + 1);

    ${
			testType === "ui" || testType === "component"
				? `await performComplexDOMOperations(page, 40 * complexityFactor);`
				: ""
		}
    ${
			testType === "form"
				? `await fillFormWithValidation(page, 15 * complexityFactor);`
				: ""
		}
    ${
			testType === "api"
				? `await simulateApiRequests(page, 2 * complexityFactor);`
				: ""
		}
    ${
			testType === "visual"
				? `await performCanvasOperations(page, 2 * complexityFactor);`
				: ""
		}
    ${
			testType === "performance"
				? `
    await performComplexDOMOperations(page, 30 * complexityFactor);
    await simulateApiRequests(page, complexityFactor);
    await performCanvasOperations(page, complexityFactor);
    `
				: ""
		}
    ${
			testType === "interaction"
				? `await simulateLargeDataInteraction(page, 200 * complexityFactor);`
				: ""
		}
    ${
			testType === "navigation"
				? `
    await page.goto("https://playwright.dev/docs/intro");
    await expect(page).toHaveTitle(/Installation/);
    await page.getByRole("link", { name: "Writing tests" }).click();
    await expect(page.getByRole("heading", { name: "Writing tests" })).toBeVisible();
    `
				: ""
		}
  });

  // Feature area specific tests
  await test.step("Testing ${featureArea} functionality", async () => {
    ${
			featureArea === "dashboard"
				? `
    await page.goto("https://demo.playwright.dev/todomvc");
    for (let i = 0; i < 5 * complexityFactor; i++) {
      await page.getByPlaceholder("What needs to be done?").fill(\`Task \${i + 1}\`);
      await page.getByPlaceholder("What needs to be done?").press("Enter");
      await simulateNetworkDelay(page, 100, 300);
    }
    await expect(page.getByTestId("todo-title")).toHaveCount(5 * complexityFactor);
    `
				: ""
		}
    ${
			featureArea === "authentication"
				? `
    await page.goto("https://demo.playwright.dev/todomvc");
    await simulateApiRequests(page, complexityFactor);
    await loadHeavyResources(page, complexityFactor);
    `
				: ""
		}
    ${
			featureArea === "user-management" || featureArea === "settings"
				? `
    await fillFormWithValidation(page, 10 * complexityFactor);
    `
				: ""
		}
    ${
			featureArea === "reports" || featureArea === "analytics"
				? `
    await performCanvasOperations(page, 3 * complexityFactor);
    await simulateHeavyComputation(complexityFactor * 2);
    `
				: ""
		}
    ${
			featureArea === "search"
				? `
    await simulateApiRequests(page, 2 * complexityFactor);
    await simulateLargeDataInteraction(page, 300 * complexityFactor);
    `
				: ""
		}
    ${
			featureArea === "notifications"
				? `
    await performComplexDOMOperations(page, 20 * complexityFactor);
    `
				: ""
		}
    ${
			featureArea === "billing"
				? `
    await simulateApiRequests(page, complexityFactor);
    await fillFormWithValidation(page, 5 * complexityFactor);
    `
				: ""
		}
    ${
			featureArea === "profile"
				? `
    await fillFormWithValidation(page, 8 * complexityFactor);
    await simulateHeavyComputation(complexityFactor);
    `
				: ""
		}
  });

  // Final assertions and validations
  await test.step("Verifying results", async () => {
    // Simulate final verifications
    await simulateNetworkDelay(page, 500, 1500);

    // Create a dynamic verification point
    await page.evaluate((testIndex) => {
      const resultElement = document.createElement('div');
      resultElement.id = 'test-result';
      resultElement.textContent = \`Test \${testIndex} completed successfully\`;
      document.body.appendChild(resultElement);
      return resultElement.id;
    }, ${index + 1});

    await expect(page.locator('#test-result')).toHaveText(\`Test ${
			index + 1
		} completed successfully\`);
  });
});
`

	return {
		filename: `test-${(index + 1).toString().padStart(3, "0")}.spec.ts`,
		content: testContent,
	}
}

const TEST_COUNT = 100

// Generate and save all test files
for (let i = 0; i < TEST_COUNT; i++) {
	const { filename, content } = generateTestFile(i)
	fs.writeFileSync(path.join(__dirname, filename), content)
	console.log(`Generated: ${filename}`)
}

console.log(`Generated ${TEST_COUNT} test files successfully.`)

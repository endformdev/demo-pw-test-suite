import { defineConfig, devices } from "@playwright/test"
export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	timeout: 45 * 60 * 1000,

	maxFailures: 10,

	reporter: [["list"]],
	use: {
		trace: "retain-on-failure",
	},

	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
})

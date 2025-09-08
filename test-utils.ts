import { expect, type Page } from "@playwright/test"

/**
 * Utility functions for complex testing scenarios
 */

/**
 * Simulates a complex network operation by waiting for a specific duration
 */
export async function simulateNetworkDelay(
	page: Page,
	baseMs: number,
	spread: number
): Promise<void> {
	const delay = baseMs + Math.random() * spread
	await page.waitForTimeout(delay)
}

/**
 * Performs CPU-intensive operations to simulate workload
 */
export async function simulateHeavyComputation(
	iterations: number
): Promise<void> {
	for (let i = 0; i < iterations; i++) {
		// Create large arrays and perform operations on them
		const arraySize = 10_000
		const array = Array.from({ length: arraySize }, () => Math.random())

		// Sort the array (CPU intensive)
		array.sort()

		// Calculate sum (another CPU operation)
		array.reduce((sum, current) => sum + current, 0)
	}
}

/**
 * Simulates complex DOM interactions and validations
 */
export async function performComplexDOMOperations(
	page: Page,
	elementCount: number
): Promise<void> {
	// Execute complex DOM operations in the browser context
	await page.evaluate((count) => {
		// Create many DOM elements dynamically
		const container = document.createElement("div")
		container.id = "test-container"
		container.style.position = "fixed"
		container.style.top = "0"
		container.style.left = "0"
		container.style.width = "10px"
		container.style.height = "10px"
		container.style.opacity = "0.1"
		container.style.pointerEvents = "none"

		for (let i = 0; i < count; i++) {
			const element = document.createElement("div")
			element.id = `dynamic-element-${i}`
			element.textContent = `Element ${i}`
			element.style.margin = "5px"
			element.style.padding = "5px"
			container.appendChild(element)
		}

		document.body.appendChild(container)

		// Trigger layout operations
		container.getBoundingClientRect()

		// Perform style manipulations
		for (let i = 0; i < count; i++) {
			const element = document.getElementById(`dynamic-element-${i}`)
			if (element) {
				element.style.color = i % 2 === 0 ? "red" : "blue"
				element.style.backgroundColor = i % 3 === 0 ? "yellow" : "white"
				element.style.border = i % 5 === 0 ? "1px solid black" : "none"
				element.getBoundingClientRect() // Force layout recalculation
			}
		}

		return container.id
	}, elementCount)

	// Clean up after test
	await page.evaluate(() => {
		const container = document.getElementById("test-container")
		if (container) {
			container.remove()
		}
	})
}

/**
 * Simulates form filling with validations
 */
export async function fillFormWithValidation(
	page: Page,
	fieldCount: number
): Promise<void> {
	await page.evaluate((count) => {
		// Create a complex form
		const form = document.createElement("form")
		form.id = "complex-form"
		form.style.position = "fixed"
		form.style.top = "0"
		form.style.left = "0"
		form.style.opacity = "0.1"
		form.style.pointerEvents = "none"

		for (let i = 0; i < count; i++) {
			const fieldContainer = document.createElement("div")

			const label = document.createElement("label")
			label.textContent = `Field ${i}:`
			label.setAttribute("for", `field-${i}`)

			const input = document.createElement("input")
			input.id = `field-${i}`
			input.name = `field-${i}`
			input.type = i % 5 === 0 ? "number" : i % 4 === 0 ? "email" : "text"

			const validationMessage = document.createElement("span")
			validationMessage.id = `validation-${i}`
			validationMessage.style.color = "red"
			validationMessage.style.display = "none"

			fieldContainer.appendChild(label)
			fieldContainer.appendChild(input)
			fieldContainer.appendChild(validationMessage)
			form.appendChild(fieldContainer)
		}

		document.body.appendChild(form)
		return form.id
	}, fieldCount)

	// Fill the form with values and perform validations
	for (let i = 0; i < fieldCount; i++) {
		const fieldType = i % 5 === 0 ? "number" : i % 4 === 0 ? "email" : "text"
		let value = ""

		// Create appropriate test values based on field type
		if (fieldType === "number") {
			value = String(Math.floor(Math.random() * 1000))
		} else if (fieldType === "email") {
			value = `test-${i}@example.com`
		} else {
			value = `Test value ${i} ${Math.random().toString(36).substring(2, 8)}`
		}

		// Fill the field
		await page.evaluate(
			([fieldId, fieldValue]) => {
				const input = document.getElementById(fieldId) as HTMLInputElement
				if (input) {
					input.value = fieldValue

					// Trigger validation
					const event = new Event("input", { bubbles: true })
					input.dispatchEvent(event)

					// Simple validation logic
					const validationElem = document.getElementById(
						`validation-${fieldId.split("-")[1]}`
					)
					if (validationElem) {
						if (input.type === "email" && !fieldValue.includes("@")) {
							validationElem.textContent = "Invalid email"
							validationElem.style.display = "block"
						} else if (
							input.type === "number" &&
							Number.isNaN(Number(fieldValue))
						) {
							validationElem.textContent = "Invalid number"
							validationElem.style.display = "block"
						} else {
							validationElem.style.display = "none"
						}
					}
				}
			},
			[`field-${i}`, value] as const
		)

		// Add brief delay between fields to simulate user input
		await page.waitForTimeout(50)
	}

	// Cleanup
	await page.evaluate(() => {
		const form = document.getElementById("complex-form")
		if (form) {
			form.remove()
		}
	})
}

/**
 * Simulate complex API requests and processing responses
 */
export async function simulateApiRequests(
	page: Page,
	requestCount: number
): Promise<void> {
	// Set up response interception for test data
	await page.route("**/api/test-data/**", async (route) => {
		await simulateNetworkDelay(page, 150, 100)
		const data = Array.from({ length: 100 }, (_, i) => ({
			id: i,
			name: `Item ${i}`,
			value: Math.random() * 1000,
			timestamp: new Date().toISOString(),
			complex: {
				nested: {
					data: Array.from({ length: 20 }, (_, j) => ({
						subId: j,
						value: Math.random(),
					})),
				},
			},
		}))
		await route.fulfill({ json: data })
	})

	// Perform multiple API requests
	for (let i = 0; i < requestCount; i++) {
		await page.evaluate(async (index) => {
			const response = await fetch(`/api/test-data/${index}`)
			if (!response.ok) {
				const text = await response.text()
				console.error(`Failed to fetch data: ${response.statusText} ${text}`)
			} else {
				const data = await response.json()
				console.log(data)
			}
		}, i)

		// Add processing time between requests
		await simulateHeavyComputation(1)
	}
}

/**
 * Simulates complex rendering scenarios with canvas operations
 */
export async function performCanvasOperations(
	page: Page,
	complexity: number
): Promise<void> {
	await page.evaluate((level) => {
		const canvas = document.createElement("canvas")
		canvas.id = "test-canvas"
		canvas.width = 800
		canvas.height = 600
		canvas.style.position = "fixed"
		canvas.style.top = "0"
		canvas.style.left = "0"
		canvas.style.opacity = "0.1"
		canvas.style.pointerEvents = "none"
		document.body.appendChild(canvas)

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		// Draw complex shapes based on complexity level
		for (let i = 0; i < 100 * level; i++) {
			// Random colors
			ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
				Math.random() * 255
			)}, ${Math.floor(Math.random() * 255)})`
			ctx.strokeStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
				Math.random() * 255
			)}, ${Math.floor(Math.random() * 255)})`

			// Random positions
			const x = Math.random() * canvas.width
			const y = Math.random() * canvas.height

			// Draw different types of shapes
			const shapeType = i % 4
			if (shapeType === 0) {
				// Rectangle
				ctx.fillRect(x, y, Math.random() * 50 + 10, Math.random() * 50 + 10)
			} else if (shapeType === 1) {
				// Circle
				ctx.beginPath()
				ctx.arc(x, y, Math.random() * 30 + 5, 0, Math.PI * 2)
				ctx.fill()
			} else if (shapeType === 2) {
				// Line
				ctx.beginPath()
				ctx.moveTo(x, y)
				ctx.lineTo(x + Math.random() * 100 - 50, y + Math.random() * 100 - 50)
				ctx.stroke()
			} else {
				// Path
				ctx.beginPath()
				ctx.moveTo(x, y)
				for (let j = 0; j < 5; j++) {
					ctx.lineTo(x + Math.random() * 100 - 50, y + Math.random() * 100 - 50)
				}
				ctx.closePath()
				ctx.fill()
				ctx.stroke()
			}
		}

		return canvas.id
	}, complexity)

	// Cleanup
	await page.evaluate(() => {
		const canvas = document.getElementById("test-canvas")
		if (canvas) {
			canvas.remove()
		}
	})
}

/**
 * Simulates scrolling and interaction with a large dataset
 */
export async function simulateLargeDataInteraction(
	page: Page,
	itemCount: number
): Promise<void> {
	// Create a large virtual list
	await page.evaluate((count) => {
		const container = document.createElement("div")
		container.id = "large-data-container"
		container.style.position = "fixed"
		container.style.top = "0"
		container.style.left = "0"
		container.style.width = "100%"
		container.style.height = "100%"
		container.style.overflow = "auto"
		container.style.opacity = "0.1"
		container.style.backgroundColor = "#f0f0f0"
		container.style.pointerEvents = "none"

		// Create a large number of items
		for (let i = 0; i < count; i++) {
			const item = document.createElement("div")
			item.id = `item-${i}`
			item.textContent = `Item ${i} - ${Math.random()
				.toString(36)
				.substring(2, 12)}`
			item.style.padding = "20px"
			item.style.margin = "5px"
			item.style.backgroundColor = "#fff"
			item.style.border = "1px solid #ddd"
			container.appendChild(item)
		}

		document.body.appendChild(container)
		return container.id
	}, itemCount)

	// Perform various scrolling operations
	const scrollSteps = Math.min(20, Math.floor(itemCount / 10))
	for (let i = 0; i < scrollSteps; i++) {
		const targetPosition = itemCount * 30 * (i / scrollSteps)

		// Scroll to position
		await page.evaluate((position) => {
			const container = document.getElementById("large-data-container")
			if (container) {
				container.scrollTop = position
			}
		}, targetPosition)

		// Wait briefly to simulate looking at content
		await page.waitForTimeout(100)

		// Interact with some elements
		if (i % 3 === 0) {
			const targetItem = Math.floor(targetPosition / 30 + Math.random() * 5)
			await page.evaluate((itemId) => {
				const item = document.getElementById(`item-${itemId}`)
				if (item) {
					item.style.backgroundColor = "#f0f8ff"
					item.innerHTML += ' <span style="color: blue">[Selected]</span>'
				}
			}, targetItem)
		}
	}

	// Cleanup
	await page.evaluate(() => {
		const container = document.getElementById("large-data-container")
		if (container) {
			container.remove()
		}
	})
}

/**
 * Load resources that take some time
 */
export async function loadHeavyResources(
	page: Page,
	resourceCount: number
): Promise<void> {
	await page.evaluate((count) => {
		const container = document.createElement("div")
		container.id = "resource-container"
		container.style.position = "fixed"
		container.style.top = "0"
		container.style.left = "0"
		container.style.opacity = "0"
		document.body.appendChild(container)

		// Create scripts that simulate resource loading
		for (let i = 0; i < count; i++) {
			const loadTime = 50 + Math.random() * 300

			// Create a promise that resolves after the load time
			window.setTimeout(() => {
				const element = document.createElement("div")
				element.id = `resource-${i}`
				element.textContent = `Resource ${i} loaded after ${loadTime}ms`
				container.appendChild(element)
			}, loadTime)
		}

		return container.id
	}, resourceCount)

	// Wait for all resources to be loaded
	for (let i = 0; i < resourceCount; i++) {
		await page.waitForSelector(`#resource-${i}`, { timeout: 10000 })
	}

	// Cleanup
	await page.evaluate(() => {
		const container = document.getElementById("resource-container")
		if (container) {
			container.remove()
		}
	})
}

/**
 * Generate complex test scenario that will take between 10-40 seconds
 */
export async function runComplexTestScenario(
	page: Page,
	complexityFactor: number
): Promise<void> {
	// Step 1: Navigate to a page and wait for it to load
	// console.time("ssteeep-1")
	await page.goto("https://playwright.dev/")
	await expect(page).toHaveTitle(/Playwright/)
	// console.timeEnd("ssteeep-1")

	// Step 2: Perform DOM manipulations
	// console.time("ssteeep-2")
	await performComplexDOMOperations(page, 25 * complexityFactor)
	// console.timeEnd("ssteeep-2")

	// Step 3: Simulate network delays and API calls
	// console.time("ssteeep-3")
	await simulateApiRequests(page, 2 + complexityFactor)
	// console.timeEnd("ssteeep-3")

	// Step 4: Perform CPU-intensive operations
	// console.time("ssteeep-4")
	await simulateHeavyComputation(complexityFactor)
	// console.timeEnd("ssteeep-4")

	// Step 5: Interact with form elements
	// console.time("ssteeep-5")
	await fillFormWithValidation(page, 5 + complexityFactor)
	// console.timeEnd("ssteeep-5")

	// Step 6: Canvas operations for visual rendering load
	// console.time("ssteeep-6")
	await performCanvasOperations(page, Math.ceil(complexityFactor / 2))
	// console.timeEnd("ssteeep-6")

	// Step 7: Simulate scrolling through large datasets
	// console.time("ssteeep-7")
	await simulateLargeDataInteraction(page, 50 * complexityFactor)
	// console.timeEnd("ssteeep-7")

	// Step 8: Load heavy resources
	// console.time("ssteeep-8")
	await loadHeavyResources(page, Math.ceil(complexityFactor / 2))
	// console.timeEnd("ssteeep-8")

	// Additional network delay to ensure total test time is adequate
	// console.time("ssteeep-9")
	await simulateNetworkDelay(
		page,
		100 * complexityFactor,
		200 * complexityFactor
	)
	// console.timeEnd("ssteeep-9")
}

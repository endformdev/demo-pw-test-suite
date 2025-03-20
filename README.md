# Benchmark Test Suite

This directory contains 50 different Playwright tests designed to benchmark test runner performance. Each test is configured to take approximately 10-40 seconds to execute by performing various complex operations.

## Overview

- 50 unique test files with varying complexity
- Each test performs a variety of operations including:
  - DOM manipulations
  - Network requests
  - CPU-intensive computations
  - Form interactions
  - Canvas operations
  - Large data set scrolling
  - Resource loading simulations

## Test Organization

Tests are organized into combinations of:

- Test types (api, ui, performance, interaction, navigation, form, accessibility, visual, component, e2e)
- Feature areas (dashboard, authentication, user-management, settings, reports, analytics, search, notifications, billing, profile)

## Running Tests

Tests can be run using the standard Playwright commands:

```bash
# Run all tests
npx playwright test

# Run a specific test
npx playwright test test-001.spec.ts

# Run a subset of tests
npx playwright test test-0[1-5]*.spec.ts
```

## Test Utilities

All tests use the utility functions defined in `test-utils.ts` which provide common complex operations:

- `runComplexTestScenario`: Main test scenario runner with configurable complexity
- `simulateNetworkDelay`: Simulates network latency
- `simulateHeavyComputation`: Performs CPU-intensive operations
- `performComplexDOMOperations`: Manipulates the DOM
- `fillFormWithValidation`: Simulates form interactions
- `simulateApiRequests`: Mocks API requests with variable response times
- `performCanvasOperations`: Executes canvas drawing operations
- `simulateLargeDataInteraction`: Creates and interacts with large datasets
- `loadHeavyResources`: Simulates loading of heavy resources

## Regenerating Tests

If you need to regenerate the test files, run:

```bash
bun generate-test-files.ts
```

## Complexity Scaling

Tests have a complexity factor that scales based on the test number modulo 10 + 1 (values 1-10). This ensures a variety of test durations within the 20-90 second range.

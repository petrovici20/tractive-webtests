module.exports = {
    testDir: './tests',  // Directory where test files are located
    retries: 2,          // Retry failed tests up to 2 times
    use: {
      browserName: 'chromium',  // Use Chromium by default
      headless: true,           // Run tests in headless mode by default
      screenshot: 'on',         // Take screenshots on test failure
      video: 'retain-on-failure'// Record videos on test failure
    },
  };
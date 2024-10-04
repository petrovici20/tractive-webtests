const {expect,  chromium } = require('@playwright/test');

async function openBrowserWithCookie(url) {
    // Launch a new browser instance
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext() // Create a new browser context
    const page = await context.newPage() // Open a new page
  
    // Default cookie to add to the context
    const defaultCookie = {
      name: 'interview',             
      value: '7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl',            
      domain: '.tractive.com',            
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'None',
      expires:  Math.floor(Date.now() / 1000) + 86400 // Expires in 1 day
    };
  
    // Add the default cookie to the context
    await context.addCookies([defaultCookie])
  
    // Navigate to the specified URL
    await page.goto(url)
    await page.waitForTimeout(5000)
  
    const cookieButton = page.getByRole('button', { name: 'OK' })
    if (await cookieButton.isVisible()) {
      await cookieButton.click()
    }
  
    return { browser, page }
  }

async function clickLinkAndVerifyURL(page, linkText, expectedURL) {
    // Store the current page before clicking the link
    const currentPage = page;

    // Click the link
    await currentPage.click(`text=${linkText}`);

    // Wait for the new page/tab to open
    const newPagePromise = currentPage.context().waitForEvent('page');
    const newPage = await newPagePromise;

    // Wait for the new page to load
    await newPage.waitForLoadState();

    // Verify that the current tab's URL matches the expected URL
    await expect(newPage).toHaveURL(expectedURL);
}

module.exports= {clickLinkAndVerifyURL, openBrowserWithCookie }
  
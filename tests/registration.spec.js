const { test, expect} = require('@playwright/test');
const RegistrationPage = require('../pages/registration.page'); // Import the Signup Page Object
const { openBrowserWithCookie, clickLinkAndVerifyURL, verifyRedirectToCorrectLink} = require('../utils/helpers'); // Import the helpers

test.describe('Create Account Form Tests', () => {
  let browser, page, regPage

  test.beforeEach (async () => {
    const bp = await openBrowserWithCookie('https://my-stage.tractive.com/#/signup')
    browser = bp.browser
    page = bp.page

    // Initialize the SignupPage object
    regPage = new RegistrationPage(page) // Create an instance of class RegistrationPage
  })

  test.afterEach (async () => {
    await browser.close()
  });

  test('successfully create an account with valid details', async ( ) => {
    //const { browser, page } = await openBrowserWithCookie('https://my-stage.tractive.com/#/signup');

    // Fill out the form fields
    await regPage.fillFirstName('Alex') // Fill first name field
    await regPage.fillLastName('Petrovici') // Fill last name field
    await regPage.fillEmail('user@domain.com') // Fill email field
    await regPage.fillPassword('1234567891')// Fill password field
    
    await regPage.checkPromo()// Click the checkbox to check it
    

    await regPage.subbmitForm()// Click Create Account button

    await verifyRedirectToCorrectLink(page, 'https://staging.tractive.com/activation/#/activation/device' )// Check if redirected to the success page
    //await browser.close(); 
  });


  test('first and last name fields empty', async () => {

    await regPage.fillFirstName('')
    await regPage.fillLastName('')
    // Assertions
    await regPage.assertionFirstNameErrorVisible ()
    await regPage.assersionLastNameErrorVisible ()
    // Fill email and password with valid data
    await regPage.fillEmail('user@domain.com')
    await regPage.fillPassword('1234567891')
    // Check and uncheck the checkbox and verfy if it is checked/unchecked
    regPage.checkPromo()
    await page.waitForTimeout(500);
    regPage.uncheckPromo()

  })

  test('email address is incorrect', async () => {  
    
    // Fill first and last name with valid data
    await regPage.fillFirstName('Alex') 
    await regPage.fillLastName('Petrovici')
    // Fill email with wrong data
    await regPage.fillEmail('user.domain.com')
    await regPage.fillPassword('123456789')
    await regPage.assersionEmailErrorVisible()

  })

  test('password is incorrect', async () => {
    
    // Fill out the first 3 fields with valid data
    await regPage.fillFirstName('Alex') 
    await regPage.fillLastName('Petrovici') 
    await regPage.fillEmail('user@domain.com') 
    // Fill password with characters<8 
    await regPage.fillPassword('12ab')
    await regPage.clickOnTheForm()
    await regPage.assersionPasswordErrorVisible()
    
  })

  test('test Terms and Conditions', async () => {
    
    await regPage.clickOnTermsAndConds()
    await page.waitForTimeout(2000);
    const expectedURL ='https://assets.tractive.com/static/legal/en/terms-of-service.pdf'
    await clickLinkAndVerifyURL(page,'Terms & Conditions', expectedURL)
    
  })

  test('test Privacy Policy', async () => {
    
    await regPage.clickOnPrivacyPolicy()
    await page.waitForTimeout(2000);
    const expectedURL ='https://assets.tractive.com/static/legal/en/privacy-policy.pdf'
    await clickLinkAndVerifyURL(page,'Privacy Policy', expectedURL)
    
  })

  test('test go to Sing in page', async () => {
    
    await regPage.clickOnAlreadyHaveAnAccount()
    await page.waitForTimeout(2000);
    await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/')
    
  })

  test ('test Try demo mode link', async () =>{

    await regPage.clickOnDemoMode()
    await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/map')

  })

})
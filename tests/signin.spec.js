const { test, expect} = require('@playwright/test');
const SignInPage = require('../pages/signin.page'); //Import the SignIn page
const { openBrowserWithCookie, verifyRedirectToCorrectLink, verifyPopUpText} = require('../utils/helpers');//import helerp functions


test.describe ('Sing in form tests',() =>{

    let browser, page, signinPage
    //Open the website before each test and resolve the cookie
    test.beforeEach (async () => {
      const bp = await openBrowserWithCookie('https://my-stage.tractive.com/#/')
      browser = bp.browser
      page = bp.page
  
      // Initialize the SignupPage object
      signinPage = new SignInPage(page) // Create an instance of class RegistrationPage
    })
  
    test.afterEach (async () => {
      await browser.close()
    });

    test('successful login with valid credentials and logout', async() =>{

        await signinPage.fillEmailAddress ('iovanca.petrovici@gmail.com')
        await signinPage.fillPassword ('123456789')
        await signinPage.clickOnSignIn()
        //Verify if the opened page is the correct one
        await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/settings/')
        //Logout after succesfull login
        await signinPage.signout()
        await signinPage.signoutFromAllDevicesChecbox()
        await signinPage.signoutConfirmation()
        await signinPage.signoutNowButtonClick()
        await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/')

    })

    test('successful login with valid credentials and cancel logout', async() =>{

      await signinPage.fillEmailAddress ('iovanca.petrovici@gmail.com')
      await signinPage.fillPassword ('123456789')
      await signinPage.clickOnSignIn()
      await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/settings/')
      //cancel Logout after succesfull login
      await signinPage.signout()
      //await signinPage.validationPopupShowing()
      await signinPage.signoutCancel()
      await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/settings/')

  })

    test('unsuccessful login with unregistered email', async() =>{

        await signinPage.fillEmailAddress ('alexandrapetrovici@gmail.com')
        await signinPage.fillPassword ('123456789')
        await signinPage.clickOnSignIn()
        await verifyPopUpText(page, '.toast-error', "Looks like you entered a wrong email or password.")

    })

    test('forgot password functionality with registered email', async () =>{

        await signinPage.clickOnForgotPassword()
        await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/forgot')
        // //Second way of verifying that the opened page is correct
        // await page.waitForSelector('.webapp-login-form');
        // const isTextVisible = await page.isVisible('h2:has-text("Reset your password")'); 
        // expect(isTextVisible).toBe(true);
        await signinPage.fillEmailAddress('alexandrapetrovici16@yahoo.com')
        await signinPage.clickReset()
        //Verify if the erroe pop up showed up with the correct message
        await verifyPopUpText(page, '.toast-info', "We've sent you a 24hr password reset link.")
        await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/')

    })

    test('forgot password functionality with unregistered email', async () =>{

        await signinPage.clickOnForgotPassword()
        await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/forgot')
        await signinPage.fillEmailAddress('alexandra@yahoo.com')
        await signinPage.clickReset()
        //Verify if the erroe pop up showed up with the correct message
        await verifyPopUpText(page,'.toast-error',"No Tractive account tied to this email." )

    })


    test('test create account link', async () => {

      await signinPage.createAccountClick()
      await page.waitForTimeout(2000);
      await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/signup')

    })

    test('test try demo mode link', async () => {

      await signinPage.tryDemoModeClick()
      await page.waitForTimeout(2000);
      await verifyRedirectToCorrectLink(page, 'https://my-stage.tractive.com/#/map')

    })




})
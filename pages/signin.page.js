const { expect } = require('@playwright/test');


class SignInPage{

    constructor(page){

        this.page=page
        this.emailAdressPlaceholder= page.locator('input[type="email"]')
        this.passwordPlaceholder=page.locator('input[type="password"]')
        this.signInButton= page.getByRole('button', { name: 'Sign In', exact: true })
        this.forgotPassword= page.getByText('Forgot password?')
        this.resetButton= page.getByRole('button', { name: 'Reset' })
        this.cancelButton= page.getByRole('link', { name: 'Cancel' })
        this.signoutButton= page.getByRole('banner').getByText('Sign Out')
        this.signoutButtonConfirmation= page.getByRole('button', { name: 'Sign Out' })
        this.cancelButtonSignout=page.getByRole('button', { name: 'Cancel' })
        this.signOutFromAllDevicesCheck = page.locator('text=Sign out from all devices');
        this.signoutNowButton=page.getByRole('button', { name: 'Sign out now' })
        this.createAccount=page.getByRole('link', { name: 'Create Account' })
        this.tryDemoMode=page.getByRole('button', { name: 'Try Demo Mode' })
        

    }

    //Methods for interacting with the form

    async fillEmailAddress (email)
    {
        await this.emailAdressPlaceholder.fill(email)
    }

    async fillPassword (password)
    {
        await this.passwordPlaceholder.fill(password)
    }

    async clickOnSignIn()
    {
        await this.signInButton.click()
    }

    async clickOnForgotPassword()
    {
        await this.forgotPassword.click()
    }

    async clickReset()
    {
        await this.resetButton.click()
    }

    async clickCancel()
    {
        await this.cancelButton.click()
    }

    async signout()
    {
        await this.signoutButton.click()
    }

    async signoutConfirmation()
    {
        await this.signoutButtonConfirmation.click()
    }

    async signoutCancel()
    {
        await this.cancelButtonSignout.click()
    }

    async createAccountClick()
    {
        await this.createAccount.click()
    }

    async tryDemoModeClick()
    {
        await this.tryDemoMode.click()
    }
    
    async signoutNowButtonClick()
    {
        await this.signoutNowButton.click()
    }

    async signoutFromAllDevicesChecbox()
    {
        await this.signOutFromAllDevicesCheck.click()
        await expect(this.signOutFromAllDevicesCheck).toBeChecked()
    }

   
}

module.exports = SignInPage;
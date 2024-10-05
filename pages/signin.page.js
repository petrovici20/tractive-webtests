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

}

module.exports = SignInPage;
const { expect } = require('@playwright/test');

class RegistrationPage {
    constructor(page){

        this.page=page
        //Define locators
        this.firstNameField =page.locator('input[name="firstName"]')
        this.lastNameField=page.locator('input[name="lastName"]')
        this.emailField=page.locator('input[name="email"]')
        this.passwordField=page.locator('input[name="password"]')
        //this.checkboxTerms=page.locator('label.tcommon-check .tcommon-check__mask')
        this.checkboxPromo=page.locator('tcommon-check div')
        this.actualCheckbox = this.page.locator('input[type="checkbox"][id="newsletter"]');
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' })
        this.formClick=page.getByText('Create Account First name')
        this.termsAndConds=page.getByRole('link', { name: 'Terms & Conditions' })
        //Define error locators
        this.firstNameError = page.locator('text=This field is required')
        this.lastNameError = page.locator('text=This field is required')
        this.emailError = page.locator('text=The email address is invalid')
        this.passwordError = page.locator('text=Minimum length is 8 characters')
        



    }

    //Methods for interacting with the form

    async fillFirstName(firstName)
    {
        await this.firstNameField.fill(firstName)
    }

    async fillLastName(lastName)
    {
        await this.lastNameField.fill(lastName)
    }

    async fillEmail(email)
    {
        await this.emailField.fill(email)
    }

    async fillPassword(password)
    {
        await this.passwordField.fill(password)
    }

    async checkPromo()
    {
        await this.checkboxPromo.click()
        await expect(this.actualCheckbox).toBeChecked();
    }

    async uncheckPromo()
    {
        await this.checkboxPromo.click()
        await expect(this.actualCheckbox).not.toBeChecked();
    }

    async subbmitForm()
    {
        await this.createAccountButton.click()
    }

    async clickOnTheForm()
    {
        await this.formClick.click()
    }

    async clickOnTermsAndConds()
    {
        await this.termsAndConds.click()
    }

    //Assersion methods
    async assertionFirstNameErrorVisible ()
    {
        await expect(this.firstNameError).toBeVisible()
    }

    async assersionLastNameErrorVisible ()
    {
        await expect(this.lastNameError).toBeVisible()
    }

    async assersionEmailErrorVisible()
    {
        await expect(this.emailError).toBeVisible()
    }

    async assersionPasswordErrorVisible()
    {
        await expect(this.passwordError).toBeVisible()
    }

    async assersionRedirectToScucces()
    {
        await expect(this.page).toHaveURL('https://staging.tractive.com/activation/#/activation/device');
    }
    
}

module.exports = RegistrationPage;

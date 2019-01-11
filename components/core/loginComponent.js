/**
 * @file Login Component.
 * @author Hasitha Gamage
 */
'use strict';

import { Selector, t } from 'testcafe';

import BaseComponent from '../BaseComponent';
import config from '../../libs/helpers/configHelper';

class LoginComponent extends BaseComponent {
    constructor () {
        // noinspection JSAnnotator
        super();

        const loginObject = this.UIObjects.loginObject;

        // UI objects with initialization
        this.buttonSignIn = Selector(loginObject.data.pages.login.uiobjects.buttonSignIn.selector);
        this.inputEmail = Selector(loginObject.data.pages.login.uiobjects.inputEmail.selector);
        this.inputPassword = Selector(loginObject.data.pages.login.uiobjects.inputPassword.selector);

        this.execute = this.execute.bind(this);
    }

    async execute (data) {
        await t
            .maximizeWindow()
            .typeText(this.inputEmail, data.email)
            .typeText(this.inputPassword, data.password)
            .click(this.buttonSignIn)
            .navigateTo('https://www.mydeal.lk/');
    }
}

module.exports = LoginComponent;
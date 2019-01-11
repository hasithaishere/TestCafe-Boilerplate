/**
 * @file Test class for all login page related test cases.
 * @author Hasitha Gamage
 */
'use strict';

import getValue from 'get-value';
import Libs from '../libs';
import components from '../components';

//const components = Libs.components;
const config = Libs.helpers.configHelper;
const dataHelper = Libs.helpers.dataHelper;

const loginComponent  = new components.core.loginComponent();
const searchComponent  = new components.core.searchComponent();
const dataSet = dataHelper.load();

fixture `:Different Admin Login Page`;

// Example with data itrations
for (let index = 0; index < dataSet.data.login.length; index++) {
    test.page(`${config.appdata.baseUrl}`)('Login to Aliexpress - ' + index , async () => {
        await loginComponent.execute(dataSet.data.login[index]);
        await searchComponent.execute();
    });
}

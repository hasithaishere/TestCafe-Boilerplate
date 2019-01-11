/**
 * @file Search Component.
 * @author Hasitha Gamage
 */
'use strict';

import { Selector, t } from 'testcafe';

import BaseComponent from '../BaseComponent';
import config from '../../libs/helpers/configHelper';

class SearchComponent extends BaseComponent {
    constructor () {
        // noinspection JSAnnotator
        super();

        const searchObject = this.UIObjects.searchObject;

        // UI objects with initialization
        this.buttonSearch = Selector(searchObject.data.pages.login.uiobjects.buttonSearch.selector);
        this.inputSearch = Selector(searchObject.data.pages.login.uiobjects.inputSearch.selector);

        this.buttonDailyDealModelClose = Selector(searchObject.data.pages.login.uiobjects.buttonDailyDealModelClose.selector);

        this.execute = this.execute.bind(this);
    }

    async execute (data) {
        if(await this.buttonDailyDealModelClose.exists && this.buttonDailyDealModelClose.visible){
    	   await t
    	   .click(this.buttonDailyDealModelClose);
        }

        await t
            .maximizeWindow()
            .typeText(this.inputSearch, data.query)
            .click(this.buttonSearch);
    }
}

module.exports = SearchComponent;
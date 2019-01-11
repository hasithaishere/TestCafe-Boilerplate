/**
 * @file Base Component - Abstract Class.
 * @author Hasitha Gamage
 */
'use strict';

import UIObjects from '../uiObjects';

class BaseComponent {
    constructor () {
        this.UIObjects = UIObjects;
    }

    execute () {
        throw new Error('You must implement this method');
    }
}

module.exports = BaseComponent;
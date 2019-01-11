/**
 * @file Helper class for manipulate all the configurations.
 * @author Hasitha Gamage
 */
'use strict';

import fs from 'fs';
import path from 'path';

let configData = null;

function init() {
    const environment = process.env.NODE_ENV || 'default';

    const rawConfig = fs.readFileSync(`${path.resolve(__dirname)}/../../config/default.json`);
    configData = JSON.parse(rawConfig);

    if (environment !== 'default') {
        const selectedConfig = fs.readFileSync(`${path.resolve(__dirname)}/../../config/${environment}.json`);
        configData = Object.assign({}, configData, JSON.parse(selectedConfig));
    }

    return configData;
};

init();

module.exports = configData;
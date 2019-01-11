/**
 * @file Helper class for get data from google spread sheet.
 * @author Hasitha Gamage
 */
'use strict';

import _ from 'underscore';
import _string from 'underscore.string';
import deasync from 'deasync';
import GoogleSpreadsheet from 'google-spreadsheet';
import Promise from 'bluebird';
import memCache from 'memory-cache';
import set from 'set-value';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

import config from './configHelper';

function generateObjectPath(filePath) {
    return _string.camelize(
        _string.trim(
            filePath.replace(
                path.extname(filePath), '')
                .replace(/([^a-zA-Z0-9//])/g, "-")
                .toLowerCase()
        )
    ).replace(/(\/)/g, '.');
}

function loadFromExcel(startPath, filter, output={}) {
    if (fs.existsSync(startPath)){
        fs.readdirSync(startPath).forEach((file) => {
            const filename=path.join(startPath,file);
            if (fs.lstatSync(filename).isDirectory()){
                loadFromExcel(filename,filter, output);
            } else if (filter.includes(path.extname(filename))) {
                switch (path.extname(filename)) {
                    case '.xlsx':
                        const workbook = XLSX.readFile(filename);
                        const sheetNameList = workbook.SheetNames;

                        const workbookData = {};

                        sheetNameList.forEach(sheet => {
                            workbookData[generateObjectPath(sheet)] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                        });

                        set(output, generateObjectPath(filename), workbookData);
                        break;
                }
            };
        });
    }
    return output;
};

function loadFromGoogleSheet() {

    function loadSheet(sheetId, sheetName) {
        const docAsync = Promise.promisifyAll(new GoogleSpreadsheet(sheetId));

        const result = {
            data: {},
            metadata: null
        };

        return docAsync.useServiceAccountAuthAsync(config.credentials.google).then(() => {
            return docAsync.getInfoAsync();
        }).then((sheetData) => {
            result.metadata = sheetData;

            const sheetPromises = [];
            sheetData.worksheets.forEach(sheetInfo => {
                sheetPromises.push(new Promise((resolve, reject) => {
                    const sheetInfoAync = Promise.promisifyAll(sheetInfo);

                    sheetInfoAync.getRowsAsync({
                        offset: 1
                    }).then(rows => {
                        let sheetName = _string.camelize(_string.slugify(_string.trim(sheetInfo.title)));
                        let rowData = [];
                        rows.forEach(row => {
                            // Remove unused data
                            delete row._xml;
                            delete row.id;
                            delete row['app:edited'];
                            delete row._links;

                            rowData.push(row);
                        });

                        result.data[sheetName] = rowData;
                        resolve();
                    }).catch(error => {
                        reject(error);
                    });

                }));
            });

            return Promise.all(sheetPromises);
        }).then(() => {
            const sheetContent = {};
            sheetContent[sheetName] = result;
            return Promise.resolve(sheetContent);
        });
    }

    const sheetPromises = [];
    const sheets = config.data.sheets;

    for (const sheet in sheets) {
        sheetPromises.push(loadSheet(sheets[sheet], sheet));
    }
    
    return Promise.all(sheetPromises).then((sheetContents) => {
        const result = {};
        sheetContents.forEach(sheetContent => {
            _.extend(result, sheetContent);
        });
        return Promise.resolve(result);
    });
}

function load() {
    const CACHE_KEY = 'GOOGLE_SHEET_CACHE';
    let finelResult = memCache.get(CACHE_KEY) || undefined;

    if (_.isUndefined(finelResult)) {
        const result = { googleSheet: undefined, excel: undefined };

        // Load Google spread sheet data
        loadFromGoogleSheet().then((rawSheetData) => {
            result.googleSheet = rawSheetData;
        });

        // Load local ./data folder's Excel files(.xlsx)
        result.excel = loadFromExcel('./data', ['.xlsx']);

        deasync.loopWhile(() => { 
            if (!(!_.isUndefined(result.googleSheet) && !_.isUndefined(result.excel))) {
                return true;
            } else {
                finelResult = result;
                return false;
            } 
        });
    }

    memCache.put(CACHE_KEY, finelResult);
    return finelResult;
}

module.exports = { load };

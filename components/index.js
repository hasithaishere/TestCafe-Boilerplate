/**
 * @file Class make the entry to all the components. Components are reusable entities which are re-used in entire
 * project.
 * @author Hasitha Gamage
 */
'use strict';

const helpers = require('require-all')({
    dirname     :  __dirname,
    filter      :  /(.+Component)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

const coreHelpers = require('require-all')({
    dirname     :  `${__dirname}/core`,
    filter      :  /(.+Component)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

helpers.core = coreHelpers;

module.exports = helpers;
/**
 * @file Class make the entry to all the Helper classes.
 * @author Hasitha Gamage
 */
'use strict';

// Require all Helper classes in Helper folder
const helpers = require('require-all')({
    dirname     :  __dirname,
    filter      :  /(.+Helper)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

module.exports = helpers;
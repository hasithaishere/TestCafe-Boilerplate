/**
 * @file Class make the entry to all the UI Objects, this support YAML and JSON based UI Objects.
 * @author Hasitha Gamage
 */
'use strict';

import requireYml from 'require-yml';

const content = requireYml('./uiObjects');
delete content.index;

module.exports = content;
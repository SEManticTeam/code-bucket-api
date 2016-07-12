'use strict';

const multer = require('multer');
const storage = multer.memoryStorage(); // don't do this in production code

module.exports = multer({ storage });

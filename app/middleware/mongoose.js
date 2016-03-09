'use strict';

const mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/express-api';
mongoose.Promise = global.Promise;
mongoose.connect(uri);

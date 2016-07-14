'use strict';

const mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI || 'mongodb://SEMantic:mhshec3@ds015325.mlab.com:15325/hackstash';

mongoose.Promise = global.Promise;
mongoose.connect(uri);

module.exports = mongoose;

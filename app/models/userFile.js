'use strict';

const mongoose = require('mongoose');

const userFileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  storageLink: {
    type: String, // can eventually be an array
    required: true,
    unique: true
  },
  tags: {
    content: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    required: false
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  // toJSON: { virtuals: true },
});

const UserFile = mongoose.model('UserFile', userFileSchema);

module.exports = UserFile;

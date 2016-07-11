'use strict';

const mongoose = require('mongoose');

const userFileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  storageLinks: [{
    type: String,
    required: true,
    unique: true
  }],
  tags: [{
    // content: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    type: String,
    required: false
  }],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

userFileSchema.virtual('activity').get(function activity() {
  return this.storageLinks.links.length;
});

const UserFile = mongoose.model('UserFile', userFileSchema);

module.exports = UserFile;

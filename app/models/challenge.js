'use strict';

const mongoose = require('mongoose');
const UserFiles = require('./userFile.js');

const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [{
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

challengeSchema.virtual('submissionCount').get(function submissionCount() {
  return UserFiles.find({ "_challenge._id": this._id }).count();
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;

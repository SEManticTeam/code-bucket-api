'use strict';

const mongoose = require('mongoose');

const Submission = require('./submission.js');

const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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

// challengeSchema.virtual('submissions').get(function submissions() {
//   return Submission.find({_challenge: this._id}).count();
// });

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;

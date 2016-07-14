'use strict';

const mongoose = require('mongoose');

// const Submission = require('./submission.js');
//
// const User = require('./user.js');

const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  submissionCount: {
    type: Number,
    required: false
  },
}, {
  timestamps: true,
  // toJSON: { virtuals: true },
  // toObject: { getters: true, setters: true },
});

// challengeSchema.virtual('submissions').get(function submissions() {
//   return Submission.count({_challenge: this._id});
// });

// challengeSchema.virtual('userNamer').set(function() {
//   User.findById(this._owner, function(err, found) {
//     return found.givenName + ' ' + found.surname;
//   });
// });

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;

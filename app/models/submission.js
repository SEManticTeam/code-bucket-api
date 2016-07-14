'use strict';

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  ownerName: {
    type: String,
  },
  challengeName: {
    type: String,
    required: false
  },
  comment: {
    type: String,
    required: false
  },
  location: {
    type: String, // can eventually be an array
    required: true,
    unique: true
  },
  tags: [{
    type: String,
    required: false
  }],
  pass: {
    type: Boolean
  },
  graded: {
    type: Boolean,
    default: false,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  _challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: false,
  },
  _challengeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: false,
  }
}, {
  timestamps: true,
  // toJSON: { virtuals: true },
});

// submissionSchema.virtual('versions').get(function versions() {
//   return this.locations.length;
// });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;

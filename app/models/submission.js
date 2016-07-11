'use strict';

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  locations: [{
    type: String,
    required: true,
    unique: true
  }],
  pass: {
    type: Boolean,
  },
  graded: {
    type: Boolean,
    default: false,
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
  _challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

submissionSchema.virtual('versions').get(function versions() {
  return this.locations.length;
});

const Submission = mongoose.model('Submissions', submissionSchema);

module.exports = Submission;

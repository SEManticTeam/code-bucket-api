'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Submission = models.submission;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Submission.find()
    .then(submissions => res.json({ submissions }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Submission.findById(req.params.id)
    .then(submission => submission ? res.json({ submission }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let submission = Object.assign(req.body.submission, {
    _owner: req.currentUser._id,
  });
  Submission.create(submission)
  .then(submission => res.json({ submission }))
  .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Submission.findOne(search)
    .then(submission => {
      if (!submission) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return submission.update(req.body.submission)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Submission.findOne(search)
    .then(submission => {
      if (!submission) {
        return next();
      }

      return submission.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
], });

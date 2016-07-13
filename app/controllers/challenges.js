'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Challenge = models.challenge;
const Submission = models.submission;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Challenge.find()
    .then(challenges => res.json({ challenges }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Challenge.findById(req.params.id)
    .then(challenge => challenge ? res.json({ challenge }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let reqChallenge = req.body.challenge;
  let challenge = {
                    name: reqChallenge.name,
                    language: reqChallenge.language,
                    description: reqChallenge.description,
                    _owner: req.currentUser._id,
                    ownerName: req.currentUser.givenName + ' ' + req.currentUser.surname,
                    submissionCount: 0,
                  };

  Challenge.create(challenge)
  .then( (challenge) => {
    res.json({ challenge });
  })
  .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Challenge.findOne(search)
    .then(challenge => {
      if (!challenge) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return challenge.update(req.body.challenge)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Challenge.findOne(search)
    .then(challenge => {
      if (!challenge) {
        return next();
      }

      return challenge.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const getUserChallenges = (req, res, next) => {
  Challenge.find({ _owner: req.currentUser._id })
    .then(challenges => res.json({ challenges }))
    .catch(err => next(err));
};

const getChallengeSubmissions = (req, res, next) => {
  Submission.find({_challenge: req.params.id})
    .then(submissions => res.json({ submissions }))
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  getUserChallenges,
  getChallengeSubmissions,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
], });

'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Challenge = models.challenge;

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
  console.log('req.body: ', req.body);
  let reqChallenge = req.body.challenge;
  let challenge = {
                    name: reqChallenge.name,
                    language: reqChallenge.language,
                    description: reqChallenge.description,
                    _owner: req.currentUser._id
                  };

  Challenge.create(challenge)
  .then( (challenge) => {
    console.log('challenge: ', challenge);
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

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
], });

'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Example = models.example;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Example.find()
    .then(examples => res.json({ examples }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Example.findById(req.params.id)
    .then(example => example ? res.json({ example }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  Example.create(req.body.example)
    .then(example => res.json({ example }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  //let search = {_id: req.params.id, owner: req.current_user.id};
  //Example.findOneAndUpdate(search, reg.body.example)
  Example.findById(req.params.id)
    .then(example => {
      if (!example) {
        return next();
      }

      return example.update(req.body.example)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  Example.findById(req.params.id)
    .then(example => {
      if (!example) {
        return next();
      }

      return example.remove()
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

'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const UserFile = models.userFile;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  UserFile.find()
    .then(userFiles => res.json({ userFiles }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  UserFile.findById(req.params.id)
    .then(userFile => userFile ? res.json({ userFile }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let userFile = Object.assign(req.body.userFile, {
    _owner: req.currentUser._id,
  });
  UserFile.create(userFile)
  .then(userFile => res.json({ userFile }))
  .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  UserFile.findOne(search)
    .then(userFile => {
      if (!userFile) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return userFile.update(req.body.userFile)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  UserFile.findOne(search)
    .then(userFile => {
      if (!userFile) {
        return next();
      }

      return userFile.remove()
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

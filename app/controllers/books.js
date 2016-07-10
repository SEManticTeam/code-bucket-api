'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Book = models.book;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Book.find()
    .then(books => res.json({ books }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => book ? res.json({ book }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let book = Object.assign(req.body.book, {
    _owner: req.currentUser._id,
  });
  Book.create(book)
  .then(book => res.json({ book }))
  .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Book.findOne(search)
    .then(book => {
      if (!book) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return book.update(req.body.book)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Book.findOne(search)
    .then(book => {
      if (!book) {
        return next();
      }

      return book.remove()
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

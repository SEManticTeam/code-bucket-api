'use strict';

const controller = require('lib/wiring/controller');
const multer = require('app/middleware').multer;

const models = require('app/models');
const Submission = models.submission;

const uploader = require('lib/aws-s3-upload');

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
  uploader.awsUpload(req.file.buffer)
  .then((response) => {
    //return Object.assign({ // probably necessary for auth attaching user id
    return {
      _challenge: req.body.upload.challenge_id,
      location: response.Location,
      challengeName: req.body.upload.challengeName,
    };
  })
  .then((upload) => {
    return Submission.create(upload);
  })
  .then(upload => res.json({ upload }))
  .catch(err => next(err));
};

// const update = (req, res, next) => {
//   let search = { _id: req.params.id, _owner: req.currentUser._id };
//   Submission.findOne(search)
//     .then(submission => {
//       if (!submission) {
//         return next();
//       }
//
//       delete req.body._owner;  // disallow owner reassignment.
//       return submission.update(req.body.submission)
//         .then(() => res.sendStatus(200));
//     })
//     .catch(err => next(err));
// };
//
// const destroy = (req, res, next) => {
//   let search = { _id: req.params.id, _owner: req.currentUser._id };
//   Submission.findOne(search)
//     .then(submission => {
//       if (!submission) {
//         return next();
//       }
//
//       return submission.remove()
//         .then(() => res.sendStatus(200));
//     })
//     .catch(err => next(err));
// };

const getUserSubmissions = (req, res, next) => {
  Submission.find({ _owner: req.currentUser._id })
    .then(submissions => res.json({ submissions }))
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  // update,
  // destroy,
  getUserSubmissions,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
  { method: multer.single('upload[file]'), only: ['create'] },
], });

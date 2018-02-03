'use strict';

const Rider = require('../model/rider.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');

module.exports = function (router) {
  router.route('/rider/:_id')
    .get((req, res) => {
      if(req.params._id) {
        return Rider.findById(req.prams._id)
          .then(rider => res.status(200).json(rider))
          .catch(err=> errorHandler(err, res)); //respond with an error if any!
      }
      return Rider.find()
        .then(rider => rider.map(a => ({_id: a._id, name: a.name})))
        .then(rider => res.status(200).json(rider))
        .catch(err => errorHandler(err, res));
    })
    .post(bodyParser, (req, res) => {
      new Rider(req.body).save()
        .then(rider => res.status(201).json(rider))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      return Rider.findOneAndUpdate(req.paranms._id, req.body, {upsert: true, runValidators: true})
        .then(() => res.sendStatus(204))
        .catch(err => (err, res));
    })
    .delete((req, res) => {
      return Rider.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};

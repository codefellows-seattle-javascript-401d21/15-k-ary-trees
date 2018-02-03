'use strict';

const Bike = require('../model/bike.js');
const bodyParser = require('body-parser').json(); //stringify on all request of body content
const errorHandler = require('../lib/error-handler.js'); //handles response status errors

module.exports = function (router) { //export for other files to utilize
  router.route('/bike/:_id?') //self expanatory
    .get((req, res) => { //get... request and response

      if(req.params._id) { //if an ID exists...
        return Bike.findById(req.params._id) //grab it by the ID
          .populate('rider') //populating by string identifier
          .then(bike => res.status(200).json(bike)) //respond with a status code and stringify data
          .catch(err => (err, res)); //catch any errors on response
      }
      Bike.find() //self explanatory...
        .then(bike => bike.map(bike => bike._id)) //filter through data and find bike by unique ID
        .then(bike => res.status(200).json(bike)) //parsifyishly
        .catch(err => (err, res)); //response with an error if any
    })

    .post(bodyParser, (req, res) => {
      new Bike(req.body).save() //request the body and save to the database
        .then(bike => res.status(201).json(bike)) //
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => { //update!
      Bike.findOneAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true}) //grab content by ID and update data content(body)
        .then(() => res.sendStatus(204))
        .catch(err => erorHandler(err, res)); //request error handler if server status is not acduarate
    })
    .delete((req, res) => { //bye bye
      Bike.findById(req.params._id) //grab by its ID
        .then (bike => bike.remove()) //flush down the toilet
        .then(() => res.sendStatus(204)) 
        .catch(err => (res, err));
    });
};
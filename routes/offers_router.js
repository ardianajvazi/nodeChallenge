'use strict'
const express = require('express');
const jsonParser = require('body-parser').json();
const Offers = require(__dirname + '/../models/offers');
const handleDBError = require(__dirname + '/../lib/handleDBError');

const offersRouter = module.exports = exports = express.Router();

offersRouter.post('/offers', jsonParser, (req, res) => {
  var newOffer = new Offers(req.body);
  newOffer.save((err, data) => {
    if(err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

offersRouter.delete('/offers/:id', (req, res) => {
  Offers.remove({_id: req.params.id}, err => {
    if(err) return handleDBError(err, res);
    res.status(200).json({ msg: 'successfully deleted'});
  });
});

offersRouter.get('/offers/:limit', (req, res) => {
  Offers.find({}, (err, data) => {
    if(err) return handleDBError(err, res);
    res.status(200).json(data);
  }).sort({_id:-1}).limit(5)
});

offersRouter.put('/offers/:id', jsonParser, (req, res) => {
  var offerData = req.body;
  delete offerData._id;
  Offers.update({_id: req.params.id}, offerData, (err) => {
    if(err) return handleDBError(err, res);
    res.status(200).json({ msg: 'successfully updated'});
  });
});

'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/offers_app_test';
const server = require(__dirname + '/../server');
const Offers = require(__dirname + '/../models/offers');

var origin = 'localhost:5000';

describe('The Offers API', () => {
  it('Should be able to GET all our offers', (done) => {
    chai.request(origin)
    .get('/api/offers/:limit')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('Should be able to CREATE a new offer', (done) => {
    chai.request(origin)
    .post('/api/offers')
    .send({name: 'test offer', amount: '1000', maximumRides: '5'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('test offer');
      expect(res.body.amount).to.eql('1000');
      expect(res.body.maximumRides).to.eql('5');
      expect(res.body).to.have.property('_id');
      done();
    })
  });
  describe('Request that requires an offer to be in the dataBase', () => {
    beforeEach((done) => {
      Offers.create({name: 'test offer'}, (err, data) => {
        this.testOffer = data;
        done();
      });
    });

    it('Should be able to update an offer', (done) => {
      chai.request(origin)
      .put('/api/offers/' + this.testOffer._id)
      .send({name: 'updated offer name'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('successfully updated');
        done();
      });
    });

    it('Should be able to delete a offer', (done) => {
      chai.request(origin)
      .delete('/api/offers/' + this.testOffer._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('successfully deleted');
        done();
      });
    });

  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});

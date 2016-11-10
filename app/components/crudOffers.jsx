'use strict';

import React from 'react';
import ListOffers from './listOffers.jsx';
import superAgent from 'superagent';


export default React.createClass({

  getInitialState() {
    return {
      data: [],
      newOffer: {}
    };
  },

  componentWillMount() {
    superAgent.get('http://localhost:5000/api/offers/:limit')
    .end((err, res) => {
      if (err) return console.log(err);
      this.setState({ data: res.body });
    });
  },

  handleChange(index, key, newValue) {
    let newState = this.state;
    newState.data[index][key] = newValue;
    this.setState(newState);
  },

  handleDelete(id) {
    let newState = {
      data: this.state.data.filter((item) => item._id !== id)
    };
    this.setState(newState);
  },

  handleNewOfferChange(event, key) {
    let newState = {
      ...this.state,
      newOffer: {
        ...this.state.newOffer,
        [key]: event.target.value
      }
    };
    this.setState(newState);
  },

  addOffer(event) {
    // event.preventDefault();
    superAgent.post('http://localhost:5000/api/offers')
    .send(this.state.newOffer)
    .end((err, res) => {
      if (err) return console.log(err);
      let newData = this.state.data;
      newData.push(res.body);
      this.setState({ data: newData });
    });
  },

  render() {
    const listOffers = this.state.data.map((itemData, idx) => {
      return <ListOffers name={itemData.name} amount={itemData.amount} maximumRides={itemData.maximumRides} id={itemData._id} key={idx} index={idx} handleChange={this.handleChange} handleDelete={this.handleDelete}/>;
    });

    return (
      <div className="row">
        <div className="well span6">
          <h1 className="title text-center">Create a New Offer</h1>
          <form ref="form" onSubmit={this.addOffer}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="form-control" value={this.state.newOffer.name} onChange={(event) => this.handleNewOfferChange(event, 'name')}></input>
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input type="text" className="form-control" value={this.state.newOffer.amount} onChange={(event) => this.handleNewOfferChange(event, 'amount')}></input>
            </div>
            <div className="form-group">
              <label>Max Rides:</label>
              <input type="text" className="form-control" value={this.state.newOffer.maximumRides} onChange={(event) => this.handleNewOfferChange(event, 'maximumRides')}></input>
            </div>
            <button type="submit" className="btn btn-info btn-lg btn-block glyphicon glyphicon-pencil">Submit</button>
          </form><br />
        </div>
        <div className="well span6">
          <h1 className="title text-center">List Of Offers</h1>
          {listOffers}
        </div>
      </div>
    );
  }
});

'use strict';

import React from 'react';
import superAgent from 'superagent';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    amount: React.PropTypes.string,
    maximumRides: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    index: React.PropTypes.number,
    handleDelete: React.PropTypes.func
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  toggleEdit() {
    this.setState({ editing: !this.state.editing });
  },

  handleChange(event, propName) {
    this.props.handleChange(this.props.index, propName, event.target.value);
  },

  handleSubmit(event) {
    event.preventDefault();
    superAgent.put('http://localhost:5000/api/offers/' + this.props.id)
    .send({
      _id: this.props.id,
      name: this.props.name,
      amount: this.props.amount,
      maximumRides: this.props.maximumRides
    })
    .end((err) => {
      if (err) return console.log(err);
      this.toggleEdit();
    });
  },

  handleDelete() {
    superAgent.delete('http://localhost:5000/api/offers/' + this.props.id)
    .end((err) => {
      if (err) return console.log(err);
      this.props.handleDelete(this.props.id);
    });
  },

  render() {
    let form;
      if (this.state.editing) {
        form = (
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="form-control" placeholder="Name"value={this.props.name} onChange={(event) => this.handleChange(event, 'name')}></input>
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input type="text" className="form-control" placeholder="Amount" value={this.props.amount} onChange={(event) => this.handleChange(event, 'amount')}></input>
            </div>
            <div className="form-group">
              <label>Maximum Rides:</label>
              <input type="text" className="form-control"  placeholder="Maximum Rides" value={this.props.maximumRides} onChange={(event) => this.handleChange(event, 'maximumRides')}></input>
            </div>
            <button type="submit" className="button is-primary glyphicon glyphicon-pencil">Submit</button>
          </form>
        );
      }
      else {
      form = null;
      }

    return (
      <ul className="list-group">
        <li className="list-group-item">
          <h5><span className="title is-3">Name:</span> <span className="subtitle is-4">{this.props.name}</span></h5><br />
          <h5><span className="title is-3">Amount:</span> <span className="subtitle is-4">{this.props.amount}</span></h5><br />
          <h5><span className="title is-3">Maximum Rides:</span> <span className="subtitle is-4">{this.props.maximumRides}</span></h5><br />
        </li>
        <li className="list-group-item">
          <button onClick={this.toggleEdit}>Edit</button>
          <button onClick={this.handleDelete}>Delete</button>
        </li>

        <li className="list-group-item">
          {form}
        </li>
      </ul>
    );
  }
});

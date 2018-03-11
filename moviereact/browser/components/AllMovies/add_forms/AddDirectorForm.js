import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { fetchRoot } from "../../../config";

class AddDirectorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value) {
      axios
        .post(`${fetchRoot}/director`, {
          // No need to use a fetchRoot config variable. You can just post to /api/director and it will work. The root will be assumed to be the current domain
          name: this.state.value
        })
        .catch(console.log);
      this.props.handleCloseModal();
    }
  }

  render() {
    return (
      <div className="modal-container">
        <form onSubmit={this.handleSubmit} method="post">
          <h2 className="mint">New Director</h2>
          <div className="form-group">
            <label htmlFor="name" className="mt-2 col-form-label-lg">
              <strong>Director Name:</strong>
            </label>
            <input
              type="input"
              className="form-control form-control-lg"
              id="name"
              name="name"
              placeholder="e.g. Robert Altman"
              autoComplete="off"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary movie-btn btn-lg mt-2" action="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddDirectorForm.propTypes = {
  handleCloseModal: PropTypes.func
};

export { AddDirectorForm as default };

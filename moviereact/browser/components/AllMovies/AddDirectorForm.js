import React from 'react';

class AddDirectorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <form action="/api/director" method="post">
        <div className="form-group">
            <label htmlFor="name" className="mt-2"><strong>Director Name:</strong></label>
            <input
              type="input"
              className="form-control"
              id="name"
              name="name"
              placeholder="e.g. Robert Altman"
              autoComplete="off"
              value={this.state.value}
              onChange={this.handleChange}
            />
        </div>
        <div className="form-group text-right">
            <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
              Submit
            </button>
        </div>
      </form>
    );
  }
}

export { AddDirectorForm as default };

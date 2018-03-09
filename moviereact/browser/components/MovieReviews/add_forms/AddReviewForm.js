import React from 'react';
import PropTypes from 'prop-types';

const initialState = { stars: '1', comment: '' };

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  submit(e) {
    e.preventDefault();
    const { stars, comment } = this.state;
    if (stars && comment) {
      this.props.handleSubmit({ stars, comment });
    }
  }

  render() {
    const { username } = this.props.session;
    const { stars, comment } = this.state;
    return (
      <div className="modal-container">
        <form onSubmit={this.submit}>
          <h2 className="mint">Add Review</h2>
          <div className="form-group">
              <label htmlFor="user" className="mt-2"><strong>{`${username}'s Rating:`}</strong></label>
              <select
                name="stars"
                value={stars}
                onChange={this.handleChange}
                className="form-control"
              >
                  <option value={1}>1 {'★'.repeat(1)}</option>
                  <option value={2}>2 {'★'.repeat(2)}</option>
                  <option value={3}>3 {'★'.repeat(3)}</option>
                  <option value={4}>4 {'★'.repeat(4)}</option>
                  <option value={5}>5 {'★'.repeat(5)}</option>
              </select>
          </div>
          <div className="form-group">
              <label htmlFor="comment" className="mt-2"><strong>Review:</strong></label>
              <textarea
                name="comment"
                value={comment}
                rows="3"
                placeholder="What did you think?"
                onChange={this.handleChange}
                className="form-control"
              />
          </div>
          <div className="form-group">
              <button type="submit" className="btn btn-primary movie-btn mt-2" action="submit">
                Submit
              </button>
          </div>
        </form>
      </div>
    );
  }
}

AddReviewForm.propTypes = {
  session: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export { AddReviewForm as default };

import React from 'react';
import PropTypes from 'prop-types';

class AddReviewForm extends React.Component {
  render() {
    const { username } = this.props.session;
    const {
      stars, comment, handleFormSubmit, handleFormChange,
    } = this.props;
    return (
      <div className="modal-container">
        <form onSubmit={handleFormSubmit} method="post">
          <div className="form-group">
              <label htmlFor="user" className="mt-2"><strong>{`${username}'s Rating:`}</strong></label>
              <select
                value={stars}
                onChange={handleFormChange}
                className="form-control"
                id="stars"
                name="stars"
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
                value={comment}
                onChange={handleFormChange}
                className="form-control"
                id="comment"
                name="comment"
                rows="3"
                placeholder="What did you think?"
              />
          </div>
          <div className="form-group text-right">
              <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
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
  movie: PropTypes.object,
  stars: PropTypes.number,
  comment: PropTypes.string,
  handleFormSubmit: PropTypes.func,
  handleFormChange: PropTypes.func,
};

export { AddReviewForm as default };

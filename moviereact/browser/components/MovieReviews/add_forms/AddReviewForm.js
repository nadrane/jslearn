import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { fetchRoot } from '../../../config';

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      stars: 1,
      comment: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  // original location of form submit handler
  handleSubmit(e) {
    this.props.mySubmit(e);
    // e.preventDefault();
    // const { id: movieId } = this.props.movie;
    // const { id: userId } = this.props.session;
    // axios.post(`${fetchRoot}/movies/film/${movieId}`, {
    //   stars: this.state.stars,
    //   comment: this.state.comment,
    //   movieId,
    //   userId,
    // });
    // this.setState({ redirect: true });
  }

  render() {
    const { id: movieId } = this.props.movie;
    if (this.state.redirect) {
      return <Redirect to={'/movies'} />;
    }
    const { username } = this.props.session;
    return (
      <form onSubmit={this.handleSubmit} method="post">
        <div className="form-group">
            <label htmlFor="user" className="mt-2"><strong>{`${username}'s Rating:`}</strong></label>
            <select
              value={this.state.stars}
              onChange={this.handleChange}
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
              value={this.state.comment}
              onChange={this.handleChange}
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
    );
  }
}

AddReviewForm.propTypes = {
  session: PropTypes.object,
  movie: PropTypes.object,
};

export { AddReviewForm as default };

import React from 'react';

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <form action="/movies/film/{{ movie.id }}" method="post">
        <div className="form-group">
            <label htmlFor="user" className="mt-2"><strong>Rating ★:</strong></label>
            <select defaultValue={1} className="form-control" id="stars" name="stars">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>{this.hi}</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="comment" className="mt-2"><strong>Review:</strong></label>
            <textarea className="form-control" id="comment" name="comment" rows="3"></textarea>
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

export { AddReviewForm as default };

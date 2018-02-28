import React from 'react';
import axios from 'axios';
import config from '../config';

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
            <select value={1} className="form-control" id="stars" name="stars">
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

class AddMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { directors: null };
  }

  componentDidMount() {
    axios.get(`${config.fetchRoot}/director`)
      .then((resp) => {
        this.setState({
          directors: resp.data.directors,
        });
      }).catch(e => console.log(e));
  }

  render() {
    const { directors } = this.state;
    if (directors) {
      const dropdownItems = directors.map(director =>
        (<option key={director.id} value={director.id}>{director.name}</option>));
      return (
        <form action="/api/movies" method="post">
          <div className="form-group">
            <label htmlFor="title" className="mt-2"><strong>Film title:</strong></label>
            <input
              type="input"
              className="form-control"
              id="title"
              name="title"
              placeholder="e.g. Gone with the Wind"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="year" className="mt-2"><strong>Year of release:</strong></label>
            <input
              type="input"
              className="form-control"
              id="year"
              name="year"
              placeholder="e.g. 1940"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="director" className="mt-2"><strong>Director:</strong></label>
            <select className="form-control" id="director" name="directorId">
                <option disabled>Select director</option>
                {dropdownItems}
            </select>
          </div>
          <div className="form-group text-right">
            <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
              Submit
            </button>
          </div>
        </form>
      );
    } return null;
  }
}

export { AddReviewForm, AddDirectorForm, AddMovieForm };

import React from 'react';
import axios from 'axios';
import config from '../../config';

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

export { AddMovieForm as default };

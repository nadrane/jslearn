import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';

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
    const {
      handleChange, handleSubmit, movieTitle, movieYear, dirSelect,
    } = this.props;
    const { directors } = this.state;
    if (directors) {
      const dropdownItems = directors.map(director =>
        (<option key={director.id} value={director.id}>{director.name}</option>));
      return (
        <div className="modal-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="mt-2"><strong>Film title:</strong></label>
              <input
                name="movieTitle"
                value={movieTitle}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Gone with the Wind"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="year" className="mt-2"><strong>Year of release:</strong></label>
              <input
                name="movieYear"
                value={movieYear}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 1940"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="director" className="mt-2"><strong>Director:</strong></label>
              <select
                value={dirSelect}
                onChange={handleChange}
                className="form-control"
                name="dirSelect"
              >
                  <option value={-1} disabled>Select director</option>
                  {dropdownItems}
              </select>
            </div>
            <div className="form-group text-right">
              <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    } return null;
  }
}

AddMovieForm.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  movieTitle: PropTypes.string,
  movieYear: PropTypes.number,
  dirSelect: PropTypes.number,
  session: PropTypes.object,
};

export { AddMovieForm as default };

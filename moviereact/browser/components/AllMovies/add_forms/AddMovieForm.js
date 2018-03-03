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
    const { directors } = this.state;
    if (directors) {
      const dropdownItems = directors.map(director =>
        (<option key={director.id} value={director.id}>{director.name}</option>));
      const {
        handleChange, handleSubmit, movieTitle, movieYear, dirSelect,
      } = this.props;
      return (
        <div className="modal-container">
          <form onSubmit={handleSubmit}>
            <h2 className="mint">New Movie</h2>
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
                <option value="-1" disabled>Select director</option>
                  {dropdownItems}
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary movie-btn mt-2" action="submit">
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
  movieYear: PropTypes.string,
  dirSelect: PropTypes.string,
  session: PropTypes.object,
};

export { AddMovieForm as default };

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../config';

// TODO: director list shouldn't be fetched in this component. Should be props from higher level
class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    const { title, year, directorId } = this.props;


    this.state = {
      directors: [],
      title: title || '',
      year: year || '',
      directorId: directorId || '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    axios.get(`${config.fetchRoot}/director`)
      .then((resp) => {
        this.setState({
          directors: resp.data.directors,
        });
      })
      .catch(e => console.log(e));
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  // I like that name my event handlers similarly. If you go with handleChange, maybe handleSubmit wouldn't be a bad idea
  submit(e) {
    e.preventDefault();
    const { title, year, directorId } = this.state;
    if (title && year && directorId) {
      this.props.handleSubmit({ title, year, directorId });
    }
  }

  render() {
    const {
      directors, title, year, directorId,
    } = this.state;
    return (
      <div className="modal-container">
        <form onSubmit={this.submit}>
          <h2 className="mint">New Movie</h2>
          <div className="form-group">
            <label htmlFor="title" className="mt-2"><strong>Film title:</strong></label>
            <input
              name="title"
              value={title}
              onChange={this.handleChange}
              className="form-control"
              placeholder="e.g. Gone with the Wind"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="year" className="mt-2"><strong>Year of release:</strong></label>
            <input
              name="year"
              value={year}
              onChange={this.handleChange}
              className="form-control"
              placeholder="e.g. 1940"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="director" className="mt-2"><strong>Director:</strong></label>
            <select
              name="directorId"
              value={directorId}
              onChange={this.handleChange}
              className="form-control"
            >
              <option value=''>Select director</option>
              {directors.map(director => (
                <option key={director.id} value={director.id}>{director.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            {/* If it's possible for a submission to be rejected (because some things are not filled out), then you should disable the button if form isn't valid. Use the html disabled attribute */}
            <button type="submit" className="btn btn-primary movie-btn mt-2" action="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

MovieForm.propTypes = {
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
  year: PropTypes.string,
  directorId: PropTypes.string,
};

export { MovieForm as default };

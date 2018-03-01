import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchRoot } from '../../config';

// components
import MovieReviewsPanel from './MovieReviewsPanel';
import MovieReviewsTable from './MovieReviewsTable';
import AddReviewModal from './add_forms/AddReviewModal';

class MovieReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: null,
      rows: null,
      foo: 'bar',
    };
    this.mySubmit = this.mySubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/movies/film/${this.props.matchId}`)
      .then((resp) => {
        const { data } = resp;
        this.setState({
          currentMovie: {
            id: data.movie.id,
            title: data.movie.title,
            director: data.movie.director,
            avg: data.avg,
          },
          rows: data.movie.reviews,
        });
      })
      .catch(console.log);
  }

  // just moved this up from form, might need to redirect from here.
  mySubmit(e) {
    e.preventDefault();
    this.setState({ foo: 'HEY' });
    // const { id: movieId } = this.props.movie;
    // const { id: userId } = this.props.session;
    axios.post(`${fetchRoot}/movies/film/11`, {
      stars: 4,
      comment: 'HEYWERAWERAWE',
      movieId: 11,
      userId: 1,
    })
      .then((resp) => {
        const { rows } = this.state;
        const newRow = resp.data;
        this.setState({ rows: [newRow].concat(rows) });
      })
      .catch(console.log);
    // this.setState({ redirect: true });
  }

  render() {
    const { session } = this.props;
    const { currentMovie, rows } = this.state;
    if (currentMovie && rows) {
      return (
        <div>
          <div className="container-fluid">
            <MovieReviewsPanel session={this.props.session} movie={this.state.currentMovie} />
            <MovieReviewsTable rows={this.state.rows} />
          </div>
          {session && <AddReviewModal mySubmit={this.mySubmit} movie={this.state.currentMovie} session={session} />}
        </div>
      );
    } return null;
  }
}

MovieReviewsPage.propTypes = {
  matchId: PropTypes.string,
  session: PropTypes.object,
};

export { MovieReviewsPage as default };

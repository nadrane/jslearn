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
    };
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
      .catch(e => console.log(e));
  }

  render() {
    const session = this.props;
    const { currentMovie, rows } = this.state;
    if (currentMovie && rows) {
      return (
        <div>
          <div className="container-fluid">
            <MovieReviewsPanel session={this.props.session} movie={this.state.currentMovie} />
            <MovieReviewsTable rows={this.state.rows} />
          </div>
          <AddReviewModal movie={this.state.currentMovie} userId={session ? session.id : null} />
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

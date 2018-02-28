import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchRoot } from '../../config';

// components
import MovieReviewsPanel from './MovieReviewsPanel';
import MovieReviewsTable from './MovieReviewsTable';

class MovieReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelData: null,
      rows: null,
    };
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/movies/film/${this.props.matchId}`)
      .then((resp) => {
        this.setState({
          panelData: resp.data,
          rows: resp.data.movie.reviews,
        });
      }).catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <MovieReviewsPanel session={this.props.session} panelData={this.state.panelData} />
          <MovieReviewsTable rows={this.state.rows} />
        </div>
      </div>
    );
  }
}

MovieReviewsPage.propTypes = {
  matchId: PropTypes.string,
  session: PropTypes.object,
};

export { MovieReviewsPage as default };

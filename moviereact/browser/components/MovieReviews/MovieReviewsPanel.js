import PropTypes from 'prop-types';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';

class MovieReviewsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
  }

  // in progress
  handleDeleteMovie(e) {
    e.target.blur();
    if (window.confirm('hi')) {
      this.setState({ redirect: true });
    }
  }

  render() {
    let adminControls;
    const {
      session, movie, avg, handleOpenModal,
    } = this.props;
    const dirLink = (
      <Link to={`/director/${movie.director.id}`}>{movie.director.name}</Link>
    );
    // in progress
    if (session && session.isAdmin) {
      adminControls = (
        <span>
          <button
              onClick={handleOpenModal}
              type="button"
              className="btn btn-secondary control-btn mx-2">
            Edit Movie
          </button>
          <button
              onClick={this.handleDeleteMovie}
              type="button"
              className="btn btn-danger control-btn mx-2">
            Delete Movie
          </button>
        </span>
      );
    }

    if (this.state.redirect) {
      return (<Redirect to='/movies'/>);
    }

    return (
      <Panel
        header={movie.title}
        panelInfo={(
          <PanelInfo
            stats={[
              ['Avg. Score', `${avg} ★`],
              ['Released', movie.year],
              ['Director', dirLink],
            ]}
            session={session}
            user={(
              <span>
                <button
                  onClick={handleOpenModal}
                  type="button"
                  className="btn movie-btn control-btn mx-2"
                >
                  + Add Review
                </button>
                {adminControls}
              </span>
            )}
          />
        )}
      />
    );
  }
}

MovieReviewsPanel.propTypes = {
  movie: PropTypes.object,
  avg: PropTypes.string,
  session: PropTypes.object,
  handleOpenModal: PropTypes.func,
  handleDeleteMovie: PropTypes.func,
};

export { MovieReviewsPanel as default };

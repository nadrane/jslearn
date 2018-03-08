import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactModal from 'react-modal';
import { fetchRoot, modalStyle } from '../../config';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';
import AddMovieForm from '../AllMovies/add_forms/AddMovieForm';

class MovieReviewsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      redirect: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
  }

  handleOpenModal(e) {
    e.target.blur();
    this.setState({ modal: true });
  }

  handleCloseModal() {
    this.setState({ modal: false });
  }

  handleDeleteMovie(e) {
    e.target.blur();
    if (window.confirm('Are you sure?')) {
      axios.delete(`${fetchRoot}/movies/film/${this.props.movie.id}`)
        .then(() => this.setState({ redirect: true }));
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
    if (session && session.isAdmin) {
      adminControls = (
        <span>
          <button
              onClick={this.handleOpenModal}
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
      <div>
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
        {session && (
            <ReactModal
              isOpen={this.state.modal}
              onRequestClose={this.handleCloseModal}
              ariaHideApp={false}
              style={modalStyle}
            >
              <AddMovieForm
                movieTitle={movie.title}
                movieYear={movie.year}
                dirSelect={movie.director.id}
              />
            </ReactModal>
          )}
      </div>
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

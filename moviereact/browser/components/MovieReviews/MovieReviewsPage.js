import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactModal from 'react-modal';
import { fetchRoot, avgStars, modalStyle } from '../../config';

// components
import MovieReviewsPanel from './MovieReviewsPanel';
import MovieReviewsTable from './MovieReviewsTable';
import AddReviewForm from './add_forms/AddReviewForm';
import MovieForm from '../MovieForm';
import Panel from '../Panel';

const initialState = {
  movie: null, // initialize as an empty object
  rows: null, // Naming. Also initialize it as an empty array
  showReviewModal: false,
  showEditMovieModal: false,
  err: null,
};

class MovieReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.handleMovieEditSubmit = this.handleMovieEditSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/movies/film/${this.props.matchId}`)
      .then((resp) => {
        const { movie } = resp.data;
        this.setState({
          movie,
          rows: movie.reviews,
        });
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 404 || status === 500) {
          this.setState({
            err: { header: 'Not found!', message: "That movie doesn't exist." },
          });
        }
      });
  }

  handleOpenModal(e) {
    e.target.blur();
    if (e.target.name === 'addReviewBtn') {
      this.setState({ showReviewModal: true });
    } else if (e.target.name === 'editMovieBtn') {
      this.setState({ showEditMovieModal: true });
    }
  }

  handleCloseModal() {
    this.setState({ showReviewModal: false, showEditMovieModal: false });
  }

  handleReviewSubmit(newReview) {
    const { id: movieId } = this.state.movie;
    const { id: userId } = this.props.session;
    // This route looks funny. movies/film is redundant.
    // a route to add a movie should just be /api/movies/:id
    axios.post(`${fetchRoot}/movies/film/${movieId}`, {
      stars: newReview.stars,
      comment: newReview.comment,
      movieId,
      userId,
    })
      .then(resp =>
        this.setState(prevState => ({ rows: [resp.data].concat(prevState.rows) })))
      .catch(console.log);
    this.handleCloseModal();
  }

  handleMovieEditSubmit(editedMovie) {
    this.handleCloseModal();
    const { id } = this.state.movie;
    axios.put(`${fetchRoot}/movies/film/${id}`, editedMovie)
      .then(resp => this.setState({ movie: resp.data }))
      .catch(console.log);
  }

  render() {
    const { session } = this.props;
    const {
      movie, rows, err, showReviewModal, showEditMovieModal,
    } = this.state;
    if (err) {
      return (<Panel header={err.header} message={err.message} />);
    }
    if (movie) {
      return (
        <div>
          <div className="container-fluid">
            <MovieReviewsPanel
              session={session}
              movie={movie}
              avg={avgStars(rows)} // This is the exact opposite of what you did before. Now you are computing on rendering as opposed to on storage (in state). I prefer this
              handleOpenModal={this.handleOpenModal}
            />
            <MovieReviewsTable rows={rows} />
          </div>
          {session && (
          <ReactModal
            isOpen={showReviewModal || showEditMovieModal}
            onRequestClose={this.handleCloseModal}
            ariaHideApp={false}
            style={modalStyle}
          >
            {showEditMovieModal && <MovieForm
              title={movie.title}
              year={movie.year}
              directorId={movie.directorId}
              handleSubmit={this.handleMovieEditSubmit}
            />}
            {showReviewModal && <AddReviewForm
              handleSubmit={this.handleReviewSubmit}
              session={session}
            />}
          </ReactModal>
          )}
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

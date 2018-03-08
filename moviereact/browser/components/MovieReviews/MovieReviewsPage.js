import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactModal from 'react-modal';
import { fetchRoot, avgStars, modalStyle } from '../../config';

// components
import MovieReviewsPanel from './MovieReviewsPanel';
import MovieReviewsTable from './MovieReviewsTable';
import AddReviewForm from './add_forms/AddReviewForm';
import AddMovieForm from '../AllMovies/add_forms/AddMovieForm';
import Panel from '../Panel';

const initialState = {
  movie: null,
  rows: null,
  stars: 1,
  comment: '',
  err: null,
  showReviewModal: false,
  showEditMovieModal: false,
};

class MovieReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.handleMovieEdit = this.handleMovieEdit.bind(this);
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

  handleReviewChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleReviewSubmit(e) {
    e.preventDefault();
    this.handleCloseModal();
    const { id: movieId } = this.state.movie;
    const { id: userId } = this.props.session;
    axios.post(`${fetchRoot}/movies/film/${movieId}`, {
      stars: this.state.stars,
      comment: this.state.comment,
      movieId,
      userId,
    })
      .then(resp =>
        this.setState((prevState) => {
          const rows = [resp.data].concat(prevState.rows);
          return {
            rows,
            stars: 1,
            comment: '',
          };
        }))
      .catch(console.log);
  }

  handleMovieEdit(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({

      movie: Object.assign({}, prevState.movie, { [name]: value }),
    }));
  }

  handleMovieEditSubmit(e) {
    e.preventDefault();
    this.handleCloseModal();
    const {
      id, title, year, directorId,
    } = this.state.movie;
    axios.put(`${fetchRoot}/movies/film/${id}`, {
      title,
      year,
      directorId,
    })
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
              avg={avgStars(rows)}
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
            {showEditMovieModal && <AddMovieForm
              title={movie.title}
              year={movie.year}
              directorId={movie.directorId}
              handleChange={this.handleMovieEdit}
              handleSubmit={this.handleMovieEditSubmit}
            />}
            {showReviewModal && <AddReviewForm
              handleFormChange={this.handleReviewChange}
              handleFormSubmit={this.handleReviewSubmit}
              session={session}
              movie={movie}
              stars={this.state.stars}
              comment={this.state.comment}
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

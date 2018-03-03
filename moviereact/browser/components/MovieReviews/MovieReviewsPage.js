import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactModal from 'react-modal';
import { fetchRoot, avgStars, modalStyle } from '../../config';

// components
import MovieReviewsPanel from './MovieReviewsPanel';
import MovieReviewsTable from './MovieReviewsTable';
import AddReviewForm from './add_forms/AddReviewForm';
import Panel from '../Panel';

class MovieReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      rows: null,
      stars: 1,
      comment: '',
      err: null,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/movies/film/${this.props.matchId}`)
      .then((resp) => {
        const { movie } = resp.data;
        this.setState({
          movie,
          rows: movie.reviews,
          modal: false,
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
    this.setState({ modal: true });
  }
  handleCloseModal() {
    this.setState({ modal: false });
  }

  handleFormChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
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

  render() {
    const { session } = this.props;
    const {
      movie, rows, modal, err,
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
              isOpen={modal}
              onRequestClose={this.handleCloseModal}
              ariaHideApp={false}
              style={modalStyle}
            >
              <AddReviewForm
                handleFormChange={this.handleFormChange}
                handleFormSubmit={this.handleFormSubmit}
                session={session}
                movie={movie}
                stars={this.state.stars}
                comment={this.state.comment}
              />
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

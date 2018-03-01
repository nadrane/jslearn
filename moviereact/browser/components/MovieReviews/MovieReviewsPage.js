import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactModal from 'react-modal';
import { fetchRoot } from '../../config';

// components
import MovieReviewsPanel from './MovieReviewsPanel';
import MovieReviewsTable from './MovieReviewsTable';
import AddReviewForm from './add_forms/AddReviewForm';

class MovieReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: null,
      rows: null,
      stars: 1,
      comment: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
            year: data.movie.year,
            avg: data.avg,
          },
          rows: data.movie.reviews,
          modal: false,
        });
      })
      .catch(console.log);
  }

  handleOpenModal(e) {
    e.target.blur();
    this.setState({ modal: true });
  }
  handleCloseModal() {
    this.setState({ modal: false });
  }

  handleFormChange(e) {
    const { value } = e.target;
    const { name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  // just moved this up from form, might need to redirect from here.
  handleFormSubmit(e) {
    e.preventDefault();
    this.handleCloseModal();
    const { id: movieId } = this.state.currentMovie;
    const { id: userId } = this.props.session;
    axios.post(`${fetchRoot}/movies/film/${movieId}`, {
      stars: this.state.stars,
      comment: this.state.comment,
      movieId,
      userId,
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
    const { currentMovie, rows, modal } = this.state;
    if (currentMovie && rows) {
      return (
        <div>
          <div className="container-fluid">
            <MovieReviewsPanel
              session={session}
              movie={currentMovie}
              modalTrigger={this.handleOpenModal}
            />
            <MovieReviewsTable rows={rows} />
          </div>
          <ReactModal
            isOpen={modal}
            onRequestClose={this.handleCloseModal}
            ariaHideApp={false}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, .5)',
              },
              content: {
                top: '10%',
                left: '25%',
                right: '25%',
                bottom: '30%',
                backgroundColor: '#E9F5FD',
                overflow: 'auto',
              },
            }}
          >
            <AddReviewForm
              handleFormChange={this.handleFormChange}
              handleFormSubmit={this.handleFormSubmit}
              session={session}
              movie={currentMovie}
              stars={this.state.stars}
              comment={this.state.comment}
            />
          </ReactModal>
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

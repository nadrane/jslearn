import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import axios from 'axios';
import { fetchRoot } from '../../config';

// components
import AllMoviesPanel from './AllMoviesPanel';
import AllMoviesTable from './AllMoviesTable';
import AddDirectorForm from './add_forms/AddDirectorForm';
import AddMovieForm from './add_forms/AddMovieForm';

class AllMoviesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
      showDirModal: false,
      showMovieModal: false,
      movieTitle: '',
      movieYear: '',
      dirSelect: -1,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/movies`)
      .then((resp) => {
        this.setState({
          rows: resp.data,
        });
      }).catch(e => console.log(e));
  }

  handleOpenModal(e) {
    e.target.blur();
    if (e.target.name === 'addDirectorBtn') {
      this.setState({ showDirModal: true });
    } else if (e.target.name === 'addMovieBtn') {
      this.setState({ showMovieModal: true });
    }
  }

  handleCloseModal() {
    this.setState({ showDirModal: false, showMovieModal: false });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const {
      movieTitle: title, movieYear: year, dirSelect: directorId,
    } = this.state;
    e.preventDefault();
    this.handleCloseModal();
    console.log(this.state.rows);
    axios.post(`${fetchRoot}/movies`, {
      title,
      year,
      directorId,
    })
      // .then(movie => console.log(movie));
      .then(movie => this.setState(prevState => ({
        rows: [movie.data].concat(prevState.rows).sort((a, b) => a.year - b.year),
        movieTitle: null,
        movieYear: null,
        dirSelect: -1,
      })))
      .catch(console.log);
  }

  render() {
    const { session } = this.props;
    const { rows, showDirModal, showMovieModal } = this.state;
    return (
      <div>
        <div className="container-fluid">
          <AllMoviesPanel session={session} handleOpenModal={this.handleOpenModal} />
          <AllMoviesTable rows={rows} />
        </div>
        {session && (
          <ReactModal
              isOpen={showDirModal || showMovieModal}
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
              {showDirModal && <AddDirectorForm handleCloseModal={this.handleCloseModal} />}
              {showMovieModal && <AddMovieForm
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                      movieTitle={this.state.movieTitle}
                      movieYear={this.state.movieYear}
                      dirSelect={this.state.dirSelect}
              />}
            </ReactModal>
        )}
      </div>
    );
  }
}

AllMoviesPage.propTypes = {
  session: PropTypes.object,
};

export { AllMoviesPage as default };

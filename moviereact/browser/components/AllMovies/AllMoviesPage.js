import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import axios from 'axios';
import { fetchRoot, modalStyle } from '../../config';

// components
import AllMoviesPanel from './AllMoviesPanel';
import AllMoviesTable from './AllMoviesTable';
import AddDirectorForm from './add_forms/AddDirectorForm';
import MovieForm from '../MovieForm';

class AllMoviesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
      showDirModal: false,
      showMovieModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/movies`)
      .then(resp => this.setState({
        rows: resp.data,
      }))
      .catch(console.log);
  }

  // TO-DO: each of these should have separate event handlers? (I think?)
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

  handleSubmit(newMovie) {
    axios.post(`${fetchRoot}/movies`, newMovie)
      .then((movie) => {
        this.setState(prevState => ({
          rows: [movie.data].concat(prevState.rows).sort((a, b) => a.year - b.year),
        }));
        return this.handleCloseModal();
      })
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
            style={modalStyle}
          >
            {showDirModal && <AddDirectorForm handleCloseModal={this.handleCloseModal} />}
            {showMovieModal && <MovieForm handleSubmit={this.handleSubmit} />}
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

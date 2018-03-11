import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import axios from "axios";
import { fetchRoot, modalStyle } from "../../config";

// components
import AllMoviesPanel from "./AllMoviesPanel";
import AllMoviesTable from "./AllMoviesTable";
import AddDirectorForm from "./add_forms/AddDirectorForm";
import MovieForm from "../MovieForm";

// This file should be your renamed index.jsx... (give your components a .jsx extension)
// In general, in any folder, the index file should contain the contents that will be exported from that folder. In the AllMovies folder, it's this particular component that counts. In the other folders, make the other Page components index files. The main advantages of calling it index.jsx are 2-fold
//1. It makes it super obvious to the reader what is exported from a folder (it's a good convention that given a folder, you should only import things from it's index file)
//2. It is an awesome starting file when reading someone else's code. It's basically the entry point to a given folder.

class AllMoviesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
      showDirModal: false,
      showMovieModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${fetchRoot}/movies`)
      .then(resp =>
        this.setState({
          // rows is a bad name. If these are movie sequelize instances, call it movies
          rows: resp.data
        })
      )
      .catch(console.log);
  }

  // TO-DO: each of these should have separate event handlers? (I think?)
  handleOpenModal(e) {
    e.target.blur();
    if (e.target.name === "addDirectorBtn") {
      this.setState({ showDirModal: true });
    } else if (e.target.name === "addMovieBtn") {
      this.setState({ showMovieModal: true });
    }
  }

  handleCloseModal() {
    this.setState({ showDirModal: false, showMovieModal: false });
  }

  handleSubmit(newMovie) {
    axios
      .post(`${fetchRoot}/movies`, newMovie)
      .then(movie => {
        this.setState(prevState => ({
          //This feels like an odd place to handle the sorting.
          // I would do it in render. I know that may feel less efficient, but in practice that probably won't matter, though it will reduce the chance of failure in the case that you forget to sort the state upon updating (note that we may introduce setState in another location). In order, format your data upon rendering
          rows: [movie.data].concat(prevState.rows).sort((a, b) => a.year - b.year)
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
          // I feel like these Modals add a lot of unnecessary complexity to your page components and add little value. We're now required to track all of this additional state. Why not offload the state management onto React Router, making to links that open the modal <Link> components that point to a separate page?
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
  session: PropTypes.object
};

export { AllMoviesPage as default };

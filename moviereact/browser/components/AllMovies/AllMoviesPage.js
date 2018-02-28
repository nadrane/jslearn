import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchRoot } from '../../config';

// components
import AllMoviesPanel from './AllMoviesPanel';
import AllMoviesTable from './AllMoviesTable';
import AddDirectorModal from './add_forms/AddDirectorModal';
import AddMovieModal from './add_forms/AddMovieModal';

class AllMoviesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
    };
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/movies`)
      .then((resp) => {
        this.setState({
          rows: resp.data.movies,
        });
      }).catch(e => console.log(e));
  }

  render() {
    const { session } = this.props;
    const { rows } = this.state;
    return (
      <div>
        <div className="container-fluid">
          <AllMoviesPanel session={session} />
          <AllMoviesTable rows={rows} />
        </div>
        {session && (
          <div>
            <AddDirectorModal />
            <AddMovieModal />
          </div>
        )}
      </div>
    );
  }
}

AllMoviesPage.propTypes = {
  session: PropTypes.object,
};

export { AllMoviesPage as default };

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchRoot } from '../../config';

// components
import DirectorPanel from './DirectorPanel';
import DirectorTable from './DirectorTable';
import Panel from '../Panel';

// Nick - mentioned initial state for something like director should be {} instead of null
// if I use {} here, on first render it tries to access director.movies.length, it crashes
// should I go with empty object then handle any checking in render functions?
class DirectorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // You should always initialize your state with the types they will assume after hitting the server. This will protect you from all kinds of access errors. I can maybe see an argument against initializing the error to {} but definitely not for the other 2.
      director: null, // Initialize as {}.
      rows: null, //same naming issues. Initialize as []
      err: null,  // Initialize as {}.
    };
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/director/${this.props.matchId}`)
      .then(resp => this.setState({
        director: resp.data.director,
        rows: resp.data.director.movies,
      }))
      .catch((err) => {
        const { status } = err.response;
        // This is not true... 500 is not a not found error
        // The error message should just come down from the server, and we can use that.
        if (status === 404 || status === 500) {
          this.setState({
            err: { header: 'Not found!', message: "That director doesn't exist." },
          });
        }
      });
  }

  render() {
    const { session } = this.props;
    const { director, rows, err } = this.state;
    if (err) {
      return (<Panel header={err.header} message={err.message} />);
    }
    if (director) {
      return (
        <div>
          <div className="container-fluid">
            <DirectorPanel
              session={session}
              director={director}
              count={director.movies.length}
            />
            <DirectorTable rows={rows} />
          </div>
        </div>
      );
    } return null;
  }
}

DirectorPage.propTypes = {
  matchId: PropTypes.string,
  session: PropTypes.object,
};

export { DirectorPage as default };

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchRoot } from '../../config';

// components
import DirectorPanel from './DirectorPanel';
import DirectorTable from './DirectorTable';
import Panel from '../Panel';

class DirectorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      director: null,
      rows: null,
      err: null,
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

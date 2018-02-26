import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import { Panel } from './panel';
import { Table } from './table';
import config from '../config';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelData: null,
      rows: null,
    };
  }

  componentDidMount() {
    let rows;
    let panelData;
    const { fetchPath, rowFormat } = this.props;
    let fetchUrl = `${config.fetchRoot}/${fetchPath}`;

    if (this.props.matchId) {
      fetchUrl = `${fetchUrl}/${this.props.matchId}`;
    }

    axios.get(fetchUrl)
      .then((resp) => {
        panelData = resp.data;
        rows = rowFormat(panelData);
        this.setState({
          rows,
          panelData,
        });
      }).catch(e => console.log(e));
  }

  render() {
    const { session, type } = this.props;
    const { panelData, rows } = this.state;
    if (panelData) {
      return (
        <div>
          <div className="container-fluid">
            <Panel
              panelData={panelData}
              type={type}
              session={session}
            />
            <Table
              rows={rows}
              type={type}
            />
          </div>
        </div>
      );
    } return null;
  }
}
Main.propTypes = {
  matchId: PropTypes.string,
  type: PropTypes.string,
  fetchPath: PropTypes.string,
  rowFormat: PropTypes.func,
  session: PropTypes.object,
};

const AllMoviesPage = props => (
  <Main
    {...config.allMovies}
    session={props.session}
  />
);
AllMoviesPage.propTypes = {
  session: PropTypes.object,
};

const MoviePage = props => (
  <Main
    {...config.movieReviews}
    matchId={props.matchId}
    session={props.session}
  />
);
MoviePage.propTypes = {
  matchId: PropTypes.string,
  session: PropTypes.object,
};

const UserPage = props => (
  <Main
    {...config.userReviews}
    matchId={props.matchId}
    session={props.session}
  />
);
UserPage.propTypes = {
  matchId: PropTypes.string,
  session: PropTypes.object,
};

const DirectorPage = props => (
  <Main
    {...config.director}
    matchId={props.matchId}
    session={props.session}
  />
);
DirectorPage.propTypes = {
  matchId: PropTypes.string,
  session: PropTypes.object,
};

export { AllMoviesPage, MoviePage, UserPage, DirectorPage };

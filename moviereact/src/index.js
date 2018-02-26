import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import config from './config';
import './index.css';

// components
import { AddReviewModal, AddDirectorModal, AddMovieModal } from './components/modal';
import { NavBar } from './components/layout';
import { Table } from './components/table';
import { Panel } from './components/panel';

// you can save props that are unrelated to visual rendering on this
// itself (i.e. on neither props nor state)

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
    const { type, session } = this.props;
    const { panelData, rows } = this.state;
    if (panelData && rows) {
      return (
        <div>
          <div className="container-fluid">
            <Panel
              data={panelData}
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        id: 1,
        username: 'david',
      },
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.setState({ session: null });
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar session={this.state.session} onLogout={this.handleLogout}/>
          <AddReviewModal />
          <AddDirectorModal />
          <AddMovieModal />
          <Switch>
            <Route exact path='/' render={() => (
              <Redirect to='/movies'/>
            )}/>
            <Route exact path='/movies' render={() => (
              <Main
                {...config.allMovies}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/movies/film/:id' render={({ match }) => (
              <Main
                {...config.movieReviews}
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/user/:id' render={({ match }) => (
              <Main
                {...config.userReviews}
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/director/:id' render={({ match }) => (
              <Main
                {...config.director}
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route render={() => (
              <Panel msg='404!' />
            )}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

Main.propTypes = {
  matchId: PropTypes.string,
  type: PropTypes.string,
  fetchPath: PropTypes.string,
  rowFormat: PropTypes.func,
  session: PropTypes.object,
};

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

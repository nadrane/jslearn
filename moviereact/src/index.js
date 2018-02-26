import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// components
import { AllMoviesPage, MoviePage, UserPage, DirectorPage } from './components/page';
import { AddReviewModal, AddDirectorModal, AddMovieModal } from './components/modal';
import { NavBar } from './components/layout';
import { Panel } from './components/panel';

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
              <AllMoviesPage
                session={this.state.session}
              />
            )}/>
            <Route exact path='/movies/film/:id' render={({ match }) => (
              <MoviePage
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/user/:id' render={({ match }) => (
              <UserPage
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/director/:id' render={({ match }) => (
              <DirectorPage
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

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

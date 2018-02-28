import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { fetchRoot } from './config';

// components
import NavBar from './components/NavBar';
import AllMoviesPage from './components/AllMovies/AllMoviesPage';
import DirectorPage from './components/Director/DirectorPage';
import MovieReviewsPage from './components/MovieReviews/MovieReviewsPage';
import UserReviewsPage from './components/UserReviews/UserReviewsPage';
import Panel from './components/Panel';
import AuthForm from './components/AuthForm/AuthForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null,
      authName: '',
      redirect: false,
    };
    this.handleAuthNameChange = this.handleAuthNameChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleAuthNameChange(value) {
    this.setState({ authName: value });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({ authName: '' });
    axios.post(`${fetchRoot}/auth/login`, {
      username: this.state.authName,
    })
      .then((resp) => {
        if (resp.data.id) {
          this.setState({
            redirect: true,
            session: {
              id: resp.data.id,
              username: resp.data.username,
            },
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleRegister(e) {
    e.preventDefault();
    this.setState({ authName: '' });
    axios.post(`${fetchRoot}/auth/register`, {
      username: this.state.authName,
    })
      .then((resp) => {
        if (resp.data.id) {
          this.setState({
            redirect: true,
            session: {
              id: resp.data.id,
              username: resp.data.username,
            },
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({ session: null });
  }

  render() {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return (
        <Router>
          <Redirect to='/movies'/>
        </Router>
      );
    }
    return (
      <Router>
        <div>
          <NavBar session={this.state.session} onLogout={this.handleLogout}/>
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
              <MovieReviewsPage
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/user/:id' render={({ match }) => (
              <UserReviewsPage
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
            <Route exact path='/auth/login' render={() => (
              <AuthForm
                handleLogin={this.handleLogin}
                authName={this.state.authName}
                handleAuthNameChange={this.handleAuthNameChange}
              />
            )}/>
            <Route exact path='/auth/register' render={() => (
              <AuthForm
                register={true}
                handleRegister={this.handleRegister}
                authName={this.state.authName}
                handleAuthNameChange={this.handleAuthNameChange}
              />
            )}/>
            <Route render={() => (
              <Panel header='404!' />
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
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
    };
    this.handleAuthNameChange = this.handleAuthNameChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/auth/session`)
      .then(session => this.setState({ session: session.data }))
      .catch(console.log);
  }

  handleAuthNameChange(e) {
    this.setState({ authName: e.target.value });
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
            session: {
              id: resp.data.id,
              username: resp.data.username,
              isAdmin: resp.data.isAdmin,
            },
          });
        }
      })
      .catch(console.log);
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
            session: {
              id: resp.data.id,
              username: resp.data.username,
              isAdmin: resp.data.isAdmin,
            },
          });
        }
      })
      .catch(console.log);
  }

  handleLogout(e) {
    e.preventDefault();
    axios.delete(`${fetchRoot}/auth/logout`)
      .then(() => this.setState({ session: null }));
  }

  render() {
    const { session, authName } = this.state;
    return (
      <Router>
        <div>
          <NavBar session={session} onLogout={this.handleLogout}/>
          <Switch>
            <Route exact path='/' render={() => (
              <Redirect to='/movies'/>
            )}/>
            <Route exact path='/movies' render={() => (
              <AllMoviesPage
                session={session}
              />
            )}/>
            <Route exact path='/movies/film/:id' render={({ match }) => (
              <MovieReviewsPage
                session={session}
                matchId={match.params.id}
              />
            )}/>
            <Route exact path='/user/:id' render={({ match }) => (
              <UserReviewsPage
                session={session}
                matchId={match.params.id}
              />
            )}/>
            <Route exact path='/director/:id' render={({ match }) => (
              <DirectorPage
                session={session}
                matchId={match.params.id}
              />
            )}/>
            <Route exact path='/auth/login' render={() => (
              <AuthForm
                session={session}
                authName={authName}
                handleAuthNameChange={this.handleAuthNameChange}
                handleLogin={this.handleLogin}
              />
            )}/>
            <Route exact path='/auth/register' render={() => (
              <AuthForm
                session={session}
                register={true}
                authName={authName}
                handleAuthNameChange={this.handleAuthNameChange}
                handleRegister={this.handleRegister}
              />
            )}/>
            <Route render={() => (
              <Panel header='404!' message="Page not found." />
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

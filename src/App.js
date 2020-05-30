import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import SideDrawer from './components/SideDrawer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import HistoryPage from './pages/HistoryPage';
import StarredPage from './pages/StarredPage';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import AuthenticationContext from './context/AuthenticationContext';
import './App.css';

const App = () => {
  const [state, setState] = useState({
    token: null,
    userId: null,
  });

  const login = (token, tokenExpiration, userId) => {
    setState({ token, userId });
  };

  const logout = () => {
    setState({ token: null, userId: null });
  };

  return (
    <Router>
      <div className="App">
        <AuthenticationContext.Provider
          value={{ token: state.token, userId: state.userId, login, logout }}
        >
          <Header>
            <SideDrawer />
          </Header>
          <Switch>
            {state.token && <Redirect from="/login" to="/" />}
            <Route path="/" exact component={HomePage} />
            {!state.token && <Route path="/login" exact component={LoginPage} />}
            {state.token && <Route path="/history" component={HistoryPage} />}
            {state.token && <Route path="/starred" component={StarredPage} />}
            <Route path="/help" component={HelpPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/about" component={AboutPage} />
          </Switch>
        </AuthenticationContext.Provider>
      </div>
    </Router>
  );
};

export default App;

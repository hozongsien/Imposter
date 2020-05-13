import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import SideDrawer from './components/SideDrawer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import HistoryPage from './pages/HistoryPage';
import StarredPage from './pages/StarredPage';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header>
          <SideDrawer />
        </Header>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/starred" component={StarredPage} />
          <Route path="/help" component={HelpPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

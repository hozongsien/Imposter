import React from 'react';
import './App.css';
import Header from './components/Header';
import SimpleTabs from './components/SimpleTabs';
import SideDrawer from './components/SideDrawer';
import PoseClassifier from './components/PoseClassifier';
import LearnTab from './components/LearnTab';

function App() {
  return (
    <div className="App">
      <Header>
        <SideDrawer />
      </Header>
      <SimpleTabs>
        <PoseClassifier />
        <LearnTab />
        <div>Tab Panel 3</div>
      </SimpleTabs>
    </div>
  );
}

export default App;

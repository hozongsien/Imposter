import React from 'react';
import Header from './components/Header';
import SimpleTabs from './components/SimpleTabs';
import SideDrawer from './components/SideDrawer';
import PoseClassifierTab from './components/PoseClassifierTab';
import LearnTab from './components/LearnTab';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header>
        <SideDrawer />
      </Header>
      <SimpleTabs>
        <div>Tab Panel 1</div>
        <LearnTab />
        <PoseClassifierTab />
      </SimpleTabs>
    </div>
  );
}

export default App;

import React from 'react';
import Header from './components/Header';
import SimpleTabs from './components/SimpleTabs';
import SideDrawer from './components/SideDrawer';
import ListView from './components/ListView';
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
        <ListView />
        <LearnTab />
        <PoseClassifierTab />
      </SimpleTabs>
    </div>
  );
}

export default App;

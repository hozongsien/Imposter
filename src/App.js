import React from 'react';
import Header from './components/Header';
import SimpleTabs from './components/SimpleTabs';
import SideDrawer from './components/SideDrawer';
import ListViewTab from './components/ListViewTab';
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
        <ListViewTab />
        <LearnTab />
        <PoseClassifierTab />
      </SimpleTabs>
    </div>
  );
}

export default App;

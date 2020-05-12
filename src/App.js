import React from 'react';
import Header from './components/Header';
import SimpleTabs from './components/SimpleTabs';
import SideDrawer from './components/SideDrawer';
import ListViewTab from './components/ListViewTab';
import PoseClassificationTab from './components/PoseClassificationTab';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header>
        <SideDrawer />
      </Header>
      <SimpleTabs>
        <ListViewTab />
        <PoseClassificationTab src="/videos/renegade.mp4" />
        <PoseClassificationTab isCamera />
      </SimpleTabs>
    </div>
  );
};

export default App;

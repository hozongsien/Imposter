import React from 'react';
import SimpleTabs from '../components/SimpleTabs';
import ListViewTab from '../components/ListViewTab';
import PoseClassificationTab from '../components/PoseClassificationTab';

const Home = () => {
  return (
    <SimpleTabs>
      <ListViewTab />
      <PoseClassificationTab src="/videos/renegade.mp4" />
      <PoseClassificationTab />
    </SimpleTabs>
  );
};

export default Home;

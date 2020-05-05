import React from "react";
import "./App.css";
import Header from "./components/Header";
import SimpleTabs from "./components/SimpleTabs";
import SideDrawer from "./components/SideDrawer";

function App() {
  return (
    <div className="App">
      <Header>
        <SideDrawer />
      </Header>
      <SimpleTabs>
        <div>Tab Panel 1</div>
        <div>Tab Panel 2</div>
        <div>Tab Panel 3</div>
      </SimpleTabs>
    </div>
  );
}

export default App;

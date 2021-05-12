import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {BrowserRouter } from "react-router-dom";

import AddCamera from "./AddCamera";
import DashboardPage from "./DashboardPage";
import LandingPage from "./LandingPage";
import Settings from "./Settings"

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
        {/*Render Different Component based on Route*/}
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/addcamera" component={AddCamera} />
        </BrowserRouter>
      </div>
    );
  }
}
//Export The Main Component
export default Main;

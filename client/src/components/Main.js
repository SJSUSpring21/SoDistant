import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import DashboardPage from './DashboardPage';
import LandingPage from './LandingPage';


//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/landing" component={LandingPage}/>
                <Route path="/dashboard" component={DashboardPage}/>               
               
            </div>
        )
    }
}
//Export The Main Component
export default Main;
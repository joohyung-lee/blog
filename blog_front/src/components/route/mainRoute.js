import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
//pages
import {Main,NotFound} from 'components/pages'
class MainRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path="/home" component={Main}/>
                <Route path="/motionlab" component={Main}/>
                <Route path="/projects" component={Main}/>
                <Route path="/review" component={Main}/> 
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

export default MainRoute;
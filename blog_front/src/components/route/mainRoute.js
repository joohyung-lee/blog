import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter,Route,Switch,Redirect} from 'react-router-dom'
import Main from 'containers/main';
//error
import {NotFound} from 'components/common/error';
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

MainRoute.propTypes = {

};

export default MainRoute;
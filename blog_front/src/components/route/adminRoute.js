import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
//pages
import {AdminMain,Write,NotFound} from 'components/pages'
class AdminRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/read" component={AdminMain}/>
                <Route exact path="/admin/write" component={Write}/>
                <Route exact path="/admin/write/:id" component={Write}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}
export default AdminRoute;
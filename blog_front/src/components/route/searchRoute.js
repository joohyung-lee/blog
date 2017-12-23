import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
//pages
import {Search,NotFound} from 'components/pages/'
class SearchRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/search/tags/:keyword" component={Search}/>
                <Route exact path="/search/:keyword" component={Search}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}
export default SearchRoute;
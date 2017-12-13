import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Search from 'containers/search';
//error
import {NotFound} from 'components/common/error';
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AnimatedSwitch} from 'react-router-transition/lib/react-router-transition';
import {spring} from 'react-motion'
import {withRouter,Route,Switch,Redirect} from 'react-router-dom'

//components
import {RedirectLogin} from 'components/loginPopup';
import {Profile} from 'containers/mypage';
import AdminMain from 'containers/admin/';
import Write from 'containers/admin/write';
import Posts from 'containers/admin/posts';
class RoutePage extends Component {
    render() {
        return (
            <AnimatedSwitch
                className="page-size"
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                mapStyles={styles => ({
                    opacity: styles.opacity,
                })}
            >    
                <Route exact path="/admin" component={AdminMain}/>
                <Route path="/admin/posts/:id" component={Posts}/>
                <Route exact path="/admin/write" component={Write}/>
                <Route path="/auth/loginPopup/:name" component={RedirectLogin}/>
                <Route path="/mypage/profile" component={Profile}/>
            </AnimatedSwitch> 
        );
    }
}

RoutePage.propTypes = {

};

export default RoutePage;
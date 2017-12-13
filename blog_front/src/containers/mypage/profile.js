import React, { Component } from 'react';

//components
import {ProfileContents} from 'components/mypage';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as httpRequest from 'redux/helper/httpRequest';
class Profile extends Component {  
    render() {
        const {user} = this.props;
        return (
            <ProfileContents
            displayName={user.userName}
            commentsData={[
                {displayName:'joohyung'},{}
            ]}
            />
        );
    }
}
export default connect(
    (state)=>({
        user:state.auth.toJS().profile.user,
    }),
    (dispatch)=>({
        get:bindActionCreators(httpRequest,dispatch),
    })
)(Profile);

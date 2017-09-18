import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginToast extends Component {
    render() {
        if(!this.props.open) {
            return null;
        }
        return(       
            <div className="login-toast">
                {this.props.children}
            </div>        
            );
        }
}

LoginToast.propTypes = {
    open:React.PropTypes.bool,
};

export default LoginToast;
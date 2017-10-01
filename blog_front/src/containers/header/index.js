import React, { Component, propTypes } from 'react';
import {Link} from 'react-router-dom';
//components
import {AuthLogin} from 'containers/auth'
//containers

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//css
import 'styles/header/index.scss';

class Header extends Component {
    constructor(props){
        super(props);     
    }
    render(){
        if(this.props.mode){
            return (
                <div className="global-nav">
                    <div className="logo">
                        <Link to='/'><h1>JOOMATION</h1></Link>
                        
                    </div>    
                    <div className="nav-contents">
                        <ul>
                            <li>About</li>
                        </ul>
                    </div>
                    <AuthLogin/>
                    
                </div>
            );
        }else{
            return <div></div>
        }
    }
};
Header.propTypes = {
    mode: React.PropTypes.bool,
};
Header.defaultProps={
    mode: true,
}
export default connect(
    (state)=>({

    }),
    (dispatch)=>({
     
    })
)(Header);
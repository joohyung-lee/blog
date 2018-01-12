import React, { Component } from 'react';
import {StaticLoading} from 'components/common/loading';
import urlConfig from 'config/urlConfig';
class RedirectLogin extends Component {
    componentDidMount(){
        switch (this.props.match.params.name) {
            case 'google':                  
                window.location.href=urlConfig.GOOGLE_LOGIN_URL;                    
                break;
            case 'facebook':                  
                window.location.href=urlConfig.FACEBOOK_LOGIN_URL;                    
                break;
            case 'github':                  
            window.location.href=urlConfig.GITHUB_LOGIN_URL;                    
            break;        
            case 'success':               
               window.close();            
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div className="login-state">
                <StaticLoading msg="Login Redirection..."/>
            </div>
        );
    }
}
export default RedirectLogin;
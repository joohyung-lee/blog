import React, { Component } from 'react';
import {TransitionMotion,spring} from 'react-motion';

//import containers
const springSetting = {stiffness: 300, damping: 30};
class RouterMotion extends Component {
    componentDidMount() {
    }
    componentWillReceiveProps(next){
    }
    //routeranimation
    getStyles(){
        if (!this.props.children) {
            return [];
            
        }
        return [
            {
                key: this.props.pathname,
                data: this.props.children,
                style: {
                    opacity:spring(1),
                },
            },
        ];
    }
    willEnter=()=>{
        return {
            opacity:0,
        }
    }
    willLeave=()=>{
        return{
            opacity:spring(0),
        }
    }
    didLeave=()=>{
    }

    render(){
        return(
            <TransitionMotion
                styles={this.getStyles()}
                willEnter={this.willEnter}
                willLeave={this.willLeave}
                didLeave={this.didLeave}              
            >
                {interpolatedStyles=>
                    <div className="detail">
                        {interpolatedStyles.map(config => {
                        return ( 
                            <div key={config.key} style={{
                                opacity:config.style.opacity,
                            }}>
                                <div>
                                    {config.data}
                                </div>   
                            </div>
                            )
                        })}
                    </div>
                }
            </TransitionMotion>
        )
    }
}
RouterMotion.defaultProps = {
  runOnMount: true,
};
export default RouterMotion;
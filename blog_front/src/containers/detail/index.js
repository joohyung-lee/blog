import React, { Component } from 'react';
import {TransitionMotion,spring} from 'react-motion';

//import containers
import Motionlab from 'containers/detail/motionlab';
const springSetting = {stiffness: 300, damping: 30};
class RouterAnimation extends Component {
    componentDidMount() {
    }
    componentWillReceiveProps(next){
    }
    //routeranimation
    getStyles(){
        if (!this.props.children) {
            return [];
            
        }
        if(this.props.pathname=='/'){
            return [];
        }
        return [
            {
                key: this.props.pathname,
                data: this.props.children,
                style: {
                    width:spring(window.innerWidth,springSetting),
                    height:spring(window.innerHeight*0.7,springSetting),
                    x:spring(0,springSetting),
                    y:spring(0,springSetting),
                    opacity:spring(1),
                    padding:spring(25),
                    borderRaidus:spring(0)
                },
            },
        ];
    }
    willEnter=()=>{
        return {
            width:this.props.eleW,
            height:this.props.eleH,
            x:this.props.eleX,
            y:this.props.eleY,
            opacity:0,
            padding:0,
            borderRaidus:8
        }
    }
    willLeave=()=>{
        return{
            width:spring(this.props.eleW,springSetting),
            height:spring(this.props.eleH,springSetting),
            x:spring(this.props.eleX,springSetting),
            y:spring(this.props.eleY,springSetting),
            opacity:spring(0),
            padding:spring(0),
            borderRaidus:spring(10)
        }
    }
    didLeave=()=>{
        console.log('didleave')
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
                                width:`${config.style.width}px`,
                                transform:`translate3d(${config.style.x}px,${config.style.y}px,0)`,
                            }}>
                                <div style={{
                                    width:`${config.style.width}px`,
                                    height:`${config.style.height}px`,
                                    background:`#fff`,
                                    padding:`${config.style.padding}px`,
                                    borderRadius:`${config.style.borderRaidus}px`,
                                    overflow:`hidden`
                                }}>
                                    <div className="iframe-wrap" style={{
                                        width:`100%`,
                                        height:`100%`
                                    }}>
                                        <iframe className="iframe-content" src="https://codepen.io/bennettfeely/full/BdWQoP/" 
                                            width={`100%`} height={`100%`} marginWidth="0" marginHeight="0" frameBorder="0"></iframe>
                                    </div>
                                </div>
                                <div style={{
                                    opacity:config.style.opacity
                                }}>
                                    <Motionlab/>
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
RouterAnimation.defaultProps = {
  runOnMount: true,
};
export default RouterAnimation;
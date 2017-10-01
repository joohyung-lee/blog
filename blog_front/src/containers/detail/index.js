import React, { Component } from 'react';
import {TransitionMotion,spring} from 'react-motion';

//import containers
const bounceSpring = {stiffness: 250, damping: 26};
const speedSpring = {stiffness: 170, damping: 26};
const slowSpring={stiffness: 100, damping: 30};
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
        let re = /(motionlab|project|review)/;
        let isCategory = re.test(this.props.pathname);
        if(isCategory){     
            const key=this.props.pathname;
            const children=this.props.children;
            return [
                {
                    key: key,
                    data: children,
                    style: {
                        width:spring(window.innerWidth,bounceSpring),
                        height:spring(window.innerHeight*0.7,bounceSpring),
                        x:spring(0,bounceSpring),
                        y:spring(0,bounceSpring),
                        opacity:1,
                        padding:spring(25),
                        borderRaidus:spring(0)
                    },
                },
            ];
            
        }else{
            return [];
        }
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
            width:spring(this.props.eleW,speedSpring),
            height:spring(this.props.eleH,speedSpring),
            x:spring(this.props.eleX,speedSpring),
            y:spring(this.props.eleY,speedSpring),
            opacity:spring(0,slowSpring),
            padding:spring(0),
            borderRaidus:spring(10)
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
                                width:`${config.style.width}px`,
                                transform:`translate3d(${config.style.x}px,${config.style.y}px,0)`,
                            }}>
                                <div style={{
                                    width:`${config.style.width}px`,
                                    height:`${config.style.height}px`,
                                    borderRadius:`${config.style.borderRaidus}px`,
                                    opacity:config.style.opacity,
                                    overflow:`hidden`,
                                    margin:`0 auto`
                                }}>
                                    <div className="iframe-wrap" style={{
                                        width:`100%`,
                                        height:`100%`,
                                        backgroundColor:'#ccc'
                                    }}>                                 
                                        {/* <iframe src="http://lab.cmiscm.com/wiper-android/" width="100%" height="100%" frameBorder="0"></iframe> */}
                                    </div>
                                </div>
                                <div style={{
                                    opacity:config.style.opacity
                                }}>
                                    motionlab
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
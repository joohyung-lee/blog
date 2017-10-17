import React, { Component } from 'react';
import {TransitionMotion,spring} from 'react-motion';

//import containers
const bounceSpring = {stiffness: 250, damping: 26};
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
        const key=this.props.children.props.location.pathname;
        const children=this.props.children;  
        let posts = /(posts)/;
        let isPosts = posts.test(this.props.children.props.location.pathname);
        console.log(this.props.children.props.path)
        if(isPosts){
            return [
                {
                    key: key,
                    data: children,
                    style: {
                        width:spring(window.innerWidth),
                        height:spring(window.innerHeight*0.7),
                        x:spring(0),
                        y:spring(0),
                        opacity:1,
                        padding:spring(25),
                        borderRaidus:spring(0)
                    },
                },
            ];
        }else{
            console.log('없다')
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
        console.log('떠난다')
        return{
            width:spring(window.innerWidth),
            height:spring(window.innerHeight*0.7),
            y:spring(window.innerHeight),
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
                                    
                                    </div>
                                </div>
                                <div style={{
                                    opacity:config.style.opacity
                                }}>
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
    
};
export default RouterMotion;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TransitionMotion,spring} from 'react-motion';
const springOption={
    enter:{
        stiffness: 120, 
        damping: 18
    },
    leave:{
        stiffness: 120, 
        damping: 18
    }
}
class AlertModal extends Component {
    componentDidUpdate(prevProps, prevState){
        if(prevProps.open !== this.props.open) {
            
          }    
    }
    getStyle=()=>{
        if(!this.props.open) {
            return[]
        }else{
            return[
                {
                    key: 'alertModal',
                    style:{
                        opacity:spring(1,springOption.enter)
                    },
                },

            ]
        }
    }
    willEnter=()=>{
        return {
            opacity:0
        }
    }
    willLeave=()=>{
        return{
            opacity:spring(0,springOption.leave)
        }
    }
    deArea=(e)=>{
        e.stopPropagation();
    }
    render() {      
        return(       
            <TransitionMotion
            styles={this.getStyle()}
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            didLeave={this.didLeave}              
        >
            {interpolatedStyles=>
            <div className="alert-container">
                {interpolatedStyles.map(config => {
                return(
                    <div className="modal-wrap"
                        key={config.key}
                        style={{
                            opacity:config.style.opacity
                        }}
                        onClick={this.props.close}
                    >
                        <div onClick={this.deArea} className="modal-box">
                            <div className="modal-title">
                                <h1>Alert</h1>
                                <p className="msg">{this.props.msg}</p>
                            </div>
                        </div>
                    </div>
                )
                })}
            </div>  
            }
            </TransitionMotion>      
            );
        }
}

AlertModal.propTypes = {
    open:PropTypes.bool,
};

export default AlertModal;
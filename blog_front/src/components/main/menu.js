import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Motion,TransitionMotion,spring} from 'react-motion';

import {Link} from 'react-router-dom';
class Menu extends Component {
   
    getStyle=(pev)=>{     
        if(this.props.open){
            return [
                {
                    key:'menu',
                    style:{
                        size:spring(0),
                        opacity:spring(1)
                    }
                }
            ]
        }else{
            return []
        }
    }
    willEnter=()=>{
        return{
            size:-300,
            opacity:0
        }
    }
    willLeave=()=>{
        return{
            size:spring(-300),
            opacity:spring(0)
        }
    }
    render() {
        return (
            <TransitionMotion
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            styles={this.getStyle()}
            >
            {style=>{
                return (
                    <div>
                    {style.map((config,i)=>{                 
                        return(
                            <div key={config.key} 
                                className="menu-list"
                                style={{
                                    left:`${config.style.size}px`,
                                    opacity:config.style.opacity
                                }}
                            >
                                <ul>
                                    <li>
                                        <Link className={(this.props.linkLoading)?"disabled":""} to="/motionlab">Motion Lab</Link>
                                    </li>
                                    <li>
                                        <Link className={(this.props.linkLoading)?"disabled":""}to="/projects">Projects</Link>
                                    </li>
                                    <li>
                                        <Link className={(this.props.linkLoading)?"disabled":""}to="/review">Review</Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
                )
            }}
            </TransitionMotion>
        );
    }
}

Menu.propTypes = {

};

export default Menu;
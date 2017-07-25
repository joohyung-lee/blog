import React, { Component } from 'react';
import {Motion,spring} from 'react-motion';
import './test.scss';
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items:[
                {key:'a',title:'title'},
                {key:'b',title:'title'},
                {key:'c',title:'title'},
                {key:'d',title:'title'},
                {key:'e',title:'title'},
                {key:'f',title:'title'},
                {key:'g',title:'title'},
                {key:'h',title:'title'},
                {key:'i',title:'title'},
                {key:'j',title:'title'}
            ],
            scroll:{
                isPressed:false,
                min:0,
                max:0,
                posX:0,
                relative:0,
                velocity:0,
            }
        }
    }
    componetnDidMount(){
        window.addEventListener('mousemove',this.handleMove);
        window.addEventListener('mouseup',this.handleUp);
        window.addEventListener('touchmove',this.touchMove);
        window.addEventListener('touchend',this.handleUp);


    }
    touchStart=(e)=>{
        this.handleMove(e.touches[0]);
    }
    touchMove=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        this.handleMove(e.touches[0]);
    }
    handleDown=(e)=>{
        this.setState({
            scroll:
            {
                ...this.state.scroll,
                isPressed:true,
                posX:e.clientX
            }

        })
    }
    handleMove=(e)=>{

    }
    handleUp=(e)=>{

    }
    render() {
        return (
            <div className="wrapper" onTouchStart={this.touchStart} onMouseDown={this.handleDown}>
                {this.state.scroll.max}
            </div>

        )
    }
}

export default Main;
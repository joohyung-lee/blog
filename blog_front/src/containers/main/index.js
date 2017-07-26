import React, { Component } from 'react';
import {Motion,spring} from 'react-motion';

//import components
import CardItem from 'components/main'
import 'styles/main/index.scss';
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
            isPressed:false,
            min:0,
            max:0,
            posX:0,
            deltaX:0,
            offsetX:0,
            relative:0,
            velocity:0,
        }
    }
    componentDidMount(){
        window.addEventListener('mousemove',this.handleMove);
        window.addEventListener('mouseup',this.handleUp);
        window.addEventListener('touchmove',this.touchMove);
        window.addEventListener('touchend',this.handleUp);
        const windowWidth=window.innerWidth;
        const blockWidth=this.refs.cardFullWidth.clientWidth;
        
        const maxScrollWidth=blockWidth-windowWidth;
        this.setState({
            max:maxScrollWidth
        });
    }
    touchStart=(e)=>{
        this.handleMove(e.touches[0]);
    }
    touchMove=(e)=>{
        this.handleMove(e.touches[0]);
        
    }
    handleDown=(pos,e)=>{
        console.log(pos);
        this.setState({
            isPressed:true,
            posX:e.clientX,
        });
    }
    handleMove=(e)=>{
        const {posX,isPressed,offsetX} = this.state;
        if(isPressed){
            const deltaX=posX-e.clientX;
            this.setState({
                posX:e.clientX,    
                deltaX:deltaX,
                offsetX:offsetX+deltaX
            });
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    handleUp=(e)=>{
        const {min,max,offsetX} = this.state;
        const mouseX = (offsetX > max) ? max : (offsetX < min) ? min : offsetX;
        this.setState({
            isPressed:false,
            deltaX:0,
            offsetX:mouseX
        });
    }
    handleClick=(e)=>{
    }
    render() { 
        const {isPressed,min,max,deltaX,offsetX} = this.state;
        const style=isPressed?
            {
                x:offsetX   
            }:{
                x:spring(offsetX)
            }
 
        return (
            <div className="main-container">
                <div ref="cardFullWidth" className="main-wrapper">
                    <Motion style={style}>
                        {
                            ({x})=>
                            <div className="card-item-wrap" onTouchStart={this.touchStart} onMouseDown={this.handleDown.bind(null,x)} style={{transform:`translate3d(${-x}px,0,0)`}}>
                                {
                                    this.state.items.map((item,i)=>{                        
                                        return (
                                            <CardItem key={i} author={item.key} title={item.title} onClick={this.handleClick}
                                                style={{
                                                    
                                                }}
                                            />
                                        )
                                    })
                                }
                            </div>
                        }
                    </Motion>
                </div>
            </div>

        )
    }
}

export default Main;
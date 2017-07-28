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
        window.addEventListener('touchmove',this.handleMove);
        window.addEventListener('touchend',this.handleUp);
        const windowWidth=window.innerWidth;
        const blockWidth=this.fullWidth.clientWidth;
        
        const maxScrollWidth=blockWidth-windowWidth;
        this.setState({
            max:maxScrollWidth
        });
    }
    handleDown=(pos,e)=>{
        let event=(e.type=='mousedown')?e:(e.type=='touchstart')?e.touches[0]:e;
        this.setState({
            isPressed:true,
            posX:event.clientX,
            offsetX:pos,
        });
    }
    handleMove=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        let event=(e.type=='mousemove')?e:(e.type=='touchmove')?e.touches[0]:e;    
        const {posX,isPressed,offsetX} = this.state;
        if(isPressed){
            const deltaX=posX-event.clientX;
            this.setState({
                posX:event.clientX,    
                deltaX:deltaX,
                offsetX:offsetX+deltaX
            });
        }     
    }
    handleUp=(e)=>{
        const {min,max,offsetX,deltaX} = this.state;
        const accel=offsetX+(deltaX*Math.abs(deltaX));
        let mouseX;
        if(accel > max){
            mouseX=max;
        }else if(accel < min){
            mouseX=min;
        }else{
            mouseX=accel;
            mouseX=Math.round(mouseX/300)*300;
        }
        this.setState({
            isPressed:false,
            deltaX:deltaX,
            offsetX:mouseX
        });
    }
    handleClick=(e)=>{
    }
    render() { 
        const {isPressed,offsetX} = this.state;
        const style=isPressed?
            {
                x:offsetX,
                active:spring(1.1)
            }:{
                x:spring(offsetX),
                active:spring(1)
            }
 
        return (
            <div className="main-container">
                <Motion style={style}>
                    {
                    ({x,active})=>
                    <div className="main-wrapper" onTouchStart={this.handleDown.bind(null,x)} onMouseDown={this.handleDown.bind(null,x)} >
                        <div ref={(ref)=>{this.fullWidth=ref}} className="card-item-wrap" style={{transform:`translate3d(${-x}px,0,0)`}}>
                            {
                                this.state.items.map((item,i)=>{                        
                                    return (
                                        <CardItem key={i} author={item.key} title={item.title} onClick={this.handleClick}
                                            style={{
                                                transform:`scale(${i==3?active:active})`
                                            }}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    }
                </Motion>
            </div>

        )
    }
}

export default Main;
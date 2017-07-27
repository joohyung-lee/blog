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
            deltaX:event.clientX-pos,
        });
    }
    handleMove=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        let event=(e.type=='mousemove')?e:(e.type=='touchmove')?e.touches[0]:e;    
        const {deltaX,isPressed} = this.state;
        if(isPressed){
            const offsetX=event.clientX-deltaX;
            this.setState({
                posX:event.clientX,    
                offsetX:offsetX
            });
        }     
    }
    handleUp=(e)=>{
        const {min,max,offsetX} = this.state;
        const mouseX = (offsetX < -max) ? -max : (offsetX > min) ? min : offsetX;
        this.setState({
            isPressed:false,
            deltaX:0,
            offsetX:mouseX
        });
    }
    handleClick=(e)=>{
    }
    render() { 
        const {isPressed,offsetX} = this.state;
        const style=isPressed?
            {
                x:offsetX   
            }:{
                x:spring(offsetX)
            }
 
        return (
            <div className="main-container">
                <Motion style={style}>
                    {
                    ({x})=>
                    <div className="main-wrapper" onTouchStart={this.handleDown.bind(null,x)} onMouseDown={this.handleDown.bind(null,x)} >
                        <div ref={(ref)=>{this.fullWidth=ref}} className="card-item-wrap" style={{transform:`translate3d(${x}px,0,0)`}}>
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
                    </div>
                    }
                </Motion>
            </div>

        )
    }
}

export default Main;
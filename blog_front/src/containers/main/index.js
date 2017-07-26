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
            scroll:{
                isPressed:false,
                min:0,
                max:0,
                offsetX:0,
                posX:0,
                relative:0,
                velocity:0,
            }
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
        console.log(blockWidth);
        this.setState({
            scroll:
            {
                ...this.state.scroll,
                max:maxScrollWidth
            }

        });
    }
    touchStart=(e)=>{
        this.handleMove(e.touches[0]);
    }
    touchMove=(e)=>{
        this.handleMove(e.touches[0]);
        
    }
    handleDown=(e)=>{
        this.setState({
            scroll:
            {
                ...this.state.scroll,
                isPressed:true,
                posX:e.clientX,
            }

        });
    }
    handleMove=(e)=>{
        const {posX,isPressed,offsetX} = this.state.scroll;
        if(isPressed){
            const newPosX=e.clientX;
            const deltaX=posX-newPosX;
            console.log(deltaX);
            this.setState({
                scroll:
                {
                    ...this.state.scroll,  
                    posX:newPosX,    
                    offsetX:offsetX+deltaX
                }
            });
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    handleUp=(e)=>{
        const {posX,isPressed} = this.state.scroll;
        this.setState({
            scroll:
            {
                ...this.state.scroll,
                isPressed:false,
            }

        });
    }
    handleClick=(e)=>{
    }
    render() { 
        const {posX,isPressed,offsetX} = this.state.scroll;
        const style=isPressed?
            {
                scale:spring(1)    
            }:{
                scale:spring(1)
            }
        return (
            <div className="main-container"onTouchStart={this.touchStart} onMouseDown={this.handleDown}>
                <div ref="cardFullWidth" className="main-wrapper">
                    <Motion style={style}>
                        {
                            ({scale})=>
                            <div className="card-item-wrap" style={{transform:`translate3d(${-offsetX}px,0,0)`}}>
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
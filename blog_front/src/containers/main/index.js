import React, { Component } from 'react';
import {Motion,TransitionMotion,spring} from 'react-motion';
import {withRouter,Route,Switch} from 'react-router-dom';
import { RouteTransition } from 'react-router-transition';
import MobileDetect from 'mobile-detect'
//import components
import CardItem from 'components/main';
import RouterAnimation from 'containers/detail';

import 'styles/main/index.scss';
const springSetting = {stiffness: 300, damping: 30};

class Main extends Component {
    constructor(props) {
        super(props);
        
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
            active:0,
            moved:false,
            eleX:0,
            eleY:0,
            eleWidth:0,
            eleHeight:0,
            wrapperPd:0,
            itemPd:0
        }
        
    }
    componentDidMount(){  
        
        
        this.dimensions();
        window.addEventListener('resize',this.dimensions);
        
        
    }
 
    dimensions=()=>{
        let path = window.location.href;
        let active = path.substr(path.lastIndexOf('/') + 1);          
        let md = new MobileDetect(window.navigator.userAgent);
        if(md.mobile()){
            window.addEventListener('touchmove',this.handleMove);
            window.addEventListener('touchend',this.handleTouchUp);
        }else{
            window.addEventListener('mousemove',this.handleMove);
            window.addEventListener('mouseup',this.handleUp);
        }
        let wrapperWidthStyle=window.getComputedStyle(this.wrapperWidth,null);
        let itemStyle=window.getComputedStyle(this.fullWidth.childNodes[0],null);

        const wrapperPd=parseInt(wrapperWidthStyle.getPropertyValue("padding-left"));
        const itemPd=parseInt(itemStyle.getPropertyValue("padding-left"));

        const wrapperWidth=this.wrapperWidth.clientWidth-wrapperPd*2;
        const blockWidth=this.fullWidth.clientWidth;  
        const maxScrollWidth=blockWidth-wrapperWidth;

        const eleWidth=this.fullWidth.childNodes[0].offsetWidth;
        const eleHeight=this.fullWidth.childNodes[0].offsetHeight;

        let offsetX=active*eleWidth;
        offsetX=offsetX>maxScrollWidth?maxScrollWidth:offsetX<0?0:offsetX;
        this.setState({
            max:maxScrollWidth,
            eleWidth:eleWidth,
            eleHeight:eleHeight,
            relative:(this.scrollWidth.clientWidth)/maxScrollWidth,
            wrapperPd:wrapperPd,
            itemPd:itemPd,
            offsetX:offsetX,
            eleX:active*eleWidth-offsetX+wrapperPd+itemPd,
            eleY:this.fullWidth.offsetTop+itemPd,
            active:active
        });
    }
    handleWheel=(pos,e)=>{
        e.preventDefault();
        e.stopPropagation();
        const {min,max,eleWidth,offsetX,active} = this.state;
        e.deltaX=e.deltaY;
        let mouseX=offsetX+e.deltaX;
        if(mouseX > max){
            mouseX=max;
        }else if(mouseX < min){
            mouseX=min;
        }else{
            mouseX=offsetX+e.deltaX;
        }
        this.setState({
            offsetX:mouseX,
            active:Math.round(mouseX/eleWidth)
        })
    }
    handleDown=(pos,e)=>{
        let event=(e.type=='mousedown')?e:(e.type=='touchstart')?e.touches[0]:e;
        const {max}=this.state;
        this.setState({
            isPressed:true,
            posX:event.pageX,
            offsetX:pos,
            deltaX:0,
            indicatorX:pos,
            moved:false,
        });
    }
    
    handleMove=(e)=>{  
        let event=(e.type=='mousemove')?e:(e.type=='touchmove')?e.touches[0]:e;           
        const {min,max,posX,isPressed,eleWidth,offsetX} = this.state;
        if(isPressed){
            const deltaX=posX-event.pageX;
            this.setState({
                posX:event.pageX,    
                deltaX:deltaX,
                offsetX:offsetX+deltaX,
                active:Math.round(offsetX/eleWidth),
                moved:true
            });     
        }
        
    }
    handleUp=(e)=>{
        const {min,max,eleWidth,offsetX,deltaX} = this.state;
        const accel=offsetX+(deltaX*Math.abs(deltaX));
        let mouseX;
        if(accel > max || Math.round(accel/eleWidth)*eleWidth > max){
            mouseX=max;
        }else if(accel < min){
            mouseX=min;
        }else{
            mouseX=Math.round(accel/eleWidth)*eleWidth;
        }
        this.setState({
            isPressed:false,
            offsetX:mouseX,
            active:Math.round(mouseX/eleWidth),
        });
    }
    handleTouchUp=(e)=>{
        const {min,max,eleWidth,offsetX,deltaX,items,active} = this.state;
        let mouseX;
        let index;
        if(deltaX>10){
            index=active+1
            mouseX=index*eleWidth;
        }else if(deltaX<-10){
            index=active-1
            mouseX=index*eleWidth;
        }else{
            mouseX=Math.round(offsetX/eleWidth)*eleWidth;
        }

        if(mouseX>max){
            index=items.length-1;
            mouseX=max;
        }else if(mouseX<min){
            index=0;
            mouseX=min;
        }
        this.setState({
            isPressed:false,
            offsetX:mouseX,
            active:Math.round(mouseX/eleWidth)
        });
    }
    handleMouseOver=(i)=>{
        this.setState({
            active:i
        })

    }
    handleMouseOut=()=>{
        const {eleWidth,offsetX} = this.state;
        

    }
    handleClick=(i,e)=>{
        const {moved,offsetX,eleWidth,wrapperPd,itemPd}=this.state;
        if(moved){
            return false;
        }else{
            this.props.history.push(`/motionlab/${i}`);
            const positionX=i*eleWidth-offsetX+wrapperPd+itemPd;
            this.setState({
                active:i,
                moved:false,
                eleX:positionX,
            })
        }   
    }
    
    
    render() { 
        const {isPressed,offsetX} = this.state;
        let style;
            if(isPressed){
                style={
                    x:offsetX,
                }
            }else{
                style={
                    x:spring(offsetX),
                }
                
            }
        return (
            <div className="main-container">
                <Motion style={style}>
                    {({x,barX})=>
                    <div ref={(ref)=>{this.wrapperWidth=ref}} className="main-wrapper" 
                        onTouchStart={this.handleDown.bind(null,x)} 
                        onMouseDown={this.handleDown.bind(null,x)} 
                        onWheel={this.handleWheel.bind(null,x)}
                        >
                        <div className="title-wrap">
                            <div className="menu-title">
                                <h2>MOTION LAB</h2>
                                <ul>
                                    <li></li>
                                </ul>
                            </div>
                            <div ref={(ref)=>{this.scrollWidth=ref}} className="scroll-bar">
                                <div className="indicator"
                                    style={{
                                        width:`${x*this.state.relative}px`,
                                        minWidth:`${100*this.state.relative}px`
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div ref={(ref)=>{this.fullWidth=ref}} className="card-item-wrap" style={{transform:`translate3d(${-x}px,0,0)`}}>
                            {
                                this.state.items.map((item,i)=>{       
                                    const cardStyle={
                                        active:spring(1.1)
                                    }                 
                                    return (
                                        <Motion key={i}style={cardStyle}>
                                            {({active})=>
                                                <CardItem key={i} author={item.key} title={item.title} 
                                                    onClick={this.handleClick.bind(null,i)} onMouseOver={this.handleMouseOver.bind(null,i)} onMouseOut={this.handleMouseOut}
                                                    className={this.state.active==i?"card-item hover":"card-item"}
                                                    style={{
                                                        
                                                    }}
                                                />
                                            }
                                        </Motion>
                                    )
                                })
                            }
                        </div>
                    </div>
                    }
                </Motion>
                <Route render={({location,params,history, match}) => {
                    
                    const {itemPd}=this.state;
                    return (
                        <RouterAnimation pathname={location.pathname} 
                            eleX={this.state.eleX} 
                            eleY={this.state.eleY} 
                            eleW={this.state.eleWidth-itemPd*2} 
                            eleH={this.state.eleHeight-itemPd*2}>
                                <Route path="/motionlab/:id"/>
                        </RouterAnimation>
                    );
                }} /> 
                
                 
            </div>

        )
    }
}



export default withRouter(Main);
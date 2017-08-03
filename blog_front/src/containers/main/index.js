import React, { Component } from 'react';
import {Motion,TransitionMotion,spring} from 'react-motion';
import {withRouter,Route} from 'react-router-dom';
import { RouteTransition } from 'react-router-transition';

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
            eleWidth:0,
            posX:0,
            deltaX:0,
            offsetX:0,
            relative:0,
            active:0,
            moved:false
        }
    }
    componentDidMount(){
        window.addEventListener('mousemove',this.handleMove);
        window.addEventListener('mouseup',this.handleUp);
        window.addEventListener('touchmove',this.handleMove);
        window.addEventListener('touchend',this.handleUp);
        this.dimensions();
        window.addEventListener('resize',this.dimensions);

        
    }
    dimensions=()=>{
        let wrapperWidth=this.wrapperWidth.clientWidth;
        let blockWidth=this.fullWidth.clientWidth;  
        let maxScrollWidth=blockWidth-wrapperWidth;
        this.setState({
            max:maxScrollWidth,
            eleWidth:this.fullWidth.childNodes[0].offsetWidth,
        });
    }
    handleDown=(pos,e)=>{
        let event=(e.type=='mousedown')?e:(e.type=='touchstart')?e.touches[0]:e;
        this.setState({
            isPressed:true,
            posX:event.clientX,
            offsetX:pos,
            moved:false,
        });
    }
    handleMove=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        
        let event=(e.type=='mousemove')?e:(e.type=='touchmove')?e.touches[0]:e;    
        const {posX,isPressed,eleWidth,offsetX} = this.state;
        if(isPressed){
            const deltaX=posX-event.clientX;
            this.setState({
                posX:event.clientX,    
                deltaX:deltaX,
                offsetX:offsetX+deltaX,
                active:Math.round(offsetX/eleWidth),
                moved:true
            });
        }     
    }
    handleUp=(e)=>{
        const {min,max,eleWidth,offsetX,deltaX,isPressed} = this.state;
        const accel=offsetX+(deltaX*Math.abs(deltaX));
        let mouseX;
        if(accel > max){
            mouseX=max;
        }else if(accel < min){
            mouseX=min;
        }else{
            mouseX=accel;
            mouseX=Math.round(mouseX/eleWidth)*eleWidth;
        }
        this.setState({
            isPressed:false,
            deltaX:deltaX,
            offsetX:mouseX,
            
        });
    }
    handleMouseOver=(i)=>{
        this.setState({
            active:i
        })

    }
    handleMouseOut=()=>{
        const {eleWidth,offsetX} = this.state;
        this.setState({
            active:Math.round(offsetX/eleWidth)
        })

    }
    handleClick=(i,e)=>{
        const {moved}=this.state;
        if(moved){
            return false;
        }else{
            this.props.history.push(`/motionlab/${i}`);
            this.setState({
                detailWidth:e.target.clientWidth
            })
        }   
    }
    render() { 
        const {isPressed,offsetX} = this.state;
        const style=isPressed?
            {
                x:offsetX,
            }:{
                x:spring(offsetX),
            }
        return (
            <div className="main-container">
                <Motion style={style}>
                    {({x})=>
                    <div ref={(ref)=>{this.wrapperWidth=ref}} className="main-wrapper" onTouchStart={this.handleDown.bind(null,x)} onMouseDown={this.handleDown.bind(null,x)} >
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
                <DetailPage path="/motionlab/:id" number='200'/> 
            </div>

        )
    }
}


const DetailPage = ({number,...rest}) => {
    const test=200
    return (      
            <Route {...rest} render={props=>(
                    <RouteTransition 
                        pathname={props.location.pathname}
                        atEnter={{ width: 10 }}
                        atLeave={{ width: 10 }}
                        atActive={{ width: 1200 }}
                    >
                    <div className="detail-page-wrap">
                        <h1>Detail</h1>
                        <h2>number</h2>
                    </div>
                    </RouteTransition>
                )}/> 
                
    );
};


export default withRouter(Main);
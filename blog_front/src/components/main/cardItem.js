import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconFav from 'images/iconFav';
import GifLoading from 'images/gifLoading';
import DefaultLoading from 'images/defaultLoading';
class CardItem extends Component {
    constructor(props) {
        super(props);
        this.thumImages = null;
        this.state={
            thumbLoading:false,
            gifLoading:false,
            imgSrc:null,
            imgLoadState:'wating',
            startX:0
        }
      }
    componentDidMount() {
        this.setState({
            thumbLoading: true,
            itemPress:false
        });
        const imagePath = (this.props.gifLoad)?this.props.gifSrc:this.props.thumbSrc;
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            this.setState({
              thumbLoading: false,
              gifLoading:false,
              imgLoadState:'success',
              imgSrc:imagePath
            });
        };
      }
    componentWillReceiveProps(nextProps){
        const gifChange=nextProps.gifLoad!==this.props.gifLoad;
        if(gifChange){  
            this.setState({
                gifLoading:true,
            });           
            const imagePath = (nextProps.gifLoad)?this.props.gifSrc:this.props.thumbSrc;
            const img = new Image();
            img.src = imagePath;
            img.onload = () => {
                this.setState({
                  thumbLoading: false,
                  gifLoading:false,
                  imgSrc:imagePath
                });
            };
        }
    }      
    handleMouseOut=(e)=>{
        this.setState({
            itemPress:false
        });
        return this.props.onMouseOut(e);        
    }
    handleDown=(e)=>{
        let event=(e.type=='mouseup')?e:(e.type=='touchstart')?e.touches[0]:e;  
        this.setState({
            itemPress:true,
            startX:event.pageX,
        })
    }  
    handleMove=(e)=>{
        const {startX,itemPress} = this.state;
        let event=(e.type=='mouseup')?e:(e.type=='touchend')?e.changedTouches[0]:e;     
        
        if(itemPress){
            const distance=startX-event.pageX;
            if(Math.abs(distance)>1){
                this.setState({
                    itemPress:false
                })
            }
             
        }
        
        
    }
    handleUp=(e)=>{
        const {startX} = this.state;
        let event=(e.type=='mouseup')?e:(e.type=='touchend')?e.changedTouches[0]:e;     
        const distance=startX-event.pageX;
        return (this.state.itemPress)?this.props.onMouseUp(e):false;
        
    } 
    render() {
        const {thumbLoading,gifLoading,imgSrc,imgLoadState,itemPress}=this.state;
        return (
            <div className={(itemPress)?`scale ${this.props.className}`:this.props.className} 
                style={this.props.wrapStyle}
            >
                <div className={`card-item-boxWrap`}>
                    <div className="card-item-box" 
                        onMouseOver={this.props.onMouseOver} 
                        onMouseOut={this.handleMouseOut}
                        onMouseDown={this.handleDown}
                        onMouseMove={this.handleMove}
                        onMouseUp={this.handleUp}
        
                        onTouchStart={this.handleDown}
                        onTouchMove={this.handleMove}
                        onTouchEnd={this.handleUp}
                        
                        style={this.props.style}
                    >    
                        <div className="card-item-image" style={{
                            height:`${this.props.imgHeight}px`,
                            backgroundColor:this.props.bgColor
                            }}>
                            <img className={`${(imgLoadState==='success')?`fade-in`:`fade-out`}`} src={imgSrc}/>
                            {
                                thumbLoading?<DefaultLoading color="white"/>:null
                            }

                            {(this.props.isGif)?
                            <div className={`gif-loading-wrap ${(this.props.gifLoad)?(!gifLoading)?`out`:`in`:``}`}>
                                <GifLoading open={gifLoading && this.props.gifLoad}/>
                            </div>:null
                            }
                        </div>
                        <div className="card-item-bottom" style={{height:`${this.props.bottomHeight}px`}}>
                            <div className="post-meta">
                                <span className="category">{this.props.category}</span>
                            </div>
                            <h3 style={{fontSize:`${this.props.responseFont}px`}}>{this.props.title}</h3>
                            <div className="avatar-wrap">                       
                            <div className="avatar" style={{backgroundImage:`url(${this.props.userImg})`}}/>
                                <span>{this.props.author}</span>
                                <span className="date">{this.props.postDate}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div onMouseEnter={this.props.favOver} 
                    className={(this.props.favLoading)?`icon-fav fav-loading`:(this.props.fav)?'icon-fav active':'icon-fav'}>
                        <div className="fav-info">
                            <span className="count">{this.props.favCount}</span>
                        </div>
                        <div className="svg-wrap" onClick={this.props.favClick}>
                            {
                                (this.props.favLoading)?<DefaultLoading color="black" size={20} r={8} stroke={1}/>
                                :<IconFav/>
                            }
                        </div>
                    </div>
                    <div className="summary-wrap">
                        <p>{this.props.summary}</p>
                    </div>  
                </div>  
            </div>
        );
    }
}

CardItem.propTypes = {
    gifLoad: PropTypes.bool,
};
CardItem.defaultProps = {
    gifLoad: false,
};
export default CardItem;
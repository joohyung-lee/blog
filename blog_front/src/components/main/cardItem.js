import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconFav from 'images/iconFav';
import GifLoading from 'images/gifLoading';
import DefaultLoading from 'images/defaultLoading';
import GifText from 'images/gifText';
class CardItem extends Component {
    constructor(props) {
        super(props);
        this.thumImages = null;
        this.state={
            thumbLoading:false,
            gifLoading:false,
            imgSrc:null,
            imgLoadState:'wating'
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
    handleDown=()=>{
        this.setState({
            itemPress:true
        })
    }  
    handleUp=(e)=>{
        this.setState({
            itemPress:false
        });
        //console.log(this.props.onMouseUp(e))
        return this.props.onMouseUp(e);
    } 
    render() {
        const {thumbLoading,gifLoading,imgSrc,imgLoadState}=this.state;
        return (
            <div className={this.props.className} 
                style={this.props.wrapStyle}
            >
                <div className="card-item-boxWrap">
                    <div className="card-item-box" 
                        onMouseOver={this.props.onMouseOver} 
                        onMouseOut={this.props.onMouseOut}
                        
                        onTouchEnd={this.props.onTouchEnd}
                        onMouseDown={this.handleDown}
                        onMouseUp={this.handleUp}
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
                            <div className={`${(!gifLoading && this.props.gifLoad)?`gif-loading-wrap out`:`gif-loading-wrap in`}`}>
                                {(gifLoading)?
                                    <GifLoading open={gifLoading}/>:
                                    <GifText/>
                                }
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
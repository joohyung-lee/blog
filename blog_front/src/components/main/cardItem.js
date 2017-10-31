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
    render() {
        const {thumbLoading,gifLoading,imgSrc,imgLoadState}=this.state;
        return (
            <div className={this.props.className} 
                style={this.props.wrapStyle}
            >
                <div className="card-item-box" 
                    onMouseOver={this.props.onMouseOver} 
                    onMouseOut={this.props.onMouseOut} 
                    onTouchEnd={this.props.onTouchEnd}
                    onMouseUp={this.props.onMouseUp}
                    style={this.props.style}
                >    
                    {
                       thumbLoading?<DefaultLoading color="white"/>:null
                    }
                    <img className={`card-item-image ${(imgLoadState==='success')?`fade-in`:`fade-out`}`} src={imgSrc}/>
                    {(this.props.isGif)?
                    <div className={`${(!gifLoading && this.props.gifLoad)?`gif-loading-wrap out`:`gif-loading-wrap in`}`}>
                        {(gifLoading)?
                            <GifLoading open={gifLoading}/>:
                            <GifText/>
                        }
                    </div>:null
                    
                    }
                    
                    <div className="card-item-bottom">
                        <div className="post-meta">
                            <span className="category">{this.props.category}</span>
                            <span>{this.props.postDate}</span>
                        </div>
                        <h3>{this.props.title}</h3>
                        <div className="avatar-wrap">                       
                            <div className="avatar" style={{backgroundImage:`url(${this.props.userImg})`}}/>
                            <span>{this.props.author}</span>
                        </div>
                    </div>
                    <div className="fav-info">
                        
                        <span className="count">{this.props.favCount}</span>
                        <span>Collect</span>
                    </div>
                </div>
                <div className="fav-wrap">
                    <span onClick={this.props.favClick} onMouseOver={this.props.favOver} className={(this.props.fav)?'icon-fav active':'icon-fav'}>
                        <IconFav/>
                    </span>
                </div>
                <div className="summary-wrap">
                    <p>{this.props.summary}</p>
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
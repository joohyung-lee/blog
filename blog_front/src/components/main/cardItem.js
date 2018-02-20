import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconFav from 'images/iconFav';
import VideoLoading from 'images/videoLoading';
import DefaultLoading from 'images/defaultLoading';
import MobileDetect from 'mobile-detect';
import Dotdotdot from 'react-dotdotdot';
import { setTimeout } from 'timers';
class CardItem extends Component {
    constructor(props) {
        super(props);
        this.thumImages = null;
        this.state={ 
            load:false,
            thumbLoading:false,
            videoPlaying:false,
            imgSrc:'',
            videoSrc:'',
            imgLoadState:'wating',
            startX:0,
            isBright:false
        }
      }
    componentDidMount() {
        let isBright = (parseInt(this.get_brightness(this.props.data.bgColor),10) > 160);
        this.setState({
            load:true,
            thumbLoading: true,
            itemPress:false,
            isBright:isBright
        });
        
        const imagePath = this.props.thumbSrc;
        const videoSrc=this.props.gifSrc;
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            this.setState({
              thumbLoading: false,
              videoPlaying:false,
              imgLoadState:'success',
              imgSrc:imagePath,
              videoSrc:videoSrc
            });
            setTimeout(()=>{
                this.playVideo(this.props.gifLoad);
            },300);
        };
      }
    componentWillReceiveProps(nextProps){
        const gifChange=nextProps.gifLoad!==this.props.gifLoad;
        if(gifChange){
            this.playVideo(nextProps.gifLoad);    
        }
    }      
    playVideo=(active)=>{
        let myVideo = this.videoSource;
        if(typeof myVideo!=='undefined'){
            if(active){ 
                this.setState({
                    videoPlaying:false
                });
                
                this.checkLoad(myVideo);
                myVideo.oncanplay=()=>{
                    this.setState({
                        videoPlaying:true
                    });
                    myVideo.play();
                }
                let isPlaying = myVideo.currentTime > 0 && !myVideo.paused && !myVideo.ended && myVideo.readyState > 2;
                if (!isPlaying) {
                    myVideo.play();
                }
            }else{
                myVideo.currentTime = 0;
                var playPromise = myVideo.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        myVideo.pause();
                        this.setState({
                            videoPlaying:false
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
    checkLoad=(target)=>{
        if(target.readyState===4){
            this.setState({
                videoPlaying:true,
            });  
        }else{
            setTimeout(this.checkLoad.bind(this,target),100);
        }
    }
    handleMouseOut=(e)=>{
        this.setState({
            itemPress:false
        });
    }
    handleDown=(e)=>{
        if (e.nativeEvent.which == 3) {
            return false;
        }else{
            let event=(e.type==='mouseup')?e:(e.type==='touchstart')?e.touches[0]:e;  
            this.setState({
                itemPress:true,
                startX:event.pageX,
            })
        }
    }  
    handleMove=(e)=>{
        const {startX,itemPress} = this.state;
        let event=(e.type==='mouseup')?e:(e.type==='touchend')?e.changedTouches[0]:e;     
        
        if(itemPress){
            const distance=startX-event.pageX;
            let md = new MobileDetect(window.navigator.userAgent);            
            if(md.mobile()){
                this.setState({
                    itemPress:false
                })
            }else{
                if(Math.abs(distance)>2){
                    this.setState({
                        itemPress:false
                    })
                }
            }
        }
    }
    handleUp=(e)=>{   
        if (e.nativeEvent.which == 3) {
            return false;
        }else{
            return (this.state.itemPress)?this.props.onMouseUp(e):false;
        }
    } 
    get_brightness=(hexCode)=>{
        hexCode = hexCode.replace('#', '');
        var c_r = parseInt(hexCode.substr(0, 2),16);
        var c_g = parseInt(hexCode.substr(2, 2),16);
        var c_b = parseInt(hexCode.substr(4, 2),16);
        return ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    }
    render() {
        const {thumbLoading,videoPlaying,imgSrc,videoSrc,imgLoadState,itemPress,isBright}=this.state;
        const {data,gifLoad}=this.props;
        return (
            <div className={(itemPress)?`scale ${this.props.className}`:this.props.className} 
                style={this.props.wrapStyle}
            >
                <div className={`card-item-boxWrap ${isBright?'dark':'white'}`}>
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
                            backgroundColor:(typeof data.bgColor!=='undefined')?data.bgColor:null
                            }}>
                            <img className={`${(imgLoadState==='success')?`fade-in`:`fade-out`}`} src={imgSrc} alt={imgSrc}/>
                            {
                                thumbLoading?<DefaultLoading color={isBright?'black':'white'}/>:null
                            }
                            {(this.props.isGif && videoSrc!=='')?
                                <video className="video-wrap" preload="auto" loop playsInline muted src={videoSrc} ref={(ref)=>{this.videoSource=ref}}  
                                style={{
                                    visibility:gifLoad?'visible':'hidden'
                                }}>
                                </video>:null
                            }
                            {(this.props.isGif)?
                                <div className={`gif-loading-wrap`}>
                                    <VideoLoading open={videoPlaying && gifLoad}/>
                                </div>:null
                            }
                        </div>
                        <div className="card-item-bottom" style={{height:`${this.props.bottomHeight}px`}}>
                            <div className="post-meta">
                                <span className="category">{data.category}</span>
                            </div>
                                
                                <Dotdotdot clamp={this.props.bottomHeight<140?1:2} className="post-title">
                                    <h3 style={{
                                        fontSize:`${this.props.responseFont}px`
                                    }}>{data.title}</h3>
                                </Dotdotdot>
       
                            <div className="avatar-wrap">                       
                                <div className="avatar" style={{backgroundImage:`url(${data.user.profileImg.url})`}}/>
                                <div className="avatar-info">
                                    <span>{data.user.userName}</span>
                                    <span className="date">{data.postDate}</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div onMouseEnter={this.props.favOver} 
                    className={(this.props.favLoading)?`icon-fav fav-loading`:(this.props.fav)?'icon-fav active':'icon-fav'}>
                        <div className="fav-info">
                            <span className="count">{(data.starred.length==='')?0:data.starred.length}</span>
                        </div>
                        <div className="svg-wrap" onClick={this.props.favClick}>
                            {
                                (this.props.favLoading)?<DefaultLoading color={'black'} size={20} r={8} stroke={1}/>
                                :<IconFav/>
                            }
                        </div>
                    </div>
                    {(this.props.summaryView)?
                        <div className="summary-wrap">
                            <Dotdotdot clamp={2}>
                                <p>
                                {data.summary}
                                </p>
                            </Dotdotdot>
                        </div>:null
                    }  
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
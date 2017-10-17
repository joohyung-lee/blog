import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconFav from 'images/iconFav';
class CardItem extends Component {
    
    render() {
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
                </div>
                <div className="fav-wrap">
                    <span onClick={this.props.favClick}  className={(this.props.fav)?'icon-fav active':'icon-fav'}>
                        <IconFav/>
                    </span>
                    <div className="fav-info">
                        <span className="count">{this.props.favCount}</span>
                        <span>Collect</span>
                    </div>
                </div>
                <div className="summary-wrap">
                    <h3>{this.props.title}</h3> 
                    <p>{this.props.summary}</p>
                </div>    
            </div>
        );
    }
}

CardItem.propTypes = {

};

export default CardItem;
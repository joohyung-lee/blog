import React, { Component } from 'react';

class ImageView extends Component {
    handleClick=(e)=>{
        this.refs.urlLink.select();
        document.execCommand('copy');
    }
    render() {
        const {size,name,link,onClick}=this.props;
        return (
            <li className="file-list">
                <img src={link} alt={name}/>
                <p className="size">{size}</p>
                <span className="btn-delete" onClick={onClick}>x</span>
                <div className="url-content">
                    <input type="text" ref="urlLink" className="url"value={link} readOnly/>
                    <button onClick={this.handleClick}>copy</button>
                </div>
            </li>
        );
    }
}

export default ImageView;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageView extends Component {
    render() {
        const {size,name,link,onClick}=this.props;
        return (
            <li className="file-list">
                <img src={link} alt={name}/>
                <p>{size}</p>
                <p>{link}</p>
                <span className="btn-delete" onClick={onClick}>X</span>
            </li>
        );
    }
}

ImageView.propTypes = {

};

export default ImageView;
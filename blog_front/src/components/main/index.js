import React from 'react';

const CardItem = ({author,title,style,onClick}) => {
    return (
        <div className="card-item" style={style} onClick={onClick}>
            <p>{author}</p>
            <p>{title}</p>
        </div>
    );
};

export default CardItem;
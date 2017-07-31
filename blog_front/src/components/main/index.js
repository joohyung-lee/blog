import React from 'react';

const CardItem = ({author,title,style,onClick,onMouseOver,onMouseOut,className}) => {
    return (
        <div className={className} style={style} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick} >
            <p>{author}</p>
            <p>{title}</p>
        </div>
    );
};

export default CardItem;
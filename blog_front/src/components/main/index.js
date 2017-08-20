import React from 'react';

const CardItem = ({author,title,style,onClick,onMouseOver,onMouseOut,className}) => {
    return (
        <div className={className}  >
            <div className="card-item-box"style={style} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick}>
                <p>{author}</p>
                <p>{title}</p>
            </div>
        </div>
    );
};

export default CardItem;
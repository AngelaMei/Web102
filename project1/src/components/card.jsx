import React from 'react';
import './card.css';

const Card = (props) => {
    const cardStyle = {
        transform: `rotate(${props.rotate}deg)`
    };

    return (
        <div className="card" style={cardStyle}>
            <img src={props.imageUrl} alt={props.title} className="card-image" />
            <div className="card-content">
                <h2 className="card-title">{props.title}</h2>
                <p className="card-description">{props.description}</p>
                <a href={props.linkUrl}>
                    <button>Check Map</button>
                </a>
            </div>
        </div>
    );
};

export default Card;
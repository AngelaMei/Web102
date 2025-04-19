import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import crewmateDetail from '../pages/crewmateDetail'

const Card = (props) =>  {

  const imgURL = `./character/${props.character}_${props.color}.webp`

  return (
      <div className="Card">
          <h2 className="name">{props.name}</h2>
          <h3 className="character">{props.character} + {props.color}</h3>
          {imgURL ?  <img src={imgURL} alt="" /> : null}
          <button><Link to={'edit/'+ props.id}>Edit Crewmate</Link></button>
          <button><Link to={'detail/'+ props.id} element={<crewmateDetail />}>Check Detail</Link></button>
      </div>
  );
};

export default Card;
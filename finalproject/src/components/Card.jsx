import React, { useEffect, useState } from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import { AiOutlineUser, AiOutlineLike } from "react-icons/ai";


const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Card = (props) =>  {
  const [image, setImage] = useState("")

  useEffect(()=> {
    const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
      },
    };
  
    const fetchSeriesImg = async() => {
      try{
        if (props.serie_id == null || props.serie_id == undefined){
          setImage("./noimage.jpeg")
        } else {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${props.serie_id}/season/${props.season}/episode/${props.episode}/images`, options
          );
  
          const data = await response.json();
          setImage(`https://image.tmdb.org/t/p/w500${data.stills[0].file_path}`);
        }
      } catch(error){
        console.error('Error fetching TV images:', error);
      }
    }
    fetchSeriesImg()
  }, [props])

  const date = new Date(props.created_at);
  const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;


  return (
    <div className="Card">
        <Link to={'detail/'+ props.id}>
          {image && (
            <img
              src={image}
              alt={props.title}
            />
          )}
          <div className='card-content'>
            <h3 className="title">{props.title}</h3>
            <p>{props.serie} - S{props.season} E{props.episode}</p>
            {props.like > 0 && <p className='tools'><AiOutlineLike /> {props.like}</p>}
            <div className="author">
              <AiOutlineUser />
              <p>Post by <strong>{props.author}</strong></p>
            </div>
            <p className='time small-text'>Create Time: {formatted}</p>
          </div>
      </Link>
    </div>
  );
};

export default Card;
import React from 'react';
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import './PostDetail.css'
import Feedback from '../components/Feedback'
import { AiOutlineUser, AiOutlineLike, AiOutlineDislike, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [postTime, setPostTime] = useState("");
  const [image, setImage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', id)
          .single();
  
        if (error) {
          setError(error);
        } else {
          setPost(data);
  
          // Set readable time
          const createdAt = new Date(data.created_at);
          const now = new Date();
          const diffMs = now - createdAt;
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMinutes = Math.floor(diffMs / (1000 * 60)) % 60;
  
          const formattedTime = diffHours > 0
            ? `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
            : `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  
          setPostTime(formattedTime);
  
          // 🔥 Now call this safely
          fetchSeriesImg(data);
        }
      } catch (err) {
        setError(err);
      }
    };
  
    fetchData();
  }, [id]);
  
  // ✅ Move outside the useEffect
  const fetchSeriesImg = async (data) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  
    try {
      if (!data.serie_id || !data.season || !data.episode) {
        setImage('./noimage.jpeg');
        return;
      }
  
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${data.serie_id}/season/${data.season}/episode/${data.episode}/images`,
        options
      );
  
      const result = await response.json();
      if (result.stills?.length > 0) {
        setImage(`https://image.tmdb.org/t/p/w500${result.stills[0].file_path}`);
      } else {
        setImage('./noimage.jpeg');
      }
    } catch (error) {
      console.error('Error fetching TV images:', error);
      setImage('./noimage.jpeg');
    }
  };
  

  if (error) {
    return <p>Error loading post: {error.message}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  const handleDislike = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .update({ dislike: post.dislike + 1 })
      .eq("id", id)
      .select()
      .single();
  
    if (error) {
      console.error("Error updating like:", error);
    } else {
      setPost(data); // update local post state
    }
  };

  const handleLike = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .update({ like: post.like + 1 })
      .eq("id", id)
      .select()
      .single();
  
    if (error) {
      console.error("Error updating like:", error);
    } else {
      setPost(data); // update local post state
    }
  };


  const deletePost = async (e) => {
    e.preventDefault();

    if (localStorage.getItem('userId') !== post.user_id) {
      alert('You are not allowed to edit/delete this post.');
      return;
    }

    await supabase
      .from("Posts")
      .delete()
      .eq("id", id);

    window.location = "/";
  };
  
  return (
    <>
      <div className='post-detail'>
        <p className='small-text'><em>Posted {postTime}</em></p>
        <br />
        <p className='series'>{post.serie} - S{post.season} E{post.episode}</p>
        <h2>{post.title}</h2>
        <p className='description'>{post.description}</p>
        {post.img_url ? (
          <img
            src={post.img_url}
            alt="Episode Image"
            style={{ width: "100%", maxWidth: "600px", borderRadius: "10px", marginBottom: "1rem" }}
          />
        ) : (
          <img
            src={image}
            alt="Episode Image"
            style={{ width: "100%", maxWidth: "600px", borderRadius: "10px", marginBottom: "1rem" }}
          />
        )}
        <p className='small-text'><AiOutlineUser />  Post by <strong>{post.author}</strong></p>


        <div className='tool-bar'>
          <div className='likes'>
            <div className='like'>
              <AiOutlineLike onClick={handleLike}/><p className='small-text'>{post.like} Likes</p>
            </div>
            <div className='like'>
              <AiOutlineDislike onClick={handleDislike}/><p className='small-text'>{post.dislike} Dislikes</p>
            </div>
          </div>
          <div className='tools'>
            <button><AiOutlineDelete onClick={deletePost} /></button>
            <button><Link to={`/edit/${post.id}`}><AiOutlineEdit /></Link></button>
          </div>
        </div>
        <hr />
        <Feedback id={post.id}/>

      </div>
    </>
  );
}

export default PostDetail;
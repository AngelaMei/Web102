import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './createPost.css';
import { AiFillDelete } from "react-icons/ai";

const EditPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState({
    title: "",
    author: "",
    description: ""
  });

  // Load post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select("title, author, description, userId")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const updatePost = async (e) => {
    e.preventDefault();

    if (localStorage.getItem('userId') !== post.userId) {
      alert('You are not allowed to edit/delete this post.');
      console.log(post.userId)
      return;
    }

    await supabase
      .from("Posts")
      .update({
        title: post.title,
        author: post.author,
        description: post.description
      })
      .eq("id", id);

    window.location = `/detail/${id}`;
  };

  return (
    <div>
      <h1>Update Post</h1>
      <form onSubmit={updatePost}>
        <label htmlFor="title">Post Title</label><br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="author">Author</label><br />
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="description">Description</label><br />
        <textarea
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
          required
        /><br /><br />

        <div className='buttongroup'>
          <input type="submit" value="Update the Post" />
        </div>
      </form>
    </div>
  );
};

export default EditPost;
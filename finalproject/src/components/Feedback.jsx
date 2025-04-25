import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import './Card.css'
import { AiOutlineSmile } from "react-icons/ai";

const Feedback = ({ id }) => {
  const [feedbackData, setFeedbackData] = useState(null);
  const [error, setError] = useState(null);
  const [post, setPost] = useState({
    participant: '',
    feedback: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from('Discussion')
        .select('*')
        .eq("id", id)

      if (error) {
        setError(error);
      } else {
        setFeedbackData(data);
      }
    };

    fetchFeedback();
  }, [id]);

  const createFeedback = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('Discussion')
      .insert({
        id,
        participant: post.participant,
        feedback: post.feedback
      });

    if (!error) {
      window.location = `/detail/${id}`;
    } else {
      console.error('Insert error:', error);
    }
  };

  if (error) return <p>Error loading post: {error.message}</p>;
  if (!feedbackData) return <p>Loading...</p>;

  return (
    <div>
    { feedbackData ? feedbackData.map((post) => 
     <div className='feedback' key={post.feedback_id}>
        <h3>{post.feedback}</h3>
        <p>From <strong>{post.participant}</strong></p>
        <p className='small-text'>{new Date(post.created_at).toLocaleString()}</p>
     </div>)
        : null
    }
    <hr />

      <form onSubmit={createFeedback}>
        <label htmlFor="participant">From</label>
        <input
          type="text"
          id="participant"
          name="participant"
          value={post.participant}
          onChange={handleChange}
          required
        />

        <label htmlFor="feedback">Feedback</label>
        <textarea
          id="feedback"
          name="feedback"
          value={post.feedback}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
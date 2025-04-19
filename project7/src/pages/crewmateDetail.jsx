import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { supabase } from '../client'; // Assuming you have your Supabase client

function CrewmateDetail() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('Posts') // Replace 'Crewmates' with your actual table name
          .select('*')
          .eq('id', id)
          .single(); // Assuming 'id' is unique

        if (error) {
          setError(error);
        } else {
          setCrewmate(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]); // Re-run effect if the ID changes

  if (loading) {
    return <p>Loading crewmate details...</p>;
  }

  if (error) {
    return <p>Error loading crewmate: {error.message}</p>;
  }

  if (!crewmate) {
    return <p>Crewmate not found.</p>;
  }

  const imgURL = `../character/${crewmate.character}_${crewmate.color}.webp`


  return (
    <div>
      <h1>Crewmate Detail</h1>
      <h2>Crewmate: {crewmate.name}</h2>
      <p>Character: {crewmate.character}</p>
      <p>Color: {crewmate.color}</p>
      <p>Lv. {crewmate.level}</p>
      <br />
      {imgURL ?  <img src={imgURL} alt="" /> : null}
    </div>
  );
}

export default CrewmateDetail;
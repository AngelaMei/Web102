import { useState, useEffect } from 'react'
import './App.css'
import dogDataJson from "./dogdata.json";

function App() {
  const [Dogs, setDogs] = useState([]);
  const [dogData, setDogData] = useState(0);
  const [showBreed, setShowBreed] = useState(false);
  const API_KEY = 'live_B5aA7vfXJ3bEdgPnXJO3AfyYSOJ0SAWnUNZKbDOf7fBgPEXmU93RG34jLXfYSIma';

  useEffect(() => {
    setDogs(dogDataJson);
  }, []);

  // useEffect(() => {
  //   const fetchDogs = async () => {
  //     try {
  //       const response = await fetch('https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=&api_key=' + API_KEY);
  //       const data = await response.json();
  //       setDogs(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching dog data:', error);
  //     }
  //   };

  //   fetchDogs();
  // }, [API_KEY]);

  const handlePrevClick = () => {
    if (dogData === 0) return;
    setDogData(dogData - 1);
    setShowBreed(false);
  }
  
  const handleNextClick = () => {
    setDogData(dogData + 1);
    // const randomIndex = Math.floor(Math.random() * Dogs.length);
    // setDogData(randomIndex);
    setShowBreed(false);
  }

  const handleFlashcardClick = () => {
    setShowBreed(!showBreed);
  }

  return (
    <>
      <h1>🐶 Guess the Dog Breed 🐩</h1>
      <h2>Click on the image, it would show the breed and also the life span.</h2>
      <div className='flashcard' onClick={handleFlashcardClick}>
        {Dogs.length > 0 && (
          showBreed ? (
            <div className='breed-info'>
              <p>Breed:<br/> {Dogs[dogData].breeds[0]?.name || "Unknown Breed"}</p>
              <p>Life Span:<br/> {Dogs[dogData].breeds[0]?.life_span || "Unknown"}</p>
              <p>Temperament:<br/> {Dogs[dogData].breeds[0]?.temperament || "Unknown"}</p>
            </div>
          ) : (
            <img src={Dogs[dogData].url} alt="Dog Image" />
          )
        )}
      </div>
      <div className='button-container'>
      <button 
          onClick={handlePrevClick} 
          disabled={dogData === 0}
        >  ← </button>
      <h3>{dogData+1} / {dogDataJson.length}</h3>
      <button 
          onClick={handleNextClick}
          disabled={dogData === 9}
        > → </button>
      </div>
      <img src="/DogImage.png" className="backgroundImage" alt="Dog Image" />
    </>
  )
}

export default App

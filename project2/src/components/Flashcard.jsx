import { useState, useEffect } from 'react'
import dogDataJson from "./dogdata.json";
import Answer from "./answerform";
import levenshtein from 'js-levenshtein';

function Flashcard() {
  const [Dogs, setDogs] = useState([]);
  const [dogData, setDogData] = useState(0);
  const [showBreed, setShowBreed] = useState(false);
  const [input, setInput] = useState('Enter Breed');
  const [Message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);

  const checkAnswer = (e) => {
    e.preventDefault();
    console.log("Input:" + input);
    console.log("Answer:" + Dogs[dogData].breeds[0]?.name);

    const correctAnswer = Dogs[dogData].breeds[0]?.name.toLowerCase();
    const userAnswer = input.toLowerCase();
    const distance = levenshtein(userAnswer, correctAnswer);

    if (distance == 0) { // Allow for up to 2 character differences
      setMessage('Correct')
      setCount(count + 1);
      if (count >= score) {
        setScore(count + 1);
      }

    } else if (distance <= 2) {
      setMessage('Very Close! Give you one point!')
      setCount(count + 1);
    }
    else {
      setMessage('Incorrect!');
      setCount(0);
    }
    // handleFlashcardClick();
  }
  
  useEffect(() => {
    setDogs(dogDataJson);
  }, []);
  
  //   const API_KEY = 'live_B5aA7vfXJ3bEdgPnXJO3AfyYSOJ0SAWnUNZKbDOf7fBgPEXmU93RG34jLXfYSIma';
  //   useEffect(() => {
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

  const cleanInput = () => {
    setInput('Enter Breed');
    setMessage('');
  }

  const handlePrevClick = () => {
    if (dogData === 0) return;
    setDogData(dogData - 1);
    setShowBreed(false);
    cleanInput();
  }
  
  const handleNextClick = () => {
    setDogData(dogData + 1);
    // const randomIndex = Math.floor(Math.random() * Dogs.length);
    // setDogData(randomIndex);
    setShowBreed(false);
    cleanInput();
  }

  const handleFlashcardClick = () => {
    setShowBreed(!showBreed);
  }

  const shuffleDogs = () => {
    const shuffledDogs = [...Dogs].sort(() => Math.random() - 0.5);
    setDogs(shuffledDogs);
    setDogData(0);
  };

  return (
    <>
    <div className='button-container'>
      <h3>Score: {count} </h3>
      <h3>Highest Streak: {score}</h3>
    </div>
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
      <Answer
        color={Message === 'Incorrect!' ? 'red' : ''} 
        placeholder={input}
        handleChange={(e) => {
          setInput(e.target.value);
          // console.log(e.target.value);
        }}
      />
      <div className='button-container'>
        <button type="submit" className="submit-button" onClick={checkAnswer}>Check Answer</button>
        <button type="button" className="submit-button" onClick={shuffleDogs}>Shuffle</button>
      </div>
      <h3>{Message}</h3>
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

export default Flashcard

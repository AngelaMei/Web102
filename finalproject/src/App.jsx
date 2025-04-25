import React, { useEffect } from 'react'
import './App.css'
import ReadPost from './pages/readPost';
import PopularPost from './pages/popularPost';

function App() {

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', newUserId);
      console.log('Generated new userId:', newUserId);
    }
  }, []);

  return (
    <>
      <div>
        <h1>Seriesly</h1>
        <p>Discuss the shows you love. Analyze every scene. Share your theories. 
          <br />Welcome to Seriesly, the forum for in-depth TV series discussions.</p>
          <div className='section'>
            <h2>Top 5 Posts</h2>
            <PopularPost />
            <h2>All Posts</h2>
            <ReadPost />
          </div>
      </div>
    </>
  )
}

export default App

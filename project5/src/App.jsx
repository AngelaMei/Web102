import { useState } from 'react';
import './App.css';

function App() {
  const [currentInfo, setCurrentInfo] = useState({
    title: "",
    artist_title: "",
    artwork_type_title: "",
    date_start: "",
    department_title: "",
    style_title: "",
    short_description: "",
    URL: "",
  });

  const [artworks, setArtworks] = useState([]); // Store fetched artworks
  const [banlist, setBanlist] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [prevArtworks, setPrevArtworks] = useState([]);

  const fetchAndSetArtwork = async () => {
    try {
      const query = `https://api.artic.edu/api/v1/artworks?limit=50`;
      const response = await fetch(query);
  
      if (!response.ok) {
        throw new Error("Failed to fetch artworks");
      }
  
      const data = await response.json();
  
      // Ensure the data array is not empty
      if (!data.data || data.data.length === 0) {
        throw new Error("No artworks found");
      }
      
      // Update the artworks state with the fetched data
      setArtworks(data.data);
      setIsFetching(true);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const getRandomArtwork = () => {
    if (artworks.length === 0) {
      alert("No artworks available. Please fetch data first.");
      return;
    }
  
    // Filter artworks to exclude those with banned attributes
    const validArtworks = artworks.filter((artwork) => {
      return !banlist.some((bannedAttribute) => {
        return (
          (bannedAttribute === artwork.artist_title) ||
          (bannedAttribute === artwork.artwork_type_title) ||
          (bannedAttribute === artwork.date_start) ||
          (bannedAttribute === artwork.department_title) ||
          (bannedAttribute === artwork.style_title)
        );
      });
    });
  
    if (validArtworks.length === 0) {
      alert("No valid artworks available. Please fetch more data.");
      return;
    }
  
    // Select a random valid artwork
    const randomIndex = Math.floor(Math.random() * validArtworks.length);
    const selectedArtwork = validArtworks[randomIndex];
  
    // Add the current artwork to the prevArtworks state
    
    // Update the currentInfo state
    setCurrentInfo({
      title: selectedArtwork.title,
      artist_title: selectedArtwork.artist_title,
      artwork_type_title: selectedArtwork.artwork_type_title,
      date_start: selectedArtwork.date_start,
      department_title: selectedArtwork.department_title,
      style_title: selectedArtwork.style_title,
      short_description: selectedArtwork.short_description,
      URL: selectedArtwork.image_id
      ? `https://www.artic.edu/iiif/2/${selectedArtwork.image_id}/full/843,/0/default.jpg`
      : null,
    });
    
    if (currentInfo.title !== "") {
      setPrevArtworks((prev) => [...prev, currentInfo]);
    }
  };

  const toggleBanlist = (attribute) => {
    setBanlist((prevBanlist) => {
      if (prevBanlist.includes(attribute)) {
        // Remove the attribute if it's already in the banlist
        return prevBanlist.filter((item) => item !== attribute);
      } else {
        // Add the attribute if it's not in the banlist
        return [...prevBanlist, attribute];
      }
    });
  };

  return (
    <>
    <div className="grid-4">
      <div className="container">
        <div className="prev-artworks">
        <h3>Viewed Artwork</h3>
          {prevArtworks.map((artwork, index) => (
            <div key={index} className="prev-artwork">
              <h4>{artwork.title || "Unknown Title"}</h4>
              {artwork.URL ? (
                <img src={artwork.URL} alt={artwork.title} className="prev-artwork-image" />
              ) : (
                <p>No image available</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="container grid-2">
        <h1>Welcome to Art Exhibition</h1>
        <h2>{currentInfo.title}</h2>
        <div className="buttonwrapper">
          {currentInfo.artist_title ? (
            <button
            className={banlist.includes(currentInfo.artist_title) ? "banned" : ""}
            onClick={() => toggleBanlist(currentInfo.artist_title)}
            >
              {currentInfo.artist_title}
            </button>
          ) : null}
          {currentInfo.artwork_type_title ? (
            <button
            className={banlist.includes(currentInfo.artwork_type_title) ? "banned" : ""}
            onClick={() => toggleBanlist(currentInfo.artwork_type_title)}
            >
              {currentInfo.artwork_type_title}
            </button>
          ) : null}
          {currentInfo.date_start ? (
            <button
            className={banlist.includes(currentInfo.date_start) ? "banned" : ""}
            onClick={() => toggleBanlist(currentInfo.date_start)}
            >
              {currentInfo.date_start}
            </button>
          ) : null}
          {currentInfo.department_title ? (
            <button
            className={banlist.includes(currentInfo.department_title) ? "banned" : ""}
            onClick={() => toggleBanlist(currentInfo.department_title)}
            >
              {currentInfo.department_title}
            </button>
          ) : null}
          {currentInfo.style_title ? (
            <button
            className={banlist.includes(currentInfo.style_title) ? "banned" : ""}
            onClick={() => toggleBanlist(currentInfo.style_title)}
            >
              {currentInfo.style_title}
            </button>
          ) : null}
        </div>
        {currentInfo.URL ? (
          <img src={currentInfo.URL} alt={currentInfo.title} />
        ) : (
          <p>No image available</p>
        )}
        {currentInfo.short_description ? (
          <p>{currentInfo.short_description}</p>
        ) : null}
        <button className="mainbutton" onClick={isFetching ? getRandomArtwork : fetchAndSetArtwork}>
          {isFetching ? "Get Random Artwork" : "Fetch Data"}
        </button>
      </div>
      <div className="container">
        <div className="banlist">
          <h3>Banned Attributes</h3>
            {banlist.map((item, index) => (
              <button className="banned" onClick={() => toggleBanlist(currentInfo.artwork_type_title)} key={index}>{item}</button>
            ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
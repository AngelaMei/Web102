import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "./Components/coinInfo";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchAllCoinData() {
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?&api_key`+API_KEY);
        const data = await response.json();
        setList(data);
        // console.log(data.Data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchAllCoinData();
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <>
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />

      <ul>
        {searchInput.length > 0
          ? filteredResults.map((coin) => (
            <CoinInfo
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
          ))
          : list && Object.entries(list.Data).map(([coin]) => (
            <CoinInfo
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
          )
        )}
      </ul>
    </div>
    </>
  )
}

export default App

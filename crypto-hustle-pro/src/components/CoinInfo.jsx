import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./CoinInfo.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinInfo({image, name, symbol}) {
  const [price, setPrice] = useState(null)

  useEffect(() => {
    const controller = new AbortController();

    const getCoinPrice = async () => {
      let response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`, { signal: controller.signal });
      let responseJson = await response.json();
      setPrice(responseJson);
    }

    getCoinPrice().catch(
      (error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error);
        }
      }
    );

    return () => {
      controller.abort();
    }
  }, [symbol]);

  return (
    <div>
      {price && (
        <div className="main-list" key={symbol}>
          <Link 
            to={`/coinDetails/${symbol}`} 
            style={{color: "white"}}
            key={symbol}>
            <img className="icons" src={`https://www.cryptocompare.com${image}`} alt={`Small icon for ${name} crypto coin`}/>
            {`${name} (${symbol})`}
            {name}
            <span className="tab">
              ${price.USD} USD
            </span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CoinInfo
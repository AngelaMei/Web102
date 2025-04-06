import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "./coinChart.jsx";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinDetail() {

    let params = useParams();
    
    const [fullDetails, setFullDetails] = useState(null);
    
    useEffect(() => {
        const getCoinDetail = async () => {
          const details = await fetch(
            `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=` +
              API_KEY
          );
          const description = await fetch(
            `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=` +
              API_KEY
          );
      
          const detailsJson = await details.json();
          const descripJson = await description.json();
        //   console.log(detailsJson);
        //   console.log(descripJson);
      
          setFullDetails({"numbers": detailsJson.DISPLAY, "textData": descripJson.Data});

        };
        
        getCoinDetail().catch(console.error);
    }, [params.symbol]);

    return(
        <>
        <div>{fullDetails ? (
            <div>
                <h1>{fullDetails.textData[params.symbol].FullName}</h1>
                <img
                    className="images"
                    src={`https://www.cryptocompare.com${
                        fullDetails.numbers[params.symbol].USD.IMAGEURL
                    }`}
                    alt={`Small icon for ${params.symbol} crypto coin`}
                />
                <p>{fullDetails.textData[params.symbol].Description}</p>
                <br></br>
                <div>
                    This coin was built with the algorithm{" "}
                    {fullDetails.textData[params.symbol].Algorithm}{" "}
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>Proof Type:</td>
                            <td>{fullDetails.textData[params.symbol].ProofType}</td>
                        </tr>
                        <tr>
                            <td>Rating:</td>
                            <td>{fullDetails.textData[params.symbol].Rating.Weiss.Rating}</td>
                        </tr>
                        <tr>
                            <td>Last Update:</td>
                            <td>{fullDetails.numbers[params.symbol].USD.LASTUPDATE}</td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>{fullDetails.numbers[params.symbol].USD.PRICE}</td>
                        </tr>
                    </tbody>
                </table>
                <CoinChart
                    symbol={params.symbol}
                    market={fullDetails.numbers[params.symbol].USD.MARKET}
                    />
            </div>
            ) : null}</div>
        </>
    )
}

export default CoinDetail;
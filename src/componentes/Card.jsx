import "./Card.css";
import React, { useState, useEffect } from "react";
import GraficoB from "./GraficoB";
import GraficoL from "./GraficoL";

const value = 0;

function Card(props) {

  const [bitcoinUsd, setBitcoinUsd] = useState(0);
  const [bitcoinEur, setBitcoinEur] = useState(0);
  const [bitcoinGbp, setBitcoinGbp] = useState(0);
  const [prices, setPrices] = useState([]);
  const [grafB, setGrafB] = useState(true);


  const handleChange = () => {
    setGrafB(!grafB);
  }

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/" + props.Coin + "/market_chart?vs_currency=usd&days=1&interval=daily")
    .then(response => response.json())
    .then(data => setBitcoinUsd(data.prices.at(1).at(1)));
  fetch("https://api.coingecko.com/api/v3/coins/" + props.Coin + "/market_chart?vs_currency=eur&days=1&interval=daily")
    .then(response => response.json())
    .then(data => setBitcoinEur(data.prices.at(1).at(1)));
  fetch("https://api.coingecko.com/api/v3/coins/" + props.Coin + "/market_chart?vs_currency=gbp&days=1&interval=daily")
    .then(response => response.json())
    .then(data => setBitcoinGbp(data.prices.at(1).at(1)));
  fetch("https://api.coingecko.com/api/v3/coins/" + props.Coin + "/market_chart?vs_currency=usd&days=5&interval=daily")
    .then(response => response.json())
    .then(data => setPrices(data.prices));
  },[value])

  return (
    <div className="card">
      <div>
        <div className="info">
          <img src="https://bitcoin.org/img/icons/opengraph.png?1657703267" alt={"imagen de " + props.Coin} />
          <h2>{props.Coin}</h2>
        </div>
        <div className="alertas">
          <button>Crear alerta</button>
          <div className="selecAlert">
            <div>
              <p>Moneda</p>
              <select name="select">
                <option value="value1">USD</option>
                <option value="value2" selected>EUR</option>
                <option value="value3">ETH</option>
              </select>
            </div>
            <div>
              <p>Cifra</p>
              <input type="number" className="number" />
            </div>
          </div>
        </div>
      </div>
      <div className="graficos">
        {grafB &&
          <GraficoB usd={bitcoinUsd} eur={bitcoinEur} gbp={bitcoinGbp} Coin={props.Coin} />
        }{!grafB &&
          <GraficoL prices={prices} Coin={props.Coin} />
        }
        <button onClick={handleChange}>Cambiar Gráfico</button>
      </div>
    </div>
  )
}

export default Card;
import "./Grid.css";
import React, { useState, useEffect, useMemo } from "react";
import GraficoB from "./GraficoB";
import GraficoL from "./GraficoL";
import Card from "./Card";

function Grid(props) {
  
    const Coins = useMemo(() => props.Coins.filter((Coin) => {
        return (Coin.toLowerCase().includes(props.search.toLowerCase()));
    }),[props.Coins, props.search]);

  return (
    <div className="grid">
        {Coins.length ==0 &&
        <h3>La búsqueda no produjo ningún resultado</h3>
      }
        {Coins.map(coin => (
                    <Card Coin={coin}></Card>
                ))}
    </div>
  )
}

export default Grid;
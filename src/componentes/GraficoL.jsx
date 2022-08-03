import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

var day1 = new Date();
const day2 = new Date(day1)
day2.setDate(day2.getDate() - 1)
const day3 = new Date(day1)
day3.setDate(day3.getDate() - 2)
const day4 = new Date(day1)
day4.setDate(day4.getDate() - 3)
const day5 = new Date(day1)
day5.setDate(day5.getDate() - 4)

function GraficoL(props) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: props.Coin + ' Grafico de linea USD',
      },
    },
  };
  
  const labels = [ day5.toLocaleDateString(),day4.toLocaleDateString(),day3.toLocaleDateString(),day2.toLocaleDateString(),day1.toLocaleDateString()];
  
  const data = {
    labels,
    datasets: [
      {
        label: props.Coin,
        data: [props.prices.at(0).at(1),props.prices.at(1).at(1),props.prices.at(2).at(1),props.prices.at(3).at(1),props.prices.at(4).at(1)],
        borderColor: 'rgba(92, 148, 124, 0.7)',
        backgroundColor: 'rgba(92, 148, 124, 0.7)',
      }
    ],
  };
  
    useEffect(() => {
      
    })

  return (
          <Line options={options} data={data} />
  )  
}

export default GraficoL;
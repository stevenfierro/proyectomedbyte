
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


function GraficoB(props) {

  
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
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
          text: 'Comparacion '+props.Coin+' / fiat',
        },
      },
    };
    
    const labels = ['EUR', 'USD', 'GBP'];
    
    const data = {
      labels,
      datasets: [
        {
          label: props.Coin,
          data: [props.eur, props.usd, props.gbp],
          backgroundColor: 'rgba(92, 148, 124, 0.7)',
        },
      ],
    };
  
    return (
            <Bar className="bar" options={options} data={data} />
    )  
  }
  
  export default GraficoB;
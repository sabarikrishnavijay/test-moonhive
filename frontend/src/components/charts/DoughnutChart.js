import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


function DoughnutChart({value}) {
    ChartJS.register(ArcElement, Tooltip, Legend);

 let    data = {
        labels: ['Pending tasks', 'Completed tasks'],
        datasets: [
            {
                label: '# of Votes',
                data: [value.pending,value.completed],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                
                ],
                borderWidth: 1,
            },
        ],
    };

  return (
      <div>
          <Doughnut
             data={data}
          />
         
     
    </div>
  )
}

export default DoughnutChart
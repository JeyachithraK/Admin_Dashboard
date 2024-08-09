// // src/components/Reviews/LineChart.jsx
// import React from 'react';
// // import { Line } from 'react-chartjs-2';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // import { Chart as ChartJS, LineElement, CategoryScale, LinearScale } from 'chart.js';

// // ChartJS.register(LineElement, CategoryScale, LinearScale);

// const LineCharts = ({ data }) => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="rating" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default LineCharts;
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(review => review.reviewer),
    datasets: [
      {
        label: 'Rating',
        data: data.map(review => review.rating),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Reviewer'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rating'
        },
        ticks: {
          min: 0,
          max: 5,
          stepSize: 1,
        }
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChartComponent;
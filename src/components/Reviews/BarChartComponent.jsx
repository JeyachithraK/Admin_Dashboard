// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const BarChartComponent = ({ data }) => {
//   const chartData = {
//     labels: data.map(review => review.reviewer),
//     datasets: [
//       {
//         label: 'Ratings',
//         data: data.map(review => review.rating),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//         max: 5, // Since ratings are between 1 and 5
//       },
//     },
//   };

//   return <Bar data={chartData} options={options} />;
// };

// export default BarChartComponent;
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChartComponent = ({ data }) => {
  const ratingCounts = data.reduce((acc, review) => {
    const rating = review.rating || '0';
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Count of Ratings',
        data: [ratingCounts['1'] || 0, ratingCounts['2'] || 0, ratingCounts['3'] || 0, ratingCounts['4'] || 0, ratingCounts['5'] || 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rating'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count'
        }
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChartComponent;

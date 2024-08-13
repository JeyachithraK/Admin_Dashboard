import React from "react";
import Chart from "react-apexcharts";
import { useState,useEffect } from "react";
import axios from "axios";
import { Line } from 'react-chartjs-2';


const CustomerReview = () => {
  const [data, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:8080/reviews');
      setReviews(response.data);
    } catch (err) {
      setError('Failed to fetch reviews. Please try again later.');
      console.error('Error fetching reviews', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: data.map(review => review.reviewer),
    datasets: [
      {
        label: 'Rating',
        data: data.map(review => review.rating),
        fill: true,
         // Set the style of the point markers
        pointRadius: 3, 
        backgroundColor: 'rgba(173, 216, 230, 0.5)', // Light blue with transparency
        borderColor: 'rgb(99, 168, 242)', // A distinct blue color for the line
        borderWidth: 3,
        tension: 0.4,
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

export default CustomerReview;
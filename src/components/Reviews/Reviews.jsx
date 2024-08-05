import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css';
import ReviewPieChartModal from './ReviewPieChartModal';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [newReview, setNewReview] = useState({ reviewer: '', comment: '', rating: '' });
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
      console.error("Error fetching reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prevReview => ({
      ...prevReview,
      [name]: value
    }));
  };

  const handleAddReview = async () => {
    if (!newReview.reviewer || !newReview.comment || !newReview.rating) {
      setError('Please fill in all fields.');
      return;
    }

    if (newReview.rating < 1 || newReview.rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }

    setError('');
    try {
      await axios.post('http://localhost:8080/reviews', newReview);
      fetchReviews();
      setNewReview({ reviewer: '', comment: '', rating: '' });
    } catch (err) {
      setError('Failed to add review. Please try again later.');
      console.error("Error adding review", err);
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setError('');
      try {
        await axios.delete(`http://localhost:8080/reviews/${id}`);
        fetchReviews();
      } catch (err) {
        setError('Failed to delete review. Please try again later.');
        console.error("Error deleting review", err);
      }
    }
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const ratingCounts = reviews.reduce((acc, review) => {
    const rating = review.rating || '0';
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(ratingCounts).map(r => `Rating ${r}`),
    datasets: [
      // {
      //   data: Object.values(ratingCounts),
      //   backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
      //   borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)'],
      //   borderWidth: 1
      // }
      {
        data: Object.values(ratingCounts),
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',  // Brighter Cyan
          'rgba(255, 99, 132, 0.5)',  // Brighter Red
          'rgba(255, 254, 0)',  // Brighter Yellow
          'rgba(54, 162, 235, 0.5)',  // Brighter Blue
          'rgba(153, 102, 255, 0.5)'  // Brighter Purple
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',  // Vivid Cyan
          'rgba(255, 99, 132, 1)',  // Vivid Red
          'rgba(255, 206, 86, 1)',  // Vivid Yellow
          'rgba(54, 162, 235, 1)',  // Vivid Blue
          'rgba(153, 102, 255, 1)'  // Vivid Purple
        ],
        borderWidth: 2  // Increased border width for more vivid effect
      }
      
    ]
  };

  return (
    <div className="reviews-container">
     <h3>Add New Review</h3>
          <input
            type="text"
            name="reviewer"
            value={newReview.reviewer}
            onChange={handleInputChange}
            placeholder="Reviewer"
            aria-label="Reviewer"
          />
          <input
            type="text"
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
            placeholder="Comment"
            aria-label="Comment"
          />
          <input
            type="number"
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            placeholder="Rating"
            min="1"
            max="5"
            aria-label="Rating"
          />
          <button className="but" onClick={handleAddReview}>Add Review</button>
      <h2>Reviews</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && (
        <>
          <table className="reviews-table">
            <thead>
              <tr>
                <th>Reviewer</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review.id}>
                  <td>{review.reviewer}</td>
                  <td>{review.comment}</td>
                  <td>{review.rating}</td>
                  <td>
                    <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
          <div className="pie-chart-link">
            <a href="#" onClick={toggleChart}>
              Wanna see pie-chart?
            </a>
          </div>
          <ReviewPieChartModal
            show={showChart}
            onClose={toggleChart}
            chartData={chartData}
          />
        </>
      )}
    </div>
  );
};

export default Reviews;

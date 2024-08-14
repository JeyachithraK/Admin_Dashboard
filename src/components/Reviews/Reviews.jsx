import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css';
import ReviewPieChartModal from './ReviewPieChartModal';
import LineChartComponent from './LineChart';
import BarChartComponent from './BarChartComponent'; 
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { FaChartPie, FaChartLine, FaChartBar, FaChartArea } from 'react-icons/fa';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false); 
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
      console.error('Error fetching reviews', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
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
      console.error('Error adding review', err);
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
        console.error('Error deleting review', err);
      }
    }
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const toggleLineChart = () => {
    setShowLineChart(!showLineChart);
  };

  const toggleBarChart = () => {
    setShowBarChart(!showBarChart);
  };

  const ratingCounts = reviews.reduce((acc, review) => {
    const rating = review.rating || '0';
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    series: Object.values(ratingCounts),
    labels: Object.keys(ratingCounts).map((r) => `Rating ${r}`),
  };

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    labels: Object.keys(ratingCounts).map((r) => `Rating ${r}`),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
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
      <button className="but" onClick={handleAddReview}>
        Add Review
      </button>

      <h3>Reviews</h3>
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
              {reviews.map((review) => (
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

        <div className="chart-info">
            <span>Ratings Distribution</span>
            
              <div className='mm'>
                   <div className="box-above-link">
                       <FaChartPie size={24} />
                       {/* <span className="order-distribution">Review-Distribution</span> */}
                       <span onClick={toggleLineChart} className="chart-toggle">
                         {showLineChart ? 'Hide line chart' : 'Line Chart'}
                        <div className="pie-chart-icon-container">
                         <i className="fas fa-chart-line line-chart-icon"></i>
                        </div>
                      </span>
                      <FaChartLine size={24} />
                      <FaChartBar size={24} />
                      <FaChartArea size={24} />
                  </div>
                  <div className="box-above-link">
                     <FaChartPie size={24} />
                     <FaChartLine size={24} />
                     {/* <span className="order-distribution">Line-Order-Distribution</span> */}
                     <span onClick={toggleBarChart} className="chart-toggle">
                        {showBarChart ? 'Hide bar chart' : 'Bar chart'}
                        <div className="icon-container">
                          {/* <i className="fas fa-chart-line line-chart-icon"></i> */}
                          <i className="fas fa-chart-bar bar-chart-icon"></i>
                        </div>
                     </span>
                     <FaChartBar size={24} />
                     <FaChartArea size={24} />
                  </div>

                      <motion.div
                        className="chart-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        onClick={toggleChart}
                        >            
                        <div className="chart-container">
                          <CircularProgressbar value={70} text={`${70}%`} />
                        </div>

                        <div className="box-above-link">
                              <FaChartPie size={24} />
                              <FaChartLine size={24} />
                              {/* <span>Ratings Distribution</span> */}
                              <span>Click to view pie chart
                                <div className="icon-container">
                                    <i className="fas fa-chart-pie pie-chart-icon"></i>
                                </div>
                              </span>
                          
                             <FaChartBar size={24} />
                             <FaChartArea size={24} />
                         </div>
                     </motion.div>
                 </div>
        </div>

          {showLineChart && <LineChartComponent data={reviews} />}
          {showBarChart && <BarChartComponent data={reviews} />}

          {/* <motion.div
            className="chart-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={toggleChart}
          >
            <div className="chart-container">
              <CircularProgressbar value={70} text={`${70}%`} />
            </div>
            <div className="box-above-link">
                  <FaChartPie size={24} />
                  <FaChartLine size={24} />
                  
              
                  {/* <span>Ratings Distribution</span> */}
                  {/* <span>Click to view pie chart
                    <div className="icon-container">
                        <i className="fas fa-chart-line line-chart-icon"></i>
                    </div>
                  </span>
              
                 <FaChartBar size={24} />
                 <FaChartArea size={24} />
             </div> */}
          {/* </motion.div>  */}

          <ReviewPieChartModal
            show={showChart}
            onClose={toggleChart}
            chartData={chartData}
            chartOptions={chartOptions}
          />
        </>
      )}
    </div>
  );
};

export default Reviews;
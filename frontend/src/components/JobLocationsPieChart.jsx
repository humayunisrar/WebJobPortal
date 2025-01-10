import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const JobLocationsBarChart = () => {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/job/getlocationsstats",
          { withCredentials: true }
        );
        setLocationData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch job location stats:", error);
        setLoading(false);
      }
    };

    fetchLocationStats();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!locationData || locationData.length === 0) {
    return <p>No data available to display.</p>;
  }

  // Extract labels and counts for the x-axis and y-axis
  const labels = locationData.map((item) => item.location);
  const dataCounts = locationData.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Job Count",
        data: dataCounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Job Locations",
        },
      },
      y: {
        title: {
          display: true,
          text: "Job Count",
        },
        ticks: {
          stepSize: 5, // Y-axis increments of 5
          callback: function (value) {
            if (value === 0) return "0";
            return `${value+5}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Job Locations with Categorized Y-Axis</h2>
      <div style={{ position: "relative", height: "400px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default JobLocationsBarChart;

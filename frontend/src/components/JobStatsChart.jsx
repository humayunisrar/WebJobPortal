import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const JobStatsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobStats = async () => {
      try {
        const response = await axios.get(
          "https://jobportalback.onrender.com/api/v1/job/getstats",
          {
            withCredentials: true,
          }
        );

        // Extracting labels and data from the response
        const jobNiches = response.data.data.map((item) => item.niche);
        const jobCounts = response.data.data.map((item) => item.count);

        setData({
          labels: jobNiches,
          datasets: [
            {
              label: "Job Niche Count",
              data: jobCounts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
              borderColor: "#fff",
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job statistics.");
        setLoading(false);
      }
    };

    fetchJobStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Job Niches Stats</h2>
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Distribution of Job Niches",
            },
          },
        }}
      />
    </div>
  );
};

export default JobStatsChart;

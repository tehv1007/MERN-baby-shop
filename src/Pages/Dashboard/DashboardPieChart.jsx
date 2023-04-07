import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const BestSellingProductsPieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        data: data.map((item) => item.quantity),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9933",
          "#CC66CC",
          // "#66CC66",
          // "#9999FF",
          // "#FF6666",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9933",
          "#CC66CC",
          // "#66CC66",
          // "#9999FF",
          // "#FF6666",
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

const DashboardPieChart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/admin/best-selling`);
      // console.log(res);
      setProducts(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
        <p className="mb-4 font-semibold text-gray-800">
          Best Selling Products
        </p>
        <div className="max-h-">
          <BestSellingProductsPieChart data={products} />
        </div>
      </div>
    </>
  );
};

export default DashboardPieChart;

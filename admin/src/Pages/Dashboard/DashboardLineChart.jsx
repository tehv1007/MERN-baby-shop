import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const [revenue, setRevenue] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sales = await axios("/admin/weekly-sales");
      setRevenue(sales.data);
      const orders = await axios("/admin/weekly-orders");
      setOrder(orders.data);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: revenue.map((sale) => sale._id),
    datasets: [
      {
        label: "Weekly Sales",
        data: revenue.map((sale) => sale.totalRevenue),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },
      {
        label: "Weekly Orders",
        data: order.map((sale) => sale.count),
        fill: false,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
        <p className="mb-4 font-semibold text-gray-800">Weekly Sales</p>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-4"></div>
        <Line data={chartData} />
      </div>
    </>
  );
};

export default DashboardChart;

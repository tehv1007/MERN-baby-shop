import { useState } from "react";
import PieChart from "../../components/common/PieChart";

const DataChart = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

const DashboardPieChart = () => {
  const [userData, setUserData] = useState({
    labels: DataChart.map((data) => data.year),
    datasets: [
      {
        label: "Total Orders",
        data: DataChart.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <div className="w-[300px]">
      <PieChart chartData={userData} />
    </div>
  );
};

export default DashboardPieChart;

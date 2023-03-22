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
  return (
    <>
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
          Best Selling Products
        </p>
        <div>
          <canvas
            role="img"
            height={398}
            width={400}
            legend="[object Object]"
            className="chart"
            style={{
              display: "block",
              boxSizing: "border-box",
              height: "318.4px",
              width: 320,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPieChart;

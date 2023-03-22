import { useState } from "react";
import LineChart from "../../components/common/LineChart";

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
    userGain: 65000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 90000,
    userLost: 234,
  },
];

const DashboardChart = () => {
  return (
    <>
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
          Weekly Sales
        </p>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                type="button"
                className="inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  focus:outline-none"
              >
                Sales
              </button>
            </li>
            <li className="mr-2">
              <button
                type="button"
                className="inline-block p-2 rounded-t-lg border-b-2 border-transparent text-orange-500 border-orange-500 dark:text-orange-500 dark:border-orange-500  focus:outline-none"
              >
                Orders
              </button>
            </li>
          </ul>
        </div>
        <canvas
          role="img"
          height={276}
          width={553}
          legend="[object Object]"
          style={{
            display: "block",
            boxSizing: "border-box",
            height: "220.8px",
            width: "442.4px",
          }}
        />
      </div>
    </>
  );
};

export default DashboardChart;

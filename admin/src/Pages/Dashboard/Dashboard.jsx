import TitlePage from "../../components/common/PageTitle";
import DashboardTotal from "./DashboardTotal";
import DashboardPieChart from "./DashboardPieChart";
import DashboardLineChart from "./DashboardLineChart";
import Layout from "../../components/layout/Layout";

const RecentOrders = () => {
  return (
    <>
      <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
        Recent Order
      </h1>
      <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">Order Time</td>
                <td className="px-4 py-3">Delivery Address</td>
                <td className="px-4 py-3">Phone</td>
                <td className="px-4 py-3">Payment method</td>
                <td className="px-4 py-3">Order amount</td>
                <td className="px-4 py-3">Status</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
              <tr className>
                <td className="px-4 py-3">
                  <span className="text-sm">Mar 20, 2023</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm ">dsfsdf</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm">988898989898</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">COD</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm font-semibold">$72.00</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-500 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                      Pending
                    </span>
                  </span>
                </td>
              </tr>
              <tr className>
                <td className="px-4 py-3">
                  <span className="text-sm">Mar 20, 2023</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm ">dsfsdf</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm">988898989898</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">COD</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm font-semibold">$68.00</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-500 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                      Pending
                    </span>
                  </span>
                </td>
              </tr>
              <tr className>
                <td className="px-4 py-3">
                  <span className="text-sm">Mar 19, 2023</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm ">
                    National Institute for Freshwater Fisheries Research, P.M.B
                    6006, New Bussa
                  </span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm">07032185541</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">COD</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm font-semibold">$35.00</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-500 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                      Pending
                    </span>
                  </span>
                </td>
              </tr>
              <tr className>
                <td className="px-4 py-3">
                  <span className="text-sm">Mar 18, 2023</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm ">81</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm">kmk</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">COD</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm font-semibold">$87.00</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-500 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                      Pending
                    </span>
                  </span>
                </td>
              </tr>
              <tr className>
                <td className="px-4 py-3">
                  <span className="text-sm">Mar 17, 2023</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm ">vfe</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm">+5565233</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">Card</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm font-semibold">$99.00</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                      Delivered
                    </span>
                  </span>
                </td>
              </tr>
              <tr className>
                <td className="px-4 py-3">
                  <span className="text-sm">Mar 17, 2023</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm ">12</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm">126</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">COD</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm font-semibold">$56.00</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                      Delivered
                    </span>
                  </span>
                </td>
              </tr>
              <tr className>
                <td className="px-4 py-3">
                  <span className="text-sm">Mar 17, 2023</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm ">12</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm">126</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">COD</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm font-semibold">$46.00</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-blue-500 bg-blue-100 dark:text-white dark:bg-blue-800">
                      Processing
                    </span>
                  </span>
                </td>
              </tr>
              <tr className>
                <td className="px-4 py-3">
                  <span className="text-sm">Mar 15, 2023</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm ">amsd kajsndkansdad</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm">+8801678233444</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">COD</span>
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <span className="text-sm font-semibold">$72.00</span>{" "}
                </td>
                <td className="px-4 py-3">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                      Delivered
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
          <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
            <span className="flex items-center font-semibold tracking-wide uppercase">
              Showing 1-8 of 294
            </span>
            <div className="flex mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-not-allowed"
                      disabled
                      type="button"
                      aria-label="Previous"
                    >
                      <svg
                        className="h-3 w-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300"
                      type="button"
                    >
                      1
                    </button>
                  </li>
                  <li>
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                      type="button"
                    >
                      2
                    </button>
                  </li>
                  <li>
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                      type="button"
                    >
                      3
                    </button>
                  </li>
                  <li>
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                      type="button"
                    >
                      4
                    </button>
                  </li>
                  <li>
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                      type="button"
                    >
                      5
                    </button>
                  </li>
                  <li>
                    <span className="px-2 py-1">...</span>
                  </li>
                  <li>
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                      type="button"
                    >
                      37
                    </button>
                  </li>
                  <li>
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                      type="button"
                      aria-label="Next"
                    >
                      <svg
                        className="h-3 w-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const Dashboard = () => {
  return (
    <Layout>
      <TitlePage title="Dashboard" />
      <DashboardTotal />
      <div className="grid gap-4 md:grid-cols-2 my-8">
        <DashboardLineChart />
        <DashboardPieChart />
      </div>
      <RecentOrders />
    </Layout>
  );
};

export default Dashboard;

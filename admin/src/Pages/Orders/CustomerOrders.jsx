import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import Layout from "../../components/layout/Layout";

const CustomerOrders = () => {
  const { userId } = useParams();
  console.log(userId);

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get(`/admin/${userId}/orders`),
  });

  if (isLoading) return <GlobalSpinner />;
  const { data: orders } = data;
  console.log(orders);

  return (
    <>
      <Layout>
        {orders.length === 0 ? (
          <div className="container grid px-6 mx-auto">
            <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
              Customer Order List
            </h1>
            <div className="w-full bg-white rounded-md dark:bg-gray-800">
              <div className="p-8 text-center">
                <span className="flex justify-center my-30 text-red-500 font-semibold text-6xl">
                  <BsBagCheckFill />
                </span>
                <h2 className="font-medium text-base mt-4 text-gray-600">
                  This Customer have no order Yet!
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto w-full">
            <table className="table w-full text-center ">
              <thead className="text-[#9FA2B4] uppercase">
                <tr>
                  <TableHeaderCell
                    text="text-left"
                    title="Order ID"
                    column="transaction_id"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Time"
                    column="createdAt"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Shipping Address"
                    column="address"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Phone"
                    column="phone"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Amount"
                    column="amount"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Status"
                    column="status"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <th className="font-normal text-[16px]">Action</th>
                  <th className="font-normal text-[16px]">Detail</th>
                </tr>
              </thead>
              <tbody>
                {ordersList.map((item) => (
                  <tr key={item._id} className="text-center">
                    <td className="text-sm text-left">{item.transaction_id}</td>
                    <td className="text-sm">{formatDate(item.createdAt)}</td>
                    <td className="text-sm">${item.address}</td>
                    <td className="text-sm">${item.phoneNumber}</td>
                    <td className="text-sm">${item.amount}</td>
                    <td className="text-center text-sm">
                      <span
                        className={`inline-flex px-2 py-0 rounded-full ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="border rounded py-1 text-sm max-w-xs"
                        value={item.status}
                        onChange={(event) =>
                          handleStatusChange(event, item._id)
                        }
                      >
                        <option>Not processed</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td>
                      {/* Detail */}
                      <Link to={`${item._id}`}>
                        <div className="tooltip" data-tip="Detail">
                          <label className="btn btn-sm btn-square btn-success hover:opacity-60">
                            <FcSearch />
                          </label>
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Order list */}
        {/* <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3">Order ID</td>
                  <td className="px-4 py-3">Time</td>
                  <td className="px-4 py-3">Shipping Address</td>
                  <td className="px-4 py-3">Phone</td>
                  <td className="px-4 py-3">Method</td>
                  <td className="px-4 py-3">Amount</td>
                  <td className="px-4 py-3 text-center">Status</td>
                  <td className="px-4 py-3 text-center">Actions</td>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                <tr className>
                  <td className="px-4 py-3">
                    <span className="font-semibold uppercase text-xs">
                      1622
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">Jan 13, 2023</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">Love street </span>
                  </td>
                  <td className="px-4 py-3">
                    {" "}
                    <span className="text-sm">+2345146</span>{" "}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold">COD</span>
                  </td>
                  <td className="px-4 py-3">
                    {" "}
                    <span className="text-sm font-semibold">$70.00</span>{" "}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-serif">
                      <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                        Delivered
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none">
                      <option value="status" hidden />
                      <option value="Delivered">Delivered</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </td>
                </tr>
                <tr className>
                  <td className="px-4 py-3">
                    <span className="font-semibold uppercase text-xs">
                      09e7
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">Jan 13, 2023</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">hhhhjhh</span>
                  </td>
                  <td className="px-4 py-3">
                    {" "}
                    <span className="text-sm">+069268554</span>{" "}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold">COD</span>
                  </td>
                  <td className="px-4 py-3">
                    {" "}
                    <span className="text-sm font-semibold">$89.00</span>{" "}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-serif">
                      <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                        Delivered
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none">
                      <option value="status" hidden />
                      <option value="Delivered">Delivered</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
            <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
              <span className="flex items-center font-semibold tracking-wide uppercase">
                Showing 1-2 of 2
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
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-not-allowed"
                        disabled
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
        </div> */}
      </Layout>
    </>
  );
};

export default CustomerOrders;

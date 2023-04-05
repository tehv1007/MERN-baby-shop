import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import Pagination from "../../components/layouts/Pagination";
import formatDate from "../../services/formatDate";
import { paginate } from "../../services/productsService";
import NoOrder from "./Dashboard/NoOrder";
import { GiCancel } from "react-icons/gi";
import { BiCommentDetail } from "react-icons/bi";
import CancelModal from "./Dashboard/CancelModal";

const MyOrders = ({ user }) => {
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [id, setId] = useState("");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`/orders/${user._id}/my-orders`);
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  let totalItems = orders.length;

  const paginationParams = {
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  };

  const paginatedArr = paginate(orders, ITEMS_PER_PAGE, page);

  return (
    <Layout>
      <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
        <div className="overflow-hidden rounded-md">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-5">My Orders</h2>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="align-middle border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                {/* Table data */}
                {orders.length > 0 ? (
                  <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                    <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="bg-gray-100">
                          <th className="text-left text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                            OrderTime
                          </th>
                          <th className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                            Method
                          </th>
                          <th className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedArr.map((order) => (
                          <tr key={order._id}>
                            <td className="px-5 py-3 leading-6 whitespace-nowrap">
                              <span className="uppercase text-sm font-medium">
                                {order.transaction_id}
                              </span>
                            </td>
                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                              <span className="text-sm">
                                {formatDate(order.createdAt)}
                              </span>
                            </td>
                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                              <span className="text-sm">
                                {order.paymentMethod}
                              </span>
                            </td>
                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                              <span
                                className={`text-indigo-500 ${order.status.toLowerCase()} rounded-full px-2`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                              <span className="text-sm font-bold">
                                ${order.amount}
                              </span>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap text-center text-sm flex gap-2">
                              {/* Order Detail */}
                              <Link to={`/order/${order._id}`}>
                                <div className="tooltip" data-tip="Detail">
                                  <label className="btn btn-sm btn-square btn-success hover:opacity-60">
                                    <BiCommentDetail />
                                  </label>
                                </div>
                              </Link>

                              {/* Cancel order */}
                              <div
                                className={`tooltip`}
                                data-tip="Cancel"
                                disabled={order.status == "Cancelled"}
                              >
                                <label
                                  htmlFor={
                                    order.status == "Cancelled" ? "" : order._id
                                  }
                                  className={`btn btn-sm btn-square ${
                                    order.status == "Cancelled"
                                      ? "btn-base-300"
                                      : "btn-error"
                                  } hover:opacity-80`}
                                  onClick={() => setId(order._id)}
                                >
                                  <GiCancel />
                                </label>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <CancelModal id={id} />

                    <Pagination
                      setPage={setPage}
                      paginationParams={paginationParams}
                    />
                  </div>
                ) : (
                  <NoOrder />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;

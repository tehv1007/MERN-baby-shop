import axios from "axios";
import formatDate from "../../../services/formatDate";
import NoOrder from "./NoOrder";
import { useQuery } from "@tanstack/react-query";
import GlobalSpinner from "../../../components/common/GlobalSpinner";

const RecentOrders = ({ user }) => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get(`/orders/${user._id}/recent-orders`),
    select: (res) => res.data,
  });

  if (isLoading) return <GlobalSpinner />;

  return (
    <div className="max-w-screen-2xl mx-auto rounded-md">
      <h1 className="my-6 text-lg font-bold text-gray-700">Recent Order</h1>
      <div className="w-full overflow-hidden border border-gray-200 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
        <div className="w-full overflow-x-auto">
          {orders.length > 0 ? (
            <table className="w-full whitespace-no-wrap">
              <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200  bg-gray-100">
                <tr>
                  <td className="px-4 py-3">Order ID</td>
                  <td className="px-4 py-3">Order Time</td>
                  {/* <td className="px-4 py-3">Delivery Address</td> */}
                  <td className="px-4 py-3">Phone</td>
                  <td className="px-4 py-3">Payment method</td>
                  <td className="px-4 py-3">Order amount</td>
                  <td className="px-4 py-3">Status</td>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <span className="text-sm ">{order.transaction_id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">
                        {formatDate(order.createdAt)}
                      </span>
                    </td>
                    {/* <td className="px-4 py-3">
                      <span className="text-sm ">{order.address}</span>
                    </td> */}
                    <td className="px-4 py-3">
                      <span className="text-sm">{order.phoneNumber}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold">
                        ${order.amount}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-serif">
                        <span
                          className={`inline-flex px-2 text-xs font-medium leading-5 rounded-full ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoOrder />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;

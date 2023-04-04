import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../../services/formatDate";

const RecentOrders = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["orders"],
  //   queryFn: () => axios.get("/admin/recent-orders"),
  // });

  // const { data: recentOrders } = data;
  // console.log(recentOrders);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/admin/recent-orders`);
      // console.log(res);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="my-6 text-lg font-bold text-gray-700">Recent Order</h1>
      <div className="w-full overflow-hidden border border-gray-200 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200  bg-gray-100">
              <tr>
                <td className="px-4 py-3">Order ID</td>
                <td className="px-4 py-3">Order Time</td>
                <td className="px-4 py-3">Delivery Address</td>
                <td className="px-4 py-3">Phone</td>
                <td className="px-4 py-3">Payment method</td>
                <td className="px-4 py-3">Order amount</td>
                <td className="px-4 py-3">Status</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
              {data.map((order, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">
                    <span className="text-sm ">{order.transaction_id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">
                      {formatDate(order.createdAt)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm ">{order.address}</span>
                  </td>
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
        </div>
      </div>
    </>
  );
};

export default RecentOrders;

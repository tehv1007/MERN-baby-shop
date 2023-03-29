import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import formatDate from "../../../services/formatDate";

import Logo from "../../../assets/img/Logo.webp";

const Invoice = () => {
  const { orderId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => axios.get(`/orders/${orderId}`),
  });

  if (isLoading) return <GlobalSpinner />;
  const { data: order } = data;
  //   console.log(order);

  return (
    <>
      <div className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <div className>
          <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
            <h1 className="font-bold font-serif text-xl uppercase">
              Invoice
              <p className="text-xs mt-1 text-gray-500">
                Status:
                <span className="pl-2 font-medium text-xs capitalize">
                  <span className="font-serif">
                    <span
                      className={`inline-flex px-2 text-xs font-medium leading-5 rounded-full ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </span>
                </span>
              </p>
            </h1>
            <div className="lg:text-right text-left">
              <h2 className="lg:flex lg:justify-end text-lg font-serif font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
                <img src={Logo} alt="Birth Blessing" width={150} />
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                59C Nguyen Dinh Chieu, P6, Q3, <br /> Ho Chi Minh
              </p>
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
            <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                Date
              </span>
              <span className="text-sm text-gray-500 block">
                <span>{formatDate(order.createdAt)}</span>
              </span>
            </div>
            <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                Invoice No
              </span>
              <span className="text-sm text-gray-500 block">
                #{order.transaction_id}
              </span>
            </div>
            <div className="flex flex-col lg:text-right text-left">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                Invoice To.
              </span>
              <span className="text-sm text-gray-500">{order.address}</span>
            </div>
          </div>
        </div>

        {/* Products table */}
        <div>
          <div className="w-full overflow-hidden border border-gray-200 rounded-lg my-8">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
                  <tr>
                    <td className="px-4 py-3"> Product ID</td>
                    <td className="px-4 py-3">Product Name</td>
                    <td className="px-4 py-3 text-center">Quantity</td>
                    <td className="px-4 py-3 text-center">Item Price</td>
                    <td className="px-4 py-3 text-center">Amount</td>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-gray-700 text-serif text-sm">
                  {order.products?.map((product) => (
                    <tr className="" key={product._id}>
                      <td className="px-4 py-3 whitespace-nowrap font-normal text-gray-500 text-left">
                        {product.productId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-normal text-gray-500 flex items-center gap-2">
                        <img
                          src={product.image}
                          alt="product image"
                          className="rounded-md w-[64px] h-[64px]"
                        />
                        {product.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-center">
                        {product.quantity}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-center">
                        ${product.price}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-red-500">
                        ${(product.quantity * product.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50">
          <div className="flex lg:flex-row md:flex-row flex-col justify-between">
            <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
                Payment Method
              </span>
              <span className="text-sm text-gray-500 font-semibold font-serif block">
                {order.paymentMethod || "Credit Card"}
              </span>
            </div>

            {/* Shipping Cost */}
            <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
                Shipping Cost
              </span>
              <span className="text-sm text-gray-500 font-semibold font-serif block">
                $5.00
              </span>
            </div>

            {/* Discount */}
            <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
                Discount
              </span>
              <span className="text-sm text-gray-500 font-semibold font-serif block">
                $0.00
              </span>
            </div>

            {/* Total Amount */}
            <div className="flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
                Total Amount
              </span>
              <span className="text-xl font-serif font-bold text-red-500 block">
                ${order.amount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;

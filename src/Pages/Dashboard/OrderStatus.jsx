import axios from "axios";
import { useEffect, useState } from "react";
import { FiShoppingCart, FiTruck, FiCheck } from "react-icons/fi";
import { HiArrowPath } from "react-icons/hi2";
import { MdOutlineCancel } from "react-icons/md";
import { VscServerProcess } from "react-icons/vsc";
import Progress from "../../components/common/Progress";

const CountItem = ({
  isLoading,
  orderType,
  title,
  children,
  textStyle,
  bgStyle,
}) => {
  return (
    <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white flex h-full">
      <div className="p-4 flex items-center border border-gray-200 w-full rounded-lg">
        <div
          className={`flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg ${textStyle} ${bgStyle}`}
        >
          {children}
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            <span>{title}</span>
          </p>

          {isLoading ? (
            <Progress />
          ) : (
            <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
              {orderType}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderStatus = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(`/admin/count-orders`);
      setData(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const {
    totalOrders,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
  } = data;

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-8">
        <CountItem
          isLoading={isLoading}
          orderType={totalOrders}
          title="Total Order"
          textStyle="text-orange-600"
          bgStyle="bg-orange-100"
        >
          <FiShoppingCart />
        </CountItem>

        <CountItem
          isLoading={isLoading}
          orderType={pendingOrders}
          title="Order Pending"
          textStyle="text-blue-600"
          bgStyle="bg-blue-100"
        >
          <HiArrowPath />
        </CountItem>

        <CountItem
          isLoading={isLoading}
          orderType={processingOrders}
          title="Order Processing"
          textStyle="text-teal-600"
          bgStyle="bg-teal-100"
        >
          <VscServerProcess />
        </CountItem>

        <CountItem
          isLoading={isLoading}
          orderType={shippedOrders}
          title="Shipped Order"
          textStyle="text-yellow-600"
          bgStyle="bg-yellow-100"
        >
          <FiTruck />
        </CountItem>

        <CountItem
          isLoading={isLoading}
          orderType={deliveredOrders}
          title="Order Delivered"
          textStyle="text-green-600"
          bgStyle="bg-green-100"
        >
          <FiCheck />
        </CountItem>
        <CountItem
          isLoading={isLoading}
          orderType={cancelledOrders}
          title="Order Cancelled"
          textStyle="text-gray-600"
          bgStyle="bg-gray-100"
        >
          <MdOutlineCancel />
        </CountItem>
      </div>
    </section>
  );
};

export default OrderStatus;

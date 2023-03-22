import { FiShoppingCart, FiTruck, FiCheck } from "react-icons/fi";
import { HiArrowPath } from "react-icons/hi2";
import { ImCreditCard, ImStack } from "react-icons/im";

const DashboardCard = ({}) => {
  return (
    <section className="grid px-6 mx-auto">
      {/* Section 1 */}
      <div className="grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3">
        <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full">
          <div className="p-4 border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-green-100 bg-teal-500">
            <div className="text-center inline-block text-3xl text-white dark:text-green-100 bg-teal-500">
              <ImStack />
            </div>
            <div>
              <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                Today Order
              </p>
              <p className="text-3xl font-bold leading-none text-gray-50 dark:text-gray-50">
                $0
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full">
          <div className="p-4 border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-green-100 bg-blue-500">
            <div className="text-center inline-block text-3xl text-white dark:text-green-100 bg-blue-500">
              <FiShoppingCart />
            </div>
            <div>
              <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                This Month
              </p>
              <p className="text-3xl font-bold leading-none text-gray-50 dark:text-gray-50">
                $4172.40
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full">
          <div className="p-4 border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-green-100 bg-green-500">
            <div className="text-center inline-block text-3xl text-white dark:text-green-100 bg-green-500">
              <ImCreditCard />
            </div>
            <div>
              <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                Total Order
              </p>
              <p className="text-3xl font-bold leading-none text-gray-50 dark:text-gray-50">
                $39429.95
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
          <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500">
              <FiShoppingCart />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span>Total Order</span>{" "}
              </p>
              <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                294
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
          <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500">
              <HiArrowPath />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span>Order Pending</span>{" "}
                <span className="text-red-400 text-sm font-semibold">
                  (5606.50)
                </span>
              </p>
              <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                40
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
          <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500">
              <FiTruck />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span>Order Processing</span>{" "}
              </p>
              <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                40
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full">
          <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500">
              <FiCheck />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span>Order Delivered</span>{" "}
              </p>
              <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                213
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DashboardTotal = () => {
  return (
    <>
      <DashboardCard />
    </>
  );
};

export default DashboardTotal;

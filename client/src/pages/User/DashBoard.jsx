import Layout from "../../components/layouts/Layout";
import OrderStatus from "./Dashboard/OrderStatus";
import RecentOrders from "./Dashboard/RecentOrders";

const DashBoard = ({ user }) => {
  return (
    <>
      <Layout>
        <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
          <div className="overflow-hidden">
            <h2 className="text-xl font-serif font-semibold mb-5">Dashboard</h2>
            <OrderStatus user={user} />
            <div className="max-w-screen-2xl mx-auto">
              <RecentOrders user={user} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DashBoard;

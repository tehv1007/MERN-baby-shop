import TitlePage from "../../components/common/PageTitle";
import DashboardPieChart from "./DashboardPieChart";
import DashboardLineChart from "./DashboardLineChart";
import Layout from "../../components/layout/Layout";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import OrderStatus from "./OrderStatus";

const Dashboard = () => {
  return (
    <Layout>
      <TitlePage title="Dashboard" />
      <div className="grid px-6 mx-auto">
        <Revenue />
        <OrderStatus />
      </div>
      <div className="grid gap-4 md:grid-cols-2 my-8">
        <DashboardLineChart />
        <DashboardPieChart />
      </div>
      <RecentOrders />
    </Layout>
  );
};

export default Dashboard;

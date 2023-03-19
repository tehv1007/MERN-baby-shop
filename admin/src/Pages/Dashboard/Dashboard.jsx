import TitlePage from "../../components/common/PageTitle";
import DashboardTotal from "./DashboardTotal";
import DashboardPieChart from "./DashboardPieChart";
import DashboardLineChart from "./DashboardLineChart";
import NewSidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 false">
      <NewSidebar />
      <div className="flex flex-col flex-1 w-full ml-4">
        <TitlePage title="Dashboard" />
        <DashboardTotal />
        <div className="mt-10 flex items-center gap-14">
          <DashboardLineChart />
          <DashboardPieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import TitlePage from "../../components/common/TitlePage";
import DashboardTotal from "./DashboardTotal";
import DashboardPieChart from "./DashboardPieChart";
import DashboardLineChart from "./DashboardLineChart";

const Dashboard = () => {
  return (
    <>
      <TitlePage title="Dashboard" />
      <DashboardTotal />
      <div className="mt-10 flex items-center gap-14">
        <DashboardLineChart />
        <DashboardPieChart />
      </div>
    </>
  );
};

export default Dashboard;

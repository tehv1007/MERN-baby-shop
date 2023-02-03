import TitlePage from "../../components/common/TitlePage";
import OrderTable from "./OrderTable";

const Orders = () => {
  return (
    <>
      <div>
        <TitlePage title="Orders" />
        <div className="flex justify-between items-center mt-5 my-2">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-white input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <OrderTable />
      </div>
    </>
  );
};

export default Orders;

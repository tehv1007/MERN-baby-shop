import { BsCloudDownload, BsPrinter } from "react-icons/bs";
import Layout from "../../components/layouts/Layout";
import Invoice from "./Dashboard/Invoice";

const OrderDetail = () => {
  return (
    <Layout>
      <Invoice />
      <div className="mb-4 mt-3 flex justify-between items-center text-sm leading-5 font-medium text-white">
        {/* <a
          download="Invoice"
          href="blob:https://dashtar-admin.vercel.app/02321e6a-25a1-4fda-bccc-a3dfbfa88f1c"
        > */}
        <button
          className="flex transition-colors duration-150 focus:outline-none px-5 py-2 rounded-md bg-green-500 border border-transparent hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto"
          // onClick={handleDownload}
        >
          Download Invoice{" "}
          <span className="ml-2 text-base">
            <BsCloudDownload />
          </span>
        </button>
        {/* </a> */}
        <button
          className="flex transition-colors duration-150 focus:outline-none px-5 py-2 rounded-md bg-green-500 border border-transparent hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto"
          // onClick={handlePrint}
        >
          Print Invoice{" "}
          <span className="ml-2">
            <BsPrinter />
          </span>
        </button>
      </div>
    </Layout>
  );
};

export default OrderDetail;

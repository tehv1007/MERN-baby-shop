import { RxDashboard, RxLockOpen1 } from "react-icons/rx";
import { VscListUnordered } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { Link } from "react-router-dom";

const SideBar = ({ user }) => {
  return (
    <>
      <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10 xl:mr-10">
        <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
          <Link
            to="/user/dashboard"
            className="p-2 my-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
          >
            <RxDashboard />
            <label className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600 cursor-pointer">
              Dashboard
            </label>
          </Link>

          <Link
            to="/user/my-orders"
            className="p-2 my-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
          >
            <VscListUnordered />
            <label className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600 cursor-pointer">
              My Orders
            </label>
          </Link>

          <Link
            to="/user/update-profile"
            className="p-2 my-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
          >
            <FiSettings />
            <label className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600 cursor-pointer">
              Update Profile
            </label>
          </Link>

          <Link
            to="/user/change-password"
            className="p-2 my-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
          >
            <GrDocumentText />
            <label className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600 cursor-pointer">
              Change Password
            </label>
          </Link>

          <Link
            to="/signout"
            className="p-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
          >
            <span className="mr-2">
              <RxLockOpen1 />
            </span>
            <button className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;

import { RxDashboard, RxLockOpen1 } from "react-icons/rx";
import { VscListUnordered } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const SidebarItem = ({ children, title, href }) => {
  const style =
    "p-2 my-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600";

  const [activeState, setActiveState] = useState(false);

  useEffect(() => {
    const isActive = window.location.pathname === `/${href}`;
    setActiveState(isActive);
  }, [href]);

  return (
    <div className="relative">
      <NavLink
        className={
          activeState ? `text-green-500 bg-green-100 ${style}` : `${style}`
        }
        to={`/${href}`}
      >
        {activeState && (
          <span
            className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"
            aria-hidden="true"
          />
        )}
        {children}
        <label className="inline-flex items-center justify-between ml-2 text-sm font-medium hover:text-emerald-600 cursor-pointer">
          {title}
        </label>
      </NavLink>
    </div>
  );
};

const SideBar = () => {
  return (
    <>
      <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10 xl:mr-10">
        <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
          <SidebarItem title="Dashboard" href="user/dashboard">
            <RxDashboard />
          </SidebarItem>

          <SidebarItem title="My Orders" href="user/my-orders">
            <VscListUnordered />
          </SidebarItem>

          <SidebarItem title="Update Profile" href="user/update-profile">
            <FiSettings />
          </SidebarItem>

          <SidebarItem title="Change Password" href="user/change-password">
            <GrDocumentText />
          </SidebarItem>

          <SidebarItem title="Logout" href="signout">
            <RxLockOpen1 />
          </SidebarItem>
        </div>
      </div>
    </>
  );
};

export default SideBar;

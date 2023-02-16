import { useState } from "react";
import { FaThList, FaShoppingBag, FaUserFriends } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import Logo from "../../assets/Logo.webp";
import { NavLink } from "react-router-dom";

const menuItems = [
  { path: "/", name: "Dashboard", icon: <FaThList /> },
  { path: "/products", name: "Products", icon: <FaShoppingBag /> },
  { path: "/users", name: "Users", icon: <FaUserFriends /> },
  { path: "/orders", name: "Orders", icon: <MdOutlineAddShoppingCart /> },
];

const Sidbar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const toggle = () => setOpen(!open);
  return (
    <>
      {/* Container */}
      <div className="h-screen">
        {/* Layout */}
        <div className="flex overflow-auto">
          {/* Sidbar */}
          <div
            className={`${open ? "w-[260px]" : "w-12"} bg-[#3D405B] h-screen`}>
            <div className="mt-2 ml-2 mb-8 flex items-center gap-4">
              <img
                style={{ display: open ? "block" : "none" }}
                className="w-48"
                src={Logo}
                alt="logo"
              />
              <FiMenu
                onClick={toggle}
                className="text-white text-lg cursor-pointer"
              />
            </div>
            <div className="flex flex-col content-between">
              {menuItems.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className="py-[10px] px-[8px] flex items-center gap-2 transition-all duration-500 hover:bg-blue-200">
                  <p className="text-white text-lg">{item.icon}</p>
                  <p
                    style={{ display: open ? "block" : "none" }}
                    className="text-white text-lg">
                    {item.name}
                  </p>
                </NavLink>
              ))}
              <div className="mt-20 ml-2 flex items-center gap-2">
                <FiLogOut className="text-white text-lg" />
                <p
                  style={{ display: open ? "block" : "none" }}
                  className="text-white text-lg">
                  Log out
                </p>
              </div>
            </div>
          </div>
          {/* Page */}
          <div className=" p-5 text-lg font-semibold">
            <main
              className={`${open ? "w-[80%]" : "w-[94%]"} fixed overflow-auto`}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidbar;

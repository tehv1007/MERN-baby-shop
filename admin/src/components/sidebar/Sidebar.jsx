import React, { useContext } from "react";
import Logo from "../../assets/Logo.webp";
import { AuthContext } from "../../context/AuthContext";
import CategoryIcon from "../common/icons/CategoryIcon";
import CouponIcon from "../common/icons/CouponIcon";
import CustomerIcon from "../common/icons/CustomerIcon";
import DashboardIcon from "../common/icons/DashboardIcon";
import LogoutIcon from "../common/icons/LogoutIcon";
import OrderIcon from "../common/icons/OrderIcon";
import ProductIcon from "../common/icons/ProductIcon";

const NewSidebar = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <aside className="z-30 h-full flex-shrink-0 shadow-sm w-64 overflow-y-auto bg-white lg:block">
      <div className="py-4 text-gray-500">
        <a className=" text-gray-900" href="/">
          <img src={Logo} alt="Logo" width={135} className="pl-6" />
        </a>
        <ul className="mt-8 items-center text-sm font-semibold w-full">
          {/* Dashboard */}
          <li className="relative">
            <a
              className="px-6 py-4 inline-flex transition-colors duration-150 hover:text-green-700"
              href="/"
            >
              <DashboardIcon />
              <span className="ml-4">Dashboard</span>
            </a>
          </li>

          {/* Products */}
          <li className="relative">
            <a
              className="px-6 py-4 inline-flex transition-colors duration-150 hover:text-green-700 active:text-green-500"
              href="/products"
              aria-current="page"
            >
              {/* <span
                  className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                /> */}
              <ProductIcon />
              <span className="ml-4">Products</span>
            </a>
          </li>

          {/* Category */}
          <li className="relative">
            <a
              className="px-6 py-4 inline-flex transition-colors duration-150 hover:text-green-700"
              href="/category"
            >
              <CategoryIcon />
              <span className="ml-4">Category</span>
            </a>
          </li>

          {/* Customers */}
          <li className="relative">
            <a
              className="px-6 py-4 inline-flex transition-colors duration-150 hover:text-green-700"
              href="/customers"
            >
              <CustomerIcon />
              <span className="ml-4">Customers</span>
            </a>
          </li>

          {/* Orders */}
          <li className="relative">
            <a
              className="px-6 py-4 inline-flex transition-colors duration-150 hover:text-green-700"
              href="/orders"
            >
              <OrderIcon />
              <span className="ml-4">Orders</span>
            </a>
          </li>

          {/* Coupon */}
          <li className="relative">
            <a
              className="px-6 py-4 inline-flex transition-colors duration-150 hover:text-green-700"
              href="/coupons"
            >
              <CouponIcon />
              <span className="ml-4">Coupons</span>
            </a>
          </li>
        </ul>

        {/* Logout Action */}
        <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block items-center leading-5 font-medium">
          <button
            className="align-bottom inline-flex justify-center cursor-pointer transition-colors duration-150 focus:outline-none px-5 py-3 rounded-lg text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 w-full"
            type="button"
            onClick={handleLogout}
          >
            <span className="flex">
              <LogoutIcon />
              <span className="text-sm">Log out</span>
            </span>
          </button>
        </span>
      </div>
    </aside>
    // </div>
  );
};

export default NewSidebar;

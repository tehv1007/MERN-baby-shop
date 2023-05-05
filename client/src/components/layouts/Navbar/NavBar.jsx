import { Link } from "react-router-dom";
import Logo from "../../../assets/img/Logo.webp";
import { BiUser } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import DropMenu from "./DropMenu";
import subNavLink from "./link";
import NavLink from "./NavLink";
import { getTotalQuantity } from "../../../services/cartService";
import Progress from "../../common/Progress";
import { getCartItems } from "../../../hooks/useCart";

const Navbar = ({ user }) => {
  let isLoadingState;
  let totalQuantity = 0;
  let items = [];

  if (user != null) {
    const { data, isLoading } = getCartItems(user);
    isLoadingState = isLoading;

    if (typeof data == "object" && data.data != "null") {
      items = data?.data.products;
      totalQuantity = getTotalQuantity(items);
    }
  }

  return (
    <div className="bg-white  shadow-md">
      {/* Containier */}
      <div className="max-w-screen-xl mx-auto px-4 relative">
        {/* Layout */}
        <div className="flex justify-between items-center py-3">
          <div className="flex gap-2">
            {/* Drop Menu */}
            <DropMenu />
            {/* Logo */}
            <Link to="/">
              <img className="text-[40px]" src={Logo} alt="Birth blessing" />
            </Link>
          </div>
          {/* Navbar */}
          <div className="text-gray-500">
            {/* Menu Web */}
            <nav className="hidden md:flex items-center text-xl gap-10">
              {subNavLink.map((item) => {
                return (
                  <NavLink
                    key={item.title}
                    className="hover:text-black transition duration-500 hover:border-b-2 hover:border-black"
                    to={item.to}
                    title={item.title}
                  />
                );
              })}
            </nav>
          </div>

          {/* Button */}
          <div className="flex items-center gap-4 pl-2">
            <div className=" items-center">
              {user != null ? (
                isLoadingState ? (
                  <Progress />
                ) : (
                  <Link to="/user/dashboard">
                    <div>
                      <img
                        src={user.image}
                        alt="User Avatar"
                        className="rounded-full w-auto max-h-10 block"
                      />
                    </div>
                  </Link>
                )
              ) : (
                <div className="items-center">
                  <Link to="/signin">
                    <BiUser className="text-3xl text-[#212529]" />
                  </Link>
                </div>
              )}
            </div>
            <div className="">
              <button className="relative">
                <Link to="/cart">
                  <BsCartPlus className="text-3xl text-[#212529]" />
                </Link>
              </button>
              <span className="absolute top-3 right-2 sm:right-[7px] lg:right-[8px] xl:right-[8px] bg-[#212529] text-white w-5 h-5 text-center rounded-full">
                {totalQuantity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const NavNew = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a className="justify-between">
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to="/">
          <img className="text-[40px]" src={Logo} alt="Birth blessing" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <a>
              Parent
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* Button */}
        <div className="flex items-center gap-4 pl-2">
          <div className=" items-center">
            {user != null ? (
              isLoadingState ? (
                <Progress />
              ) : (
                <Link to="/user/dashboard">
                  <div>
                    <img
                      src={user.image}
                      alt="User Avatar"
                      className="rounded-full w-auto max-h-10 block"
                    />
                  </div>
                </Link>
              )
            ) : (
              <div className="items-center">
                <Link to="/signin">
                  <BiUser className="text-3xl text-[#212529]" />
                </Link>
              </div>
            )}
          </div>
          <div className="">
            <button className="relative">
              <Link to="/cart">
                <BsCartPlus className="text-3xl text-[#212529]" />
              </Link>
            </button>
            <span className="absolute top-3 right-2 sm:right-[7px] lg:right-[8px] xl:right-[8px] bg-[#212529] text-white w-5 h-5 text-center rounded-full">
              {totalQuantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

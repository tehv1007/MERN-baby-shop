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

const Navbar = ({ user, isConnected }) => {
  let isLoadingState;
  let totalQuantity = 0;
  let items = [];

  if (user) {
    const { data, isLoading } = getCartItems(user);
    isLoadingState = isLoading;
    if (typeof data == "object" && data.data != "null") {
      items = data?.data?.products;
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
              <img className="text-[40px]" src={Logo} alt="" />
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
          <div className="flex items-center gap-4 ">
            <div className=" items-center">
              {isConnected ? (
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
                <Link to="/viewcart">
                  <BsCartPlus className="text-3xl text-[#212529]" />
                </Link>
              </button>
              <span className="absolute top-3 right-2 sm:right-[7px]  lg:right-[8px] xl:right-[8px] bg-[#212529] text-white w-5 h-5 text-center rounded-full">
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

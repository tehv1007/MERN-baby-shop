import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/img/Logo.webp";
import { BiUser } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import DropMenu from "./DropMenu";
import subNavLink from "./link";

const Navbar = () => {
  return (
    <div className="bg-white md:fixed w-full z-10 border-b-2">
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
            <nav className="hidden md:flex items-center text-xl md:gap-14 lg:gap-20">
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
          <div className="flex gap-4 md:gap-9">
            <Link to="/signin">
              <BiUser className="text-3xl text-[#212529]" />
            </Link>
            <div className="">
              <button className="relative">
                <BsCartPlus className="text-3xl text-[#212529]" />
              </button>
              <span className="absolute  top-3 right-2 sm:right-[7px]  lg:right-[8px] xl:right-[8px] bg-[#212529] text-white w-5 h-5 text-center rounded-full">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

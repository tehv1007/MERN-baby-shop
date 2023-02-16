import { Link } from "react-router-dom";
import EditIcon from "../../components/common/icons/EditIcon";

const SideBar = ({ user }) => {
  return (
    <>
      {" "}
      <div className="lg:w-[40%] flex flex-row-reverse justify-between lg:block">
        <div className="lg:hidden flex items-center">
          <button className="px-2 flex gap-1">
            <EditIcon />
            <span>Edit Profile</span>
          </button>
        </div>
        <div className="lg:flex-col">
          <button className="pr-2">
            <img
              src={user.image}
              alt="user face"
              className="rounded-lg"
              height={80}
              width={80}
            />
          </button>
          <div className="mt-2" />
          <span className="name mt-3">{user.name}</span>
          <br />
          <span className="number">
            📧 : <span className="font-bold text-base">{user.email}</span>
          </span>
        </div>

        <div className="hidden lg:block mt-2 py-2 text-lg">
          <div className="">
            <button className="mt-1 mb-3">
              <Link
                to="/profile"
                className="pr-10 lg:pr-36 py-2 rounded-md hover:pl-2 hover:-pr-2 hover:bg-green-700/70 hover:text-white transition-all">
                🛒: My Orders
              </Link>
            </button>
            <br />
            <button className="mt-1">
              <Link
                to="/profile/edit"
                className="pr-10 lg:pr-36 py-2 rounded-md pl-2 bg-gray-400/95 hover:bg-green-700/70 hover:text-white transition-all">
                🆔: My Profile
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

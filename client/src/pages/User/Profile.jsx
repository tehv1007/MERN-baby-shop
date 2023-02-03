import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "../../components/common/icons/EditIcon";
import SearchIcon from "../../components/common/icons/SearchIcon";
import MyOrders from "./MyOrder";

function Profile({ user }) {
  console.log(user);
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return axios.get(`/orders/${user._id}`);
    },
    cacheTime: 5 * 60 * 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;
  const { data: orders } = data;

  return (
    <div className="max-w-screen-xl mx-auto mt-4 p-4">
      <h1 className="mb-8 text-center text-3xl text-gray-700">
        Hello {user.name}
      </h1>
      <div className="lg:flex p-4 bg-gray-50 rounded-lg">
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
                  className="pr-10 lg:pr-36 py-2 rounded-md pl-2 bg-gray-400/95 text-white hover:bg-green-700/70 hover:text-white transition-all">
                  🆔: My Profile
                </Link>
              </button>
            </div>
          </div>
        </div>
        {/* My Orders */}
        <div className="w-full rounded-md bg-white mt-2 lg:mt-0">
          <div className="p-2">
            <div className="flex items-center gap-2 p-2 rounded-t-md">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search your recent orders or products"
                className="w-full p-1 rounded"
              />
            </div>
            <div className="pb-2">
              {orders ? (
                <>
                  <h1 className="my-4">Order list:</h1>
                  <ul>
                    {orders.map((order, index) => (
                      <li key={index} className="my-4">
                        <MyOrders order={order} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

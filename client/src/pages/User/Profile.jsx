import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "../../components/common/icons/EditIcon";
import SearchIcon from "../../components/common/icons/SearchIcon";
import MyOrders from "./MyOrder";
import SideBar from "./SideBar";

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
        <SideBar user={user} />
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

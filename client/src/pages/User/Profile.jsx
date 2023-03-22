import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import SearchIcon from "../../components/common/icons/SearchIcon";
import Pagination from "../../components/layouts/Pagination";
import { paginate } from "../../services/productsService";
import MyOrders from "./MyOrder";
import SideBar from "./SideBar";

function Profile({ user }) {
  // console.log(user);
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return axios.get(`/orders/${user._id}`);
    },
    cacheTime: 5 * 60 * 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;
  const { data: orders } = data;

  let totalItems = orders.length;

  const paginationParams = {
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  };

  const paginatedArr = paginate(orders, ITEMS_PER_PAGE, page);

  return (
    <div className="max-w-screen-xl mx-auto mt-4 p-4">
      <h1 className="mb-8 text-center text-3xl text-gray-700">
        Hello <span className="font-bold">{user.name}</span>
      </h1>
      <div className="lg:flex p-4 bg-gray-50 rounded-lg">
        <SideBar user={user} />

        {/* My Orders */}
        <div className="w-full rounded-md bg-white mt-2 lg:mt-0">
          <div className="p-2">
            <div className="flex items-center gap-2 px-4 rounded-t-md">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search your recent orders or products"
                className="w-full p-1 rounded border "
              />
            </div>
            <div className="pb-2">
              {orders ? (
                <>
                  <h1 className="my-4 px-4 font-bold text-3xl">Order list:</h1>
                  <ul>
                    {paginatedArr.map((order, index) => (
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
          <Pagination setPage={setPage} paginationParams={paginationParams} />
        </div>
      </div>
    </div>
  );
}

export default Profile;

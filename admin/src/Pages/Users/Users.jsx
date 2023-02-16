import TitlePage from "../../components/common/TitlePage";
import UserTable from "./UserTable";
import { useState } from "react";
import Pagination from "../../components/common/Pagination";
import { paginate } from "../../Services/productsService";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GlobalSpinner from "../../components/GlobalSpinner";
import UserT from "./UserTable";

const Users = () => {
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      setPage(1);
      return axios.get("/admin/users");
    },
    cacheTime: 5 * 60 * 1000,
  });
  if (isLoading) return <GlobalSpinner />;
  const { data: users } = data;
  console.log(users);

  let totalItems = users.length;
  const paginationParams = {
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  };

  const paginatedArr = paginate(users, ITEMS_PER_PAGE, page);

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <TitlePage title="Users" />
        {/* <div className="flex justify-between items-center mt-5 my-2">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-white input input-bordered w-full max-w-xs"
            />
          </div>
        </div> */}
        {/* <UserTable users={paginatedArr} /> */}
        <UserT />
        {/* <Pagination setPage={setPage} paginationParams={paginationParams} /> */}
      </div>
    </>
  );
};

export default Users;

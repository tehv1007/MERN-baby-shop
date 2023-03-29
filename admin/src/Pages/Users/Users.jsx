import PageTitle from "../../components/common/PageTitle";
import UserTable from "./UserTable";
import { useState } from "react";
import Pagination from "../../components/common/Pagination";
import { paginate } from "../../Services/productsService";
import Layout from "../../components/layout/Layout";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import useDebounce from "../../hooks/useDebounce";
import useTableData from "../../hooks/usetableData";

const Users = () => {
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const debouncedSearch = useDebounce(searchString, 500);
  const searchFields = ["username", "name", "email"];

  const ITEMS_PER_PAGE = 7;

  const { data, isLoading } = useTableData("users");
  if (isLoading) return <GlobalSpinner />;
  const { data: users } = data;
  // console.log(users);

  const sortableData = [...users];
  if (sortConfig.key) {
    sortableData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const filteredData = sortableData.filter((item) => {
    const searchRegex = new RegExp(debouncedSearch, "i");
    return searchFields.some((field) => searchRegex.test(item[field]));
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (column) => {
    if (!sortConfig.key) {
      return "text-gray-400 hover:text-gray-600";
    }
    return sortConfig.key === column && sortConfig.direction === "ascending"
      ? "text-gray-900 font-semibold"
      : "text-gray-400 hover:text-gray-600";
  };

  let totalItems = filteredData.length;
  const paginationParams = {
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  };

  const paginatedArr = paginate(filteredData, ITEMS_PER_PAGE, page);

  return (
    <>
      <Layout>
        <PageTitle title="Users" />
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <input
              onChange={(e) => setSearchString(e.target.value)}
              type="text"
              value={searchString}
              placeholder="Search user here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <UserTable
          users={paginatedArr}
          sortConfig={sortConfig}
          getSortDirection={getSortDirection}
          requestSort={requestSort}
        />
        <Pagination setPage={setPage} paginationParams={paginationParams} />
      </Layout>
    </>
  );
};

export default Users;

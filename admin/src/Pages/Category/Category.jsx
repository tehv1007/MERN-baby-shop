import PageTitle from "../../components/common/PageTitle";
import Layout from "../../components/layout/Layout";
import CategoryTable from "./CategoryTable";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import { getAllCategories } from "../../hooks/useCategory";
import { paginate } from "../../services/productsService";
import Pagination from "../../components/common/Pagination";
import { useSearchParams } from "react-router-dom";

const Category = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const ITEMS_PER_PAGE = 7;
  const [searchString, setSearchString] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const debouncedSearch = useDebounce(searchString, 500);
  const searchFields = ["title", "collections"];

  const { isLoading, data: categories } = getAllCategories();
  if (isLoading) return <GlobalSpinner />;

  // Sorting, filtering, searching
  const sortableData = [...categories];
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
    <Layout>
      <PageTitle title="Category" />
      <div className="flex justify-between items-center my-2">
        <div className="flex items-center">
          <input
            onChange={(e) => setSearchString(e.target.value)}
            type="text"
            value={searchString}
            placeholder="Search admin user here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <Link to="new" className="btn btn-outline btn-accent">
          Add New
        </Link>
      </div>
      <CategoryTable
        categories={paginatedArr}
        sortConfig={sortConfig}
        getSortDirection={getSortDirection}
        requestSort={requestSort}
      />
      <Pagination setPage={setPage} paginationParams={paginationParams} />
    </Layout>
  );
};

export default Category;

import { Link } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import ProductTable from "./ProductTable";
import { useState } from "react";
import Pagination from "../../components/common/Pagination";
import { paginate } from "../../services/productsService";
import Layout from "../../components/layout/Layout";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import useDebounce from "../../hooks/useDebounce";
import useTableData from "../../hooks/usetableData";

const Products = () => {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  const [searchString, setSearchString] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const debouncedSearch = useDebounce(searchString, 500);

  const { data, isLoading } = useTableData("products");
  if (isLoading) return <GlobalSpinner />;
  const { data: products } = data;

  const sortableProducts = [...products];
  if (sortConfig.key) {
    sortableProducts.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const filteredData = sortableProducts.filter((product) => {
    const searchRegex = new RegExp(debouncedSearch, "i");
    return (
      searchRegex.test(product.title) || searchRegex.test(product.category)
    );
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
        <PageTitle title="Products" />
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <input
              onChange={(e) => setSearchString(e.target.value)}
              type="text"
              value={searchString}
              placeholder="Search product here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <Link to="new" className="btn btn-outline btn-accent">
            Add New
          </Link>
        </div>
        <ProductTable
          products={paginatedArr}
          sortConfig={sortConfig}
          getSortDirection={getSortDirection}
          requestSort={requestSort}
        />
        <Pagination setPage={setPage} paginationParams={paginationParams} />
      </Layout>
    </>
  );
};

export default Products;

import { useState } from "react";
import Pagination from "../../components/layouts/Pagination";
import ProductGrid from "./ProductGrid";
import ColumnDisplayIcon from "../../components/common/icons/ColumnDisplayIcon";
import RowDisplayIcon from "../../components/common/icons/RowDisplayIcon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  sortNumbers,
  sortNames,
  paginate,
} from "../../services/productsService";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import useDebounce from "../../hooks/useDebounce";

const Products = ({ user }) => {
  const [category, setCategory] = useState("all");
  const [sortType, setSortType] = useState("");
  const [page, setPage] = useState(1);
  const [display, setDisplay] = useState(true);
  const [searchString, setSearchString] = useState("");
  const debouncedSearch = useDebounce(searchString, 500);

  const ITEMS_PER_PAGE = 8;

  const { data, isLoading } = useQuery({
    queryKey: ["products", { category: category }],
    queryFn: () => {
      setPage(1);
      return axios.get("/products", {
        params: category !== "all" && { category: category },
      });
    },
  });

  if (isLoading) return <GlobalSpinner />;

  const products = data.data.products;

  const filteredProducts = products.filter((product) => {
    const searchRegex = new RegExp(debouncedSearch, "i");
    return (
      searchRegex.test(product.title) || searchRegex.test(product.category)
    );
  });

  const sortedArr =
    (sortType === "lowtohigh" || sortType === "hightolow"
      ? sortNumbers(filteredProducts, sortType)
      : sortNames(filteredProducts, sortType)) || filteredProducts;

  let totalItems = sortedArr.length;

  const paginationParams = {
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  };

  const paginatedArr = paginate(sortedArr, ITEMS_PER_PAGE, page);

  return (
    <div className="mt-8 lg:mt-16 flex-grow">
      {/* Container */}
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Layout */}
        <div className="">
          {/* Title */}
          <div className="">
            <div className=" mb-4">
              <h3 className="text-[#212529] text-lg font-bold mb-4 lg:text-4xl text-center">
                Products
              </h3>
              <div className="mt-6 p-3 flex lg:justify-between border border-gray-200 rounded-lg w-full flex-wrap gap-10">
                {/* Layout */}
                <div className="flex flex-grow items-center gap-3">
                  {/* Categories */}
                  <button
                    onClick={() => {
                      setDisplay(true);
                    }}
                    className={`${display ? "bg-sky-500/30 rounded-md" : ""}`}
                  >
                    <ColumnDisplayIcon />
                  </button>
                  <button
                    onClick={() => {
                      setDisplay(false);
                    }}
                    className={`${!display ? "bg-sky-500/30 rounded-md" : ""}`}
                  >
                    <RowDisplayIcon />
                  </button>
                  <p>Category:</p>
                  <select
                    name="Sorting"
                    // defaultValue="all"
                    value={category}
                    onChange={(e) => {
                      e.preventDefault();
                      setCategory(e.target.value);
                    }}
                    className="select select-bordered border rounded-lg p-1"
                  >
                    <option value="all">All</option>
                    <option value="play aids">Play Aids</option>
                    <option value="toys">Toys</option>
                    <option value="baby care">Baby Care</option>
                    <option value="baby wear">Baby Wear</option>
                  </select>
                </div>

                {/* Filter */}
                <div className="flex flex-grow items-center">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      onChange={(e) => setSearchString(e.target.value)}
                      type="text"
                      value={searchString}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      placeholder="Search"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-grow gap-2 items-center lg:justify-end">
                  {/* Sort by */}
                  <p>Sort by:</p>
                  <select
                    name="Sorting"
                    onChange={(e) => {
                      e.preventDefault();
                      setSortType(e.target.value);
                    }}
                    defaultValue="default"
                    className="select select-bordered border rounded-lg p-1"
                  >
                    <option value="default" disabled>
                      Choose your option
                    </option>
                    <option value="lowtohigh">Price: low to high</option>
                    <option value="hightolow">Price: high to low</option>
                    <option value="AtoZ">Alphabetically, A-Z</option>
                    <option value="ZtoA">Alphabetically, Z-A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <ProductGrid products={paginatedArr} display={display} user={user} />

          {sortedArr.length > 0 && (
            <Pagination setPage={setPage} paginationParams={paginationParams} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

import { Link } from "react-router-dom";
import TitlePage from "../../components/common/TitlePage";
import ProductTable from "./ProductTable";
import { useState } from "react";
import Pagination from "../../components/common/Pagination";
import { paginate } from "../../Services/productsService";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GlobalSpinner from "../../components/GlobalSpinner";

const Products = () => {
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      setPage(1);
      return axios.get("products");
    },
    cacheTime: 5 * 60 * 1000,
  });
  if (isLoading) return <GlobalSpinner />;
  const { data: products } = data;

  let totalItems = products.length;
  const paginationParams = {
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  };

  const paginatedArr = paginate(products, ITEMS_PER_PAGE, page);

  return (
    <>
      <div>
        <TitlePage title="Products" />
        <div className="flex justify-between items-center mt-4 my-2">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-white input input-bordered w-full max-w-xs"
            />
          </div>
          <Link to="new" className="btn btn-outline btn-accent">
            Add New
          </Link>
        </div>
        <ProductTable products={paginatedArr} />
        <Pagination setPage={setPage} paginationParams={paginationParams} />
      </div>
    </>
  );
};

export default Products;

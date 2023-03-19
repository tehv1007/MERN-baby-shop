import PageTitle from "../../components/common/PageTitle";
import OrderTable from "./OrderTable";
import { useState } from "react";
import Pagination from "../../components/common/Pagination";
import { paginate } from "../../Services/productsService";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import GlobalSpinner from "../../components/common/GlobalSpinner";

const Orders = () => {
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      setPage(1);
      return axios.get("/admin/orders");
    },
    cacheTime: 5 * 60 * 1000,
  });
  if (isLoading) return <GlobalSpinner />;
  const { data: orders } = data;
  console.log(orders);

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
    <>
      <Layout>
        <PageTitle title="Orders" />
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-white input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <OrderTable orders={paginatedArr} />
        <Pagination setPage={setPage} paginationParams={paginationParams} />
      </Layout>
    </>
  );
};

export default Orders;

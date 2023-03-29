import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BsBagCheckFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import Layout from "../../components/layout/Layout";
import TableHeaderCell from "../../components/TableHeaderCell";
import { useState } from "react";
import { paginate } from "../../services/productsService";
import Pagination from "../../components/common/Pagination";
import { formatDate } from "../../services/formatDate";
import { FcSearch } from "react-icons/fc";

const CustomerOrders = () => {
  const { userId } = useParams();
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const ITEMS_PER_PAGE = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get(`/admin/${userId}/orders`),
  });

  if (isLoading) return <GlobalSpinner />;
  const { data: orders } = data;

  const sortableData = [...orders];
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

  let totalItems = sortableData.length;
  const paginationParams = {
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  };

  const paginatedArr = paginate(sortableData, ITEMS_PER_PAGE, page);

  return (
    <>
      <Layout>
        {orders.length === 0 ? (
          <div className="container grid px-6 mx-auto">
            <h1 className="my-6 text-lg font-bold text-gray-700">
              Customer Order List
            </h1>
            <div className="w-full bg-white rounded-md">
              <div className="p-8 text-center">
                <span className="flex justify-center my-30 text-red-500 font-semibold text-6xl">
                  <BsBagCheckFill />
                </span>
                <h2 className="font-medium text-base mt-4 text-gray-600">
                  This Customer have no order Yet!
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto w-full">
            <h1 className="my-6 text-lg font-bold text-gray-700">
              Customer Order List
            </h1>
            <table className="table w-full text-center ">
              <thead className="text-[#9FA2B4] uppercase">
                <tr>
                  <TableHeaderCell
                    text="text-left"
                    title="Order ID"
                    column="transaction_id"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Time"
                    column="createdAt"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Shipping Address"
                    column="address"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Phone"
                    column="phone"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Amount"
                    column="amount"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <TableHeaderCell
                    title="Status"
                    column="status"
                    sortConfig={sortConfig}
                    getSortDirection={getSortDirection}
                    requestSort={requestSort}
                  />
                  <th className="font-normal text-[16px]">Action</th>
                  <th className="font-normal text-[16px]">Detail</th>
                </tr>
              </thead>
              <tbody>
                {paginatedArr.map((item) => (
                  <tr key={item._id} className="text-center">
                    <td className="text-sm text-left">{item.transaction_id}</td>
                    <td className="text-sm">{formatDate(item.createdAt)}</td>
                    <td className="text-sm">{item.address}</td>
                    <td className="text-sm">{item.phoneNumber}</td>
                    <td className="text-sm">${item.amount}</td>
                    <td className="text-center text-sm">
                      <span
                        className={`inline-flex px-2 py-0 rounded-full ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="border rounded py-1 text-sm max-w-xs"
                        value={item.status}
                        onChange={(event) =>
                          handleStatusChange(event, item._id)
                        }
                      >
                        <option>Not processed</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td>
                      {/* Detail */}
                      <Link to={`/orders/${item._id}`}>
                        <div className="tooltip" data-tip="Detail">
                          <label className="btn btn-sm btn-square btn-success hover:opacity-60">
                            <FcSearch />
                          </label>
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination setPage={setPage} paginationParams={paginationParams} />
          </div>
        )}
      </Layout>
    </>
  );
};

export default CustomerOrders;

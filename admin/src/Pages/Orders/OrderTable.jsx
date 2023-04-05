import TableHeaderCell from "../../components/TableHeaderCell";
import OrderDataRow from "./OrderDataRow";

const OrderTable = ({ orders, requestSort, getSortDirection, sortConfig }) => {
  return (
    <>
      <div className="overflow-y-auto w-full">
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
                title="Phone Number"
                column="phoneNumber"
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
            {orders.map((item) => (
              <OrderDataRow key={item._id} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderTable;

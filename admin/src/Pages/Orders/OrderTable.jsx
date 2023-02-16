const OrderTable = ({ orders }) => {
  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full text-center">
          <thead className="text-[#9FA2B4]">
            <tr>
              <th className="text-left font-normal text-sm">OrderId</th>
              <th className="font-normal text-sm">Amount</th>
              <th className="font-normal text-sm ">UserId</th>
              <th className="font-normal text-sm">Status</th>
              <th className="font-normal text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center">
                    <div className="text-sm">{item.transaction_id}</div>
                  </div>
                </td>
                <td className="text-sm">${item.amount}</td>
                <td className="text-sm">{item.userId}</td>
                <td>
                  <select className=" border rounded py-1.5 text-sm max-w-xs">
                    <option disabled selected>
                      Not processed
                    </option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs text-sm">
                    details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderTable;

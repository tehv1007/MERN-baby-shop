const OrderCard = ({ name, total, customer }) => {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3 gap-3">
            <div className="text-[16px]">{name}</div>
          </div>
        </td>
        <td className="text-[16px]">${total}</td>
        <td className="text-[16px]">{customer}</td>
        <td>
          <select className="select select-bordered max-w-xs">
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
          <button className="btn btn-ghost btn-xs text-[16px]">details</button>
        </td>
      </tr>
    </>
  );
};

const OrdersData = [
  {
    id: 1,
    name: "Name",
    total: "120",
    customer: "UserId",
  },
  {
    id: 2,
    name: "Name",
    total: "120",
    customer: "UserId",
  },
  {
    id: 3,
    name: "Name",
    total: "120",
    customer: "UserId",
  },
  {
    id: 4,
    name: "Name",
    total: "120",
    customer: "UserId",
  },
  {
    id: 5,
    name: "Name",
    total: "120",
    customer: "UserId",
  },
];

const OrderTable = () => {
  return (
    <>
      <div className="overflow-x-auto w-full my-10">
        <table className="table w-full text-center">
          <thead className="text-[#9FA2B4]">
            <tr>
              <th className="text-left font-normal text-lg">Name</th>
              <th className="font-normal text-lg">Total</th>
              <th className="font-normal text-lg ">Customer</th>
              <th className="font-normal text-lg">Status</th>
              <th className="font-normal text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {OrdersData.map((item) => (
              <OrderCard
                key={item.id}
                name={item.name}
                total={item.total}
                customer={item.customer}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderTable;

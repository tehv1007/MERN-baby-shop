import { formatDate } from "../../services/formatDate";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const ORDER_STATUS = [
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

const OrderDataRow = ({
  _id,
  transaction_id,
  createdAt,
  address,
  amount,
  status: currentStatus,
}) => {
  const [status, setStatus] = useState(currentStatus);

  const statusMutation = useMutation({
    mutationFn: (status) => {
      return axios.put(`/admin/orders/${_id}`, { status: status });
    },
    onSuccess: () => {
      toast.success("Successfully update order status!");
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.response.data.message}`);
    },
  });

  function handleStatusChange(event) {
    setStatus(event.target.value);
    statusMutation.mutate(event.target.value);
  }

  return (
    <tr className="text-center">
      <td className="text-sm text-left">{transaction_id}</td>
      <td className="text-sm">{formatDate(createdAt)}</td>
      <td className="text-sm">{address}</td>
      <td className="text-sm">${amount}</td>
      <td className="text-center text-sm">
        <span
          className={`inline-flex px-2 py-0 rounded-full ${status.toLowerCase()}`}
        >
          {status}
        </span>
      </td>
      <td>
        <select
          className="border rounded py-1 text-sm max-w-xs"
          value={status}
          onChange={(event) => handleStatusChange(event, _id)}
        >
          {ORDER_STATUS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </td>
      <td>
        {/* Detail */}
        <Link to={`/orders/${_id}`}>
          <div className="tooltip" data-tip="Detail">
            <label className="btn btn-sm btn-square btn-success hover:opacity-60">
              <FcSearch />
            </label>
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default OrderDataRow;

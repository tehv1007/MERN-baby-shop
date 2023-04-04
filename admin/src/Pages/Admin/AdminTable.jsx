import { useState } from "react";
import TableHeaderCell from "../../components/TableHeaderCell";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import DeletedModal from "./DeletedModal";

const AdminTable = ({
  users,
  sortConfig,
  requestSort,
  getSortDirection,
  handleDelete,
}) => {
  const [id, setId] = useState("");

  return (
    <>
      <div className="overflow-x-auto w-full mt-4">
        <table className="table w-full text-center">
          <thead className="text-[#9FA2B4]">
            <tr>
              <TableHeaderCell
                title="Avatar"
                column="image"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <TableHeaderCell
                title="User Name"
                column="username"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <TableHeaderCell
                title="Name"
                column="name"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <TableHeaderCell
                title="Email"
                column="email"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <th className="font-normal text-[16px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center space-x-3 gap-3">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt="Avatar" />
                    </div>
                  </div>
                </td>
                <td className="text-[16px]">{item.username}</td>
                <td className="text-[16px]">{item.name}</td>
                <td className="text-[16px]">{item.email}</td>
                <td>
                  <div className="flex items-center justify-center gap-5">
                    {/* Edit */}
                    <Link to={`/${item._id}/orders`}>
                      <div className="tooltip" data-tip="Edit">
                        <label className="btn btn-sm btn-square btn-success hover:opacity-60">
                          <FiEdit />
                        </label>
                      </div>
                    </Link>

                    {/* Delete */}
                    <div className="tooltip" data-tip="Delete">
                      <label
                        htmlFor={item.id}
                        className="btn btn-sm btn-square btn-error hover:opacity-80"
                        onClick={() => setId(item.id)}
                      >
                        <BiTrash />
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete one */}
        <DeletedModal id={id} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default AdminTable;

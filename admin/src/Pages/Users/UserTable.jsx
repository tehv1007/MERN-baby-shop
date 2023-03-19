import { useState } from "react";
import selectInput from "../../services/selectInput";
import TableHeaderCell from "../../components/TableHeaderCell";
import { BiCartAlt, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import DeletedModal from "../../components/products/DeletedModal";
import MultiDelete from "../../components/products/MultiDelete";

const UserTable = ({ users, sortConfig, requestSort, getSortDirection }) => {
  const [id, setId] = useState("");
  const {
    handleSelectAll,
    handleSelectRow,
    numSelected,
    selectedRows,
    setSelectedRows,
    selectAll,
  } = selectInput(users);

  return (
    <>
      <div className="overflow-x-auto w-full mt-4">
        <table className="table w-full text-center">
          <thead className="text-[#9FA2B4]">
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </label>
              </th>
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
              <tr key={item._id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedRows.some((p) => p._id === item._id)}
                      onChange={(event) => handleSelectRow(event, item)}
                    />
                  </label>
                </th>
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
                    {/* Orders Detail */}
                    <Link to={`/customers/orders`}>
                      <div className="tooltip" data-tip="Orders">
                        <label className="btn btn-sm btn-square btn-success hover:opacity-60">
                          <BiCartAlt />
                        </label>
                      </div>
                    </Link>

                    {/* Delete */}
                    <div className="tooltip" data-tip="Delete">
                      <label
                        htmlFor={item._id}
                        className="btn btn-sm btn-square btn-error hover:opacity-80"
                        onClick={() => setId(item._id)}
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
        <DeletedModal id={id} />

        {/* Multi Delete */}
        {numSelected > 0 && (
          <div className="tooltip mt-4">
            <label
              htmlFor="my-modal"
              className="btn btn-error hover:opacity-80"
            >
              Multiple Delete
            </label>
          </div>
        )}

        <MultiDelete
          selectedProducts={selectedRows}
          setSelectedProducts={setSelectedRows}
          numSelected={numSelected}
        />
      </div>
    </>
  );
};

export default UserTable;

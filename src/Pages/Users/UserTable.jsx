import { useState } from "react";
import TableHeaderCell from "../../components/TableHeaderCell";
import { BiCartAlt } from "react-icons/bi";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import DisableModal from "./DisableModel";

const UserTable = ({ users, sortConfig, requestSort, getSortDirection }) => {
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
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center space-x-3 gap-3">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.image} alt="Avatar" />
                    </div>
                  </div>
                </td>
                <td className="text-[16px]">{user.username}</td>
                <td className="text-[16px]">{user.name}</td>
                <td className="text-[16px]">{user.email}</td>
                <td>
                  <div className="flex items-center justify-center gap-5">
                    {/* Orders Detail */}
                    <Link to={`/${user._id}/orders`}>
                      <div className="tooltip" data-tip="Orders">
                        <label className="btn btn-sm btn-square btn-success hover:opacity-60">
                          <BiCartAlt />
                        </label>
                      </div>
                    </Link>

                    {/* Disable */}
                    {user.isActive == true ? (
                      <div className="tooltip" data-tip="Disable">
                        <label
                          htmlFor={user._id}
                          className="btn btn-sm btn-square btn-error hover:opacity-80"
                          onClick={() => setId(user._id)}
                        >
                          <BsEyeSlash />
                        </label>
                      </div>
                    ) : (
                      <div className="tooltip" data-tip="Enable">
                        <label
                          htmlFor={user._id}
                          className="btn btn-sm btn-square btn-primary hover:opacity-80"
                          onClick={() => setId(user._id)}
                        >
                          <BsEye />
                        </label>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Disable one */}
        <DisableModal id={id} />
      </div>
    </>
  );
};

export default UserTable;

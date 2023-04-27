import { useState } from "react";
import TableHeaderCell from "../../components/TableHeaderCell";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import DeletedModal from "./DeletedModal";

const CategoryTable = ({
  categories,
  sortConfig,
  requestSort,
  getSortDirection,
}) => {
  const [id, setId] = useState("");

  return (
    <>
      <div className="overflow-x-auto w-full mt-4">
        <table className="table w-full text-center">
          <thead className="text-[#9FA2B4]">
            <tr>
              <TableHeaderCell
                text="text-left"
                title="Icon"
                column="imageUrl"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <TableHeaderCell
                title="Name"
                column="title"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <TableHeaderCell
                title="Collections"
                column="collections"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <th className="font-normal text-[16px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center space-x-3 gap-3">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.imageUrl} alt="Avatar" />
                    </div>
                  </div>
                </td>
                <td className="text-[16px]">{item.title}</td>
                <td className="text-[16px]">
                  {item.collections.map((item, i) => (
                    <span key={i} className="border rounded-lg px-2 mr-2">
                      {item}
                    </span>
                  ))}
                </td>
                <td>
                  <div className="flex items-center justify-center gap-5">
                    {/* Edit */}
                    <Link to={`${item._id}/edit`}>
                      <div className="tooltip" data-tip="Edit">
                        <label className="btn btn-sm btn-square btn-success hover:opacity-60">
                          <FiEdit />
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
      </div>
    </>
  );
};

export default CategoryTable;

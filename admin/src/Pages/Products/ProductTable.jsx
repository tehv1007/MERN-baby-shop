import { Link } from "react-router-dom";
import { BiEdit, BiTrash, BiDetail } from "react-icons/bi";
import { useState } from "react";
import DeletedModal from "../../components/products/DeletedModal";
import MultiDelete from "../../components/products/MultiDelete";
import selectInput from "../../services/selectInput";
import TableHeaderCell from "../../components/TableHeaderCell";

const ProductTable = ({
  products,
  requestSort,
  getSortDirection,
  sortConfig,
}) => {
  const [id, setId] = useState("");
  const {
    handleSelectAll,
    handleSelectRow,
    numSelected,
    selectedRows,
    setSelectedRows,
    selectAll,
  } = selectInput(products);

  return (
    <>
      <div className="overflow-x-auto w-full mt-4">
        <table className="table w-full text-center">
          <thead className="text-[#9FA2B4] ">
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
                title="Name"
                column="title"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <TableHeaderCell
                title="Category"
                column="category"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <TableHeaderCell
                title="Price"
                column="price"
                sortConfig={sortConfig}
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <th className="font-normal text-[16px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
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
                      <img src={item.photos[0]} alt={item.title} />
                    </div>
                    <div className="text-sm">{item.title}</div>
                  </div>
                </td>
                <td className="text-sm">{item.category}</td>
                <td className="text-sm">${item.price}</td>
                <td>
                  <div className="flex items-center justify-center gap-1">
                    {/* Detail */}
                    <Link to={`${item._id}`}>
                      <div className="tooltip" data-tip="Detail">
                        <label className="btn btn-sm btn-square btn-success hover:opacity-60">
                          <BiDetail />
                        </label>
                      </div>
                    </Link>

                    {/* Edit */}
                    <Link to={`${item._id}/edit`}>
                      <div className="tooltip" data-tip="Edit">
                        <label className="btn btn-sm btn-square btn-primary hover:opacity-60">
                          <BiEdit />
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

export default ProductTable;

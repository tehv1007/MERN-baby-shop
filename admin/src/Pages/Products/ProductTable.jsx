import { Link } from "react-router-dom";
import { BsPen, BsTrash } from "react-icons/bs";

const ProductTable = ({ products }) => {
  return (
    <>
      <div className="overflow-x-auto w-full mt-4">
        <table className="table w-full text-center">
          <thead className="text-[#9FA2B4]">
            <tr>
              <th className="text-left font-normal text-lg">Name</th>
              <th className="font-normal text-lg">Category</th>
              <th className="font-normal text-lg ">Price</th>
              <th className="font-normal text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center space-x-3 gap-3">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.photos[0]} alt={item.title} />
                    </div>
                    <div className="text-[16px]">{item.title}</div>
                  </div>
                </td>
                <td className="text-[16px]">{item.category}</td>
                <td className="text-[16px]">${item.price}</td>
                <td>
                  <div className="flex items-center justify-center gap-5">
                    <Link to="edit">
                      <BsPen />
                    </Link>
                    <button>
                      <BsTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;

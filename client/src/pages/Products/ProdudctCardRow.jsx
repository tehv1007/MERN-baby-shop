import { Link } from "react-router-dom";
import { addItem } from "../../services/cartService";

const ProdudctCardRow = ({ product }) => {
  const addToCart = () => {
    addItem(product);
    window.location.reload(true);
  };
  return (
    <Link to={`/products/${product._id}`}>
      <div className="mt-4">
        {/* Container */}
        <div>
          <div className="flex">
            <img
              className="w-2/5 lg:w-1/5"
              src={product.photos[0]}
              alt={product.title}
            />
            <div className="w-3/5 lg:w-4/5 bg-gray-100 px-3 p-3">
              {/* ProductInfo */}
              <p className="mb-[10px] line-clamp-2 font-[1.5px] text-sm text-gray-500">
                {product.description}
              </p>
              <div className="flex gap-2.5 pb-2">
                <button className="rounded-md p-2 shadow-sm border hover:border-black text-xs bg-yellow-200"></button>
                <button className="rounded-md p-2 shadow-sm border hover:border-black text-xs bg-emerald-700"></button>
                <button className="rounded-md p-2 shadow-sm border hover:border-black text-xs bg-gray-400"></button>
              </div>
              <div className="rounded-b-md">
                <h4 className="pb-2">{product.title}</h4>
                <p className="pb-4 font-semibold">${product.price}</p>
                {product.inStock > 0 ? (
                  <button
                    onClick={addToCart}
                    className="bg-[#212529] text-white py-2 px-4 rounded-md  hover:bg-white hover:text-black md:px-6  transition duration-500 ">
                    Add To Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-[#212529] text-white py-2 px-4 rounded-md  hover:bg-white hover:text-black md:px-6  transition duration-500 ">
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProdudctCardRow;

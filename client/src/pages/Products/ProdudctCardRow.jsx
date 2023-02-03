import { Link } from "react-router-dom";
import Rating from "../../components/review/Rating";
import { addItem } from "../../services/cartService";
import { addCartItem } from "../ViewCart/useCart";

const ProdudctCardRow = ({ product, user }) => {
  const mutation = addCartItem(user, 1);
  const addToCart = () => {
    if (user) mutation.mutate(product);
    else {
      addItem(product);
      window.location.reload(true);
    }
  };

  return (
    <div className="mt-4">
      {/* Container */}
      <div>
        <div className="flex">
          <Link to={`/products/${product._id}`} className="w-2/5 lg:w-1/5">
            <img src={product.photos[0]} alt={product.title} />
          </Link>
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
              <Link to={`/products/${product._id}`} className="cursor-pointer">
                <h4 className="pb-2">{product.title}</h4>
              </Link>
              <p className="pb-4 font-semibold">${product.price}</p>
              <Rating productId={product._id} />
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
  );
};

export default ProdudctCardRow;

import { Link, useNavigate } from "react-router-dom";
import Rating from "../../components/review/Rating";
import { addCartItem } from "../../hooks/useCart";

const ProductCard = ({ product, user }) => {
  const mutation = addCartItem(user, 1);
  const navigate = useNavigate();
  const addToCart = () => {
    if (user) mutation.mutate(product);
    else navigate("/signin");
  };

  return (
    <div className="group relative">
      <div className="relative">
        <Link to={`/products/${product._id}`}>
          <img
            className="rounded-t-md"
            src={product.photos[0]}
            alt={product.title}
          />
        </Link>
        {product.inStock > 0 ? (
          <button
            onClick={addToCart}
            className="bg-[#212529] text-white py-2 px-4 rounded-md  hover:bg-white hover:text-black md:px-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block transition duration-500 "
          >
            Add To Cart
          </button>
        ) : (
          <button
            disabled
            className="bg-[#212529] text-white py-2 px-4 rounded-md  hover:bg-white hover:text-black md:px-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:group-hover:block transition duration-500 "
          >
            Out of Stock
          </button>
        )}
      </div>

      <div className="text-center bg-gray-200 p-4 rounded-b-md">
        <Link to={`/products/${product._id}`}>
          <h4 className="pb-2">{product.title}</h4>
        </Link>
        <p className="pb-2">${product.price}</p>
        <Rating
          productId={product._id}
        />
      </div>
    </div>
  );
};

export default ProductCard;

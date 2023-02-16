import { Link } from "react-router-dom";
import Rating from "../../../components/review/Rating";
import { addCartItem } from "../../ViewCart/useCart";

const ProductCard = ({ product, user }) => {
  const mutation = addCartItem(user, 1);
  const addToCart = () => {
    if (user) mutation.mutate(product);
  };

  return (
    <div>
      <div className="group relative">
        <Link to={`/products/${product._id}`}>
          <img
            className="group rounded-t-md"
            src={product.photos[0]}
            alt={product.title}
          />
        </Link>
        <div className="text-center bg-gray-200 p-4 rounded-b-md relative">
          <Link to={`/products/${product._id}`}>
            <h4 className="pb-2">{product.title}</h4>
          </Link>
          <p className="pb-2">${product.price}</p>
          <Rating
            productId={product._id}
            avgRating={product.avgRating}
            numReviews={product.numReviews}
          />
          {product.inStock > 0 ? (
            <button
              onClick={addToCart}
              className="bg-[#212529] text-white py-2 px-4 rounded-md  hover:bg-white hover:text-black md:px-6 lg:absolute -top-36 lg:left-[85px] xl:left-[95px] lg:hidden lg:group-hover:block transition duration-500  ">
              Add To Cart
            </button>
          ) : (
            <button
              disabled
              className="bg-[#212529] text-white py-2 px-4 rounded-md  hover:bg-white hover:text-black md:px-6 lg:absolute -top-36 lg:left-[85px] xl:left-[95px] lg:hidden lg:group-hover:block transition duration-500 ">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;

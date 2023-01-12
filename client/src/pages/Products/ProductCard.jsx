import Rating from "../../components/common/Rating";
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, imageUrl, price }) => {
  return (
    <Link to={`/products/${id}`}>
      <div className="group relative">
        <img className="group rounded-t-md" src={imageUrl} alt={title} />
        <div className="text-center bg-gray-200 p-4 rounded-b-md relative">
          <h4 className="pb-2">{title}</h4>
          <p className="pb-2">${price}</p>
          {/* <Rating rating={5} /> */}
          <button className="bg-[#212529] text-white py-2 px-4 rounded-md  hover:bg-white hover:text-black md:px-6 lg:absolute -top-36 lg:left-[85px] xl:left-[85px] lg:hidden lg:group-hover:block transition duration-500 ">
            Add To Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

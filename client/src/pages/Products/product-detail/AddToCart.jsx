import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MinusIcon from "../../../components/common/icons/MinusIcon";
import PlusIcon from "../../../components/common/icons/PlusIcon";
import { addCartItem } from "../../../hooks/useCart";

const AddToCart = ({ product, user }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.value);
    setQuantity(event.target.value < 1 ? 1 : event.target.value);
  };

  const mutation = addCartItem(user, Number(quantity));

  const addToCart = () => {
    if (!user) navigate("/signin");
    else mutation.mutate(product);
  };

  return (
    <>
      <div className="mt-3">
        {/* quantity */}
        <h5 className="pb-2">Quantity</h5>
        <div className="inline-flex items-center border border-gray-200 rounded">
          <button
            onClick={() => setQuantity(quantity - 1)}
            className="w-full h-10 px-2 leading-10 text-gray-600 transition hover:opacity-75"
            disabled={quantity <= 0}
          >
            <MinusIcon />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleChange}
            className="h-10 w-14 border-transparent text-center"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-full h-10 px-2 leading-10 text-gray-600 transition hover:opacity-75"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <div className="mt-4">
        {/* cart and buy buttons */}
        {product.inStock > 0 ? (
          <div>
            <button
              onClick={addToCart}
              className="block w-full mb-3 text-center rounded-md py-2 bg-slate-700 hover:bg-black hover:cursor-pointer text-white"
            >
              <span>Add To Cart</span>
            </button>
            <button
              onClick={() => {
                if (!user) navigate("/signin");
                else {
                  addToCart();
                  navigate(`/cart`);
                }
              }}
              className="block w-full border border-black mb-3 text-center rounded-md py-2  hover:bg-black hover:cursor-pointer hover:text-white"
            >
              <span>Buy It Now</span>
            </button>
          </div>
        ) : (
          <button
            disabled
            className="mb-3 inline-block w-full text-center rounded-md py-2 bg-slate-700 hover:bg-black hover:cursor-pointer text-white"
          >
            <p>Out of Stock</p>
          </button>
        )}
      </div>
    </>
  );
};

export default AddToCart;

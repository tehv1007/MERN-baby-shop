import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateItem } from "../../../services/cartService";
import { addCartItem } from "../../ViewCart/useCart";

const AddToCart = ({ product, user }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.value);
    setQuantity(event.target.value < 1 ? 1 : event.target.value);
  };

  const mutation = addCartItem(user, Number(quantity));

  const addToCart = () => {
    mutation.mutate(product);
  };

  return (
    <>
      <div className="mt-3">
        {/* quantity */}
        <h5 className="pb-2">Quantity</h5>
        <div>
          <input
            type="number"
            value={quantity}
            onChange={handleChange}
            className="border rounded-md inline-block h-10 w-20 text-center"
          />
        </div>
      </div>

      <div className="mt-4">
        {/* cart and buy buttons */}
        {product.inStock > 0 ? (
          <div>
            <button
              onClick={addToCart}
              className="block w-full mb-3 text-center rounded-md py-2 bg-slate-700 hover:bg-black hover:cursor-pointer text-white">
              <span>Add To Cart</span>
            </button>
            <button
              onClick={() => {
                addToCart();
                navigate(`/viewcart`);
              }}
              className="block w-full border border-black mb-3 text-center rounded-md py-2  hover:bg-black hover:cursor-pointer hover:text-white">
              <span>Buy It Now</span>
            </button>
          </div>
        ) : (
          <button
            disabled
            className="mb-3 inline-block w-full text-center rounded-md py-2 bg-slate-700 hover:bg-black hover:cursor-pointer text-white">
            <p>Out of Stock</p>
          </button>
        )}
      </div>
    </>
  );
};

export default AddToCart;

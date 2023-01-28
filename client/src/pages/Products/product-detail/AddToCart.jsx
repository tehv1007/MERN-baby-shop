import { useEffect } from "react";
import { useState } from "react";
import { updateItem } from "../../../services/cartService";

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (event) => {
    console.log(event.target.value);
    setQuantity(event.target.value < 1 ? 1 : event.target.value);
  };

  const addToCart = () => {
    if (quantity >= 1) {
      updateItem(product._id, quantity);
    }
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
            <div className="mb-3 text-center rounded-md py-2 bg-slate-700 hover:bg-black hover:cursor-pointer text-white">
              <button onClick={addToCart}>Add To Cart</button>
            </div>
            <div className="border border-black mb-3 text-center rounded-md py-2  hover:bg-black hover:cursor-pointer hover:text-white">
              <button>Buy It Now</button>
            </div>
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

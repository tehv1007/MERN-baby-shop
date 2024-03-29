import { Link } from "react-router-dom";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import CartItem from "./CartItem";
import { getCartItems } from "../../hooks/useCart";

const Cart = ({ user }) => {
  let cart;
  if (!user) cart = null;
  else {
    const { data, isLoading } = getCartItems(user);
    if (isLoading) return <GlobalSpinner />;

    cart = data?.data;
  }

  return (
    <>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto flex-grow w-full">
        {/* Layout */}
        <div className="p-4">
          {/* header */}
          <div className="flex justify-between mb-5 ">
            <h1 className="font-bold text-2xl lg:text-4xl">Your Cart</h1>
            <a className="underline text-sm md:text-base" href="/products">
              Continue shopping
            </a>
          </div>
          {cart == null ? (
            <div className="text-3xl font-medium leading-9 m-8 text-center">
              Please{" "}
              <Link className="underline text-blue-500" to="/signin">
                login
              </Link>{" "}
              for shopping and payment
            </div>
          ) : cart.products.length <= 0 ? (
            <div className="text-3xl font-medium leading-9 m-8 text-center">
              Your cart is empty
            </div>
          ) : (
            <>
              {/* content */}
              <table className="w-full">
                {/* <!-- head --> */}
                <thead className="w-full">
                  <tr className="text-left border-b-[1px] text-sm text-[#3d405b] opacity-90">
                    <th className="font-normal pb-4 md:w-1/2">PRODUCT</th>
                    <th className="text-white md:text-black font-normal pb-4  ">
                      QUANTITY
                    </th>
                    <th className="font-normal pb-4 ">TOTAL</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.products.map((product, index) => (
                    <CartItem user={user} key={index} product={product} />
                  ))}
                </tbody>
              </table>
              <hr className="my-3" />
              {/* Subtotal */}
              <div className="text-right">
                <div>
                  <p className=" text-base font-medium">
                    Subtotal:
                    <span className=" text-2xl ml-4">
                      ${cart.subPrice.toFixed(2)}
                    </span>
                  </p>
                  <p className=" text-sm my-4 ">
                    Tax included and shipping calculated at checkout
                  </p>
                </div>
                <Link
                  to={user ? `/checkout/${user._id}/information` : "/signin"}
                >
                  <button className="w-1/2 md:w-1/3 border rounded-xl bg-[#3d405b] hover:bg-black text-white text-sm py-2 px-3 transition duration-500">
                    Check Out
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

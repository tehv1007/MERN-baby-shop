import { Link } from "react-router-dom";
import { getTotalPrice } from "../../services/cartService";
import CartItem from "./CartItem";
import { getCartItems } from "./useCart";

const ViewCart = ({ user }) => {
  let items;
  // if (!user) items = JSON.parse(localStorage.getItem("cart"));
  const { data, isLoading } = getCartItems(user);
  if (isLoading) return <h1>Loading...</h1>;
  items = data?.data?.products || [];
  console.log(items);

  const total = getTotalPrice(items);

  return (
    <>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Layout */}
        <div>
          {/* header */}
          <div className="flex justify-between mb-5 ">
            <h1 className="font-bold text-2xl lg:text-5xl">Your Cart</h1>
            <a className="underline text-sm md:text-base" href="/products">
              Continue shopping
            </a>
          </div>
          {items ? (
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
                  {items?.map((product, index) => (
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
                    <span className=" text-2xl ml-4">${total.toFixed(2)}</span>
                  </p>
                  <p className=" text-sm my-4 ">
                    Tax included and shipping calculated at checkout
                  </p>
                </div>
                <Link
                  to={user ? `/checkout/${user._id}/infomation` : "/signin"}>
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

export default ViewCart;

import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { getTotalPrice } from "../../services/cartService";
import { getCartItems } from "../ViewCart/useCart";

const shippingFee = 5;

const CartSummary = ({ user }) => {
  let items;
  if (!user) items = [];
  const { data, isLoading } = getCartItems(user);
  if (isLoading) return <h1>Loading...</h1>;
  console.log(data);
  items = data.data.products;
  const subTotal = getTotalPrice(items);
  localStorage.setItem("total", Number((shippingFee + subTotal).toFixed(2)));

  return (
    <div className="bg-zinc-100 px-4">
      {items.map((product, index) => (
        <div
          key={index}
          className="flex gap-4 py-5 justify-between items-center max-w-screen-sm mx-auto">
          <div className="flex justify-between items-center">
            <div className="absolute">
              <button className="relative left-12 top-3 z-10 border bg-zinc-500 text-white rounded-full px-2 ">
                {product.quantity}
              </button>
              <img
                className=" border border-zinc-300 rounded-lg max-w-[60px]"
                src={product.product.photos[0]}
              />
            </div>
            <div className="ml-20 ">
              <p className="text-sm md:text-base">{product.product.title}</p>

              <p className="text-xs">Color: Yellow</p>
            </div>
          </div>
          <p className="text-sm my-3 ">
            ${(product.price * product.quantity).toFixed(2)}
          </p>
        </div>
      ))}
      {/* Horizontal line */}
      <div className="border-t-2 max-w-screen-sm mx-auto mt-8"></div>
      <div className="py-6 max-w-screen-sm mx-auto ">
        <p className="flex justify-between mb-4 ">
          Subtotal <span>${subTotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between max-w-screen-sm mx-auto">
          Shipping <span>${shippingFee}</span>
        </p>
      </div>
      {/* Horizontal line */}
      <div className="border-t-2 max-w-screen-sm mx-auto"></div>
      <div className="py-5 max-w-screen-sm mx-auto ">
        <p className="flex justify-between items-center">
          Total <span>${(shippingFee + subTotal).toFixed(2)}</span>
        </p>
      </div>
      {/* Horizontal line */}
      <div className="border-t-2 max-w-screen-sm mx-auto lg:hidden"></div>
    </div>
  );
};

const Show = () => {
  return (
    <div className="flex items-center">
      <p>Show order summary</p>
      <span>
        <HiChevronDown />
      </span>
    </div>
  );
};

const Hide = () => {
  return (
    <div className="flex items-center">
      <p>Hide order summary</p>
      <span>
        <HiChevronUp />
      </span>
    </div>
  );
};

const SidebarCheckOut = ({ user }) => {
  console.log(user);
  const [display, setDisplay] = useState(true);
  const total = localStorage.getItem("total");
  return (
    <>
      <div className="lg:bg-zinc-100 col-start-4 col-span-2 lg:border lg:border-r-0 lg:px-6">
        {/* header */}
        <div className=" bg-zinc-100 lg:hidden">
          <div className="flex justify-between items-center max-w-screen-sm mx-auto">
            <div className="flex justify-between items-center gap-2 py-6 text-sm">
              <AiOutlineShoppingCart />
              <button onClick={() => setDisplay(!display)}>
                {display === true ? <Hide /> : <Show />}
              </button>
            </div>
            <span className="text-lg font-medium">${total}</span>
          </div>
          {display && <CartSummary user={user} />}
        </div>
        {/* content */}
        <div className="hidden lg:block">
          <CartSummary user={user} />
        </div>
      </div>
    </>
  );
};

export default SidebarCheckOut;

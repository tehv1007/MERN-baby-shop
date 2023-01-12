import { useState } from "react";
import { Link } from "react-router-dom";

const ViewCart = () => {
  const increase = () => {
    setQuantity(quantity + 1);
  };
  const decrease = () => {
    setQuantity(quantity - 1);
  };
  const [quantity, setQuantity] = useState(0);
  return (
    <>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Layout */}
        <div>
          {/* header */}
          <div className="flex justify-between mb-5 ">
            <h1 className="font-bold text-2xl lg:text-5xl">Your Cart</h1>
            <a className="underline text-sm md:text-base" href="">
              Continue shopping
            </a>
          </div>
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
              <tr>
                <td className="flex gap-3 mt-3">
                  <a href="">
                    <img
                      className="border aspect-square w-[150px] rounded-md md:py-4 md:pr-8 md:border-0"
                      src="https://cdn.shopify.com/s/files/1/0623/7578/8783/products/7_300x.jpg?v=1644400528"
                    />
                  </a>
                  <div className="">
                    <a href="" className="text-sm md:text-base">
                      Babyhug Bear Face Rattle Cum Soft Toy
                    </a>
                    <p className="text-2xl my-3 md:text">$255.00</p>
                    <p className="text-xs">Color: Yellow</p>
                    <div className="flex gap-3 items-center mt-2">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        className="icon icon-discount w-5 h-5"
                        viewBox="0 0 12 12"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <span className="text-base">Musical15</span>
                    </div>
                    <div className="flex gap-2 items-center mt-2 md:hidden">
                      <div className="flex gap-3 border px-4 py-1">
                        <button onClick={decrease} disabled={quantity === 0}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 12h-15"
                            />
                          </svg>
                        </button>
                        <span>{quantity}</span>
                        <button onClick={increase}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                {/* </div> */}
                <td>
                  <div className="hidden md:flex gap-2 items-center">
                    <div className="flex gap-3 items-center justify-between border px-4 py-1">
                      <button onClick={decrease} disabled={quantity === 0}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                          />
                        </svg>
                      </button>
                      <span>{quantity}</span>
                      <button onClick={increase}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </td>
                <td className="">$255.00</td>
              </tr>
            </tbody>
          </table>
          <hr className="my-3" />
          {/* Subtotal */}
          <div className="text-right">
            <div>
              <p className=" text-base font-medium">
                Subtotal:
                <span className=" text-2xl ml-4">$255.00</span>
              </p>
              <p className=" text-sm my-4 ">
                Tax included and shipping calculated at checkout
              </p>
            </div>
            <Link to="/checkout">
              <button className="w-1/2 md:w-1/3 border rounded-xl bg-[#3d405b] hover:bg-black text-white text-sm py-2 px-3 transition duration-500">
                Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCart;

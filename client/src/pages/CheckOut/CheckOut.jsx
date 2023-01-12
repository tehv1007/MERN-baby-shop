import ViewCheckOut from "./ViewCheckOut";

const CheckOut = () => {
  return (
    //
    <section>
      {/* container */}
      <div className="">
        {/* layout */}
        <div className="lg:grid lg:grid-cols-5">
          {/* Sidebar */}
          <div className="lg:bg-zinc-50 col-start-4 col-span-2 lg:border lg:border-r-0 lg:px-6 ">
            <div className=" bg-zinc-100 lg:hidden ">
              <div className="flex justify-between items-center max-w-screen-sm mx-auto ">
                <div className="flex items-center gap-2 py-6 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  <span className="hidden">Show order summary</span>
                  <span className="">Hide order summary</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                </div>
                <span className="text-lg font-medium">$255</span>
              </div>
            </div>
            {/* View Check Out */}
            <ViewCheckOut />
          </div>

          {/* main */}
          <div className="max-w-screen-sm mx-auto lg:row-start-1 lg:col-span-3 lg:mx-20">
            <div className="flex items-center gap-2 mt-4 text-xs max-w-screen-sm mx-auto">
              <p>Cart</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
              <p className="font-bold">Information</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
              <p>Shipping</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
              <p>Payment</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <h3 className="flex justify-between items-center my-6 lg:text-lg">
              Contact information{" "}
              <span className="lg:text-sm">
                Already have an account? Log in
              </span>
            </h3>

            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded p-2 mb-5"
              />

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-3/5 border rounded p-2 mb-5"
                />
                <input
                  type="number"
                  placeholder="Phone number"
                  className="w-2/5 border rounded p-2"
                />
              </div>

              <input
                type="text"
                placeholder="Address"
                className="w-full border rounded p-2 mb-5"
              />
            </div>

            <div className="mb-4 flex gap-1">
              <select
                name="city"
                id="city"
                className="w-1/3 border rounded p-2"
              >
                <option value="">City</option>
                <option value="">Ho Chi Minh</option>
                <option value="">Ha Noi</option>
                <option value="">Da Nang</option>
                <option value="">An Giang</option>
                <option value="">Hue</option>
              </select>
              <select name="" id="" className="w-1/3 border rounded p-2">
                <option value="">District</option>
                <option value="">District 1</option>
                <option value="">District 2</option>
                <option value="">District 3</option>
                <option value="">District 4</option>
              </select>
              <select name="" id="" className="w-1/3 border rounded p-2">
                <option value="">Ward</option>
                <option value="">Ward 1</option>
                <option value="">Ward 2</option>
                <option value="">Ward 3</option>
              </select>
            </div>
            <div>
              <p className="mb-4">Delivery method</p>
              <div className="border rounded text-center py-5">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iODUiIHZpZXdCb3g9IjAgMCAxMDggODUiPjxnIHN0cm9rZT0iI0IyQjJCMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0xIDE4aDEwNk0xMSA3MC4zaDI2bS0yNi02aDI2bS0yNi02aDE3Ii8+PC9nPjxwYXRoIHN0cm9rZT0iI0IyQjJCMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xIDE4bDEwLjctMTdoODQuN2wxMC42IDE3djYxLjVjMCAyLjUtMiA0LjUtNC41IDQuNWgtOTdjLTIuNSAwLTQuNS0yLTQuNS00LjV2LTYxLjV6TTU0IDF2MTYuNiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg=="
                  className="mx-auto mb-2"
                />
                <p>Please choose the city</p>
              </div>
            </div>
            <div className="my-4">
              <p className="mb-4">Payment Method</p>
              <div className="border rounded flex gap-2 items-center py-3">
                <input type="radio" className="ml-5" checked />
                <img
                  src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=4"
                  alt=""
                />
                <p>Cash on Delivery(COD)</p>
              </div>
            </div>
            <div className="max-w-screen-sm mx-auto my-11 pb-5 md:flex justify-between items-center">
              <a
                href=""
                className="flex justify-center items center text-sm py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Return to cart
              </a>
              <button className="w-full text-sm font-medium text-white border rounded-md bg-[#3d405d] px-8 py-5 mb-2 md:w-1/3 lg:px-0 lg:w-2/5">
                Continue to shipping
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;

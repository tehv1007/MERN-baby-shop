const ViewCheckOut = () => {
  return (
    <>
      <div className="bg-zinc-50 ">
        <div className="max-w-screen-sm mx-auto flex gap-4 py-5 justify-between items-center">
          <div className="">
            <div className="">
              <img
                className="border border-zinc-300 rounded-lg"
                src="https://cdn.shopify.com/s/files/1/0623/7578/8783/products/7_64x64.jpg?v=1644400528"
              />
              <span className="mt-2 ml-20 ">
                <p className="text-sm md:text-base">
                  Babyhug Bear Face Rattle Cum Soft Toy
                </p>

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
              </span>
            </div>
          </div>

          <p className="text-sm my-3 ">$255.00</p>
        </div>
        {/* Horizontal line */}
        <div className="border-t-2 max-w-screen-sm mx-auto"></div>
        <div className="py-6 max-w-screen-sm mx-auto ">
          <p className="flex justify-between mb-4 ">
            Subtotal <span>$255</span>
          </p>
          <p className="flex justify-between max-w-screen-sm mx-auto">
            Shipping <span>Calculated at next step</span>
          </p>
        </div>
        {/* Horizontal line */}
        <div className="border-t-2 max-w-screen-sm mx-auto"></div>
        <div className="py-5 max-w-screen-sm mx-auto ">
          <p className="flex justify-between items-center">
            Total <span>$255</span>
          </p>
        </div>
        {/* Horizontal line */}
        <div className="border-t-2 max-w-screen-sm mx-auto"></div>
      </div>
    </>
  );
};

export default ViewCheckOut;

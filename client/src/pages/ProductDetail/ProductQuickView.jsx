const ProductQuickView = () => {
  return (
    <>
      <div className="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl rounded-2xl opacity-100 scale-100">
        <div className="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl overflow-hidden">
          <div
            className="flex-shrink-0 flex items-center justify-center h-auto cursor-pointer"
            href="/product/clementine"
          >
            <span
              style={{
                boxSizing: "border-box",
                display: "inline-block",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                position: "relative",
                maxWidth: "100%",
              }}
            >
              <span
                style={{
                  boxSizing: "border-box",
                  display: "block",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  maxWidth: "100%",
                }}
              >
                <img
                  alt
                  aria-hidden="true"
                  src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27420%27%20height=%27420%27/%3e"
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    width: "initial",
                    height: "initial",
                    background: "none",
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                  }}
                />
              </span>
              <img
                alt="product"
                srcSet="/_next/image?url=https%3A%2F%2Fi.postimg.cc%2FMTPyNwQC%2FClementine-5ct.jpg&w=640&q=75 1x, /_next/image?url=https%3A%2F%2Fi.postimg.cc%2FMTPyNwQC%2FClementine-5ct.jpg&w=1080&q=75 2x"
                src="/_next/image?url=https%3A%2F%2Fi.postimg.cc%2FMTPyNwQC%2FClementine-5ct.jpg&w=1080&q=75"
                decoding="async"
                data-nimg="intrinsic"
                style={{
                  position: "absolute",
                  inset: 0,
                  boxSizing: "border-box",
                  padding: 0,
                  border: "none",
                  margin: "auto",
                  display: "block",
                  width: 0,
                  height: 0,
                  minWidth: "100%",
                  maxWidth: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                }}
              />
            </span>
          </div>
          <div className="w-full flex flex-col p-5 md:p-8 text-left">
            <div className="mb-2 md:mb-2.5 block -mt-1.5">
              <h1
                className="text-heading text-lg md:text-xl lg:text-2xl font-semibold font-serif hover:text-black cursor-pointer"
                href="/product/clementine"
              >
                Clementine
              </h1>
              <div className="relative">
                <span className="bg-emerald-100 text-emerald-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-semibold font-serif">
                  Stock :
                  <span className="text-red-500 dark:text-red-400 pl-1 font-bold">
                    451{" "}
                  </span>
                </span>
              </div>
            </div>
            <p className="text-sm leading-6 text-gray-500 md:leading-6">
              In a botanical sense, a fruit is the fleshy or dry ripened ovary
              of a flowering plant, enclosing the seed or seeds. Apricots,
              bananas, and grapes, as well as bean pods, corn grains, tomatoes,
              cucumbers, and (in their shells) acorns and almonds, are all
              technically fruits.
            </p>
            <div className="flex items-center my-4">
              <div className="font-serif product-price font-bold">
                <span className="inline-block text-2xl">$48.12</span>
              </div>
            </div>
            <div className="mb-1" />
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                  <button
                    disabled
                    className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                  >
                    <span className="text-dark text-base">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line x1={5} y1={12} x2={19} y2={12} />
                      </svg>
                    </span>
                  </button>
                  <p className="font-semibold flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8 md:w-20 xl:w-24">
                    1
                  </p>
                  <button
                    className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                    tabIndex={0}
                  >
                    <span className="text-dark text-base">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line x1={12} y1={5} x2={12} y2={19} />
                        <line x1={5} y1={12} x2={19} y2={12} />
                      </svg>
                    </span>
                  </button>
                </div>
                <button className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12">
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                <div>
                  <span className="font-serif font-semibold py-1 text-sm d-block">
                    <span className="text-gray-700"> Category:</span>{" "}
                    <button
                      type="button"
                      className="text-gray-600 font-serif font-medium underline ml-2 hover:text-teal-600"
                    >
                      fresh-fruits
                    </button>
                  </span>
                  <div className="flex flex-row">
                    <span className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2">
                      fresh fruits
                    </span>
                    <span className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2">
                      fruits
                    </span>
                    <span className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2">
                      vegetable
                    </span>
                  </div>
                </div>
                <div>
                  <button className="font-sans font-medium text-sm text-orange-500">
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductQuickView;

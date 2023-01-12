import React, { useState } from "react";
import MinusIcon from "../../../components/common/icons/MinusIcon";
import PlusIcon from "../../../components/common/icons/PlusIcon";
// import Rating from "../../components/common/Rating";
import ImageSlider from "./ImageSlider";

const imageList = [
  {
    id: 1,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0623/7578/8783/products/7.jpg?v=1644400528",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0623/7578/8783/products/5.jpg?v=1644402251",
  },
  {
    id: 3,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0623/7578/8783/products/21_176c53aa-e69d-4a0c-a63a-828e5ff904ba.jpg?v=1644402251",
  },
  {
    id: 4,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0623/7578/8783/products/7.jpg?v=1644400528",
  },
];
const ProductDetail = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const showFormHandle = () => {
    setShowForm(!showForm);
  };

  const [quantity, setQuantity] = useState(0);
  const decrease = () => {
    setQuantity(quantity - 1);
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <section className="max-w-screen-lg mx-auto px-5 py-4">
      {/* Container */}
      <div className="md:flex lg:max-w-md gap-4">
        {/* Layout */}
        <div className="w-full">
          {/* === Image === */}
          <div>
            {/* main img */}
            <img src={imageList[imageIndex].imageUrl} className="rounded-md" />
          </div>
          {/*slider images */}
          <div>
            <span className="lg:mt-2 flex rounded-md md:gap-4 gap-5 py-2">
              <ImageSlider
                imageIndex={imageIndex}
                imageList={imageList}
                setImageIndex={setImageIndex}
              />
            </span>
          </div>
        </div>

        <div>
          {/* === ContentBox ===*/}
          <div className="md:pl-6 md:w-[480px] lg:w-[500px] xl:w-[590px]">
            {/* Product info */}
            <span>
              {/* title */}
              <h4 className="mb-[10px] text-sm text-gray-500">
                Birthblessing-Toys
              </h4>
              <h2 className="mb-[10px] font-medium sm:text-lg md:text-xl lg:text-2xl">
                Babyhug Bear Face Rattle Cum Soft Toy
              </h2>
              <div className="flex gap-1.5">
                <p className="mb-[10px] font-bold sm:text-xl lg:text-3xl">
                  $300.00
                </p>
              </div>
            </span>
            <div className="mb-[10px] flex gap-1">
              {/* rating */}
              {/* <Rating /> */}
            </div>
            <div>
              {/* description */}
              <p className="mb-[10px] font-[2px] text-gray-500">
                Praesent suscipit quis ante sit amet mollis. Pellentesque nec
                fermentum lacus. Donec a tellus metus. Fusce eu mollis velit.
                Maecenas eu gravida ex. Praesent vitae auctor ligula. Morbi eget
                ipsum nisi. Maecenas feugiat lacinia nunc at laoreet. Integer
                efficitur, tellus ac pellentesque accumsan, diam diam rhoncus
                ante, ut molestie est tortor id tortor. Quisque vitae rutrum
                metus.
                <br />
                <br />
                Nam lacinia tempor urna in sodales. Suspendisse mollis nisl
                dictum velit dignissim pulvinar. Quisque ex ipsum, feugiat eu
                pulvinar eu, facilisis eget risus. Sed auctor dolor in ante
                facilisis, non mollis quam dictum. Fusce sit amet ipsum tellus.
                Morbi sit amet nulla at justo gravida volutpat id sed orci.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Sed non augue erat. Curabitur et
                fringilla ex.
              </p>
            </div>
            <div>
              {/* color */}
              <h5 className="pb-2">Color</h5>
              <div className="flex gap-2.5">
                <button className="rounded-md p-4 shadow-sm border hover:border-black text-xs bg-yellow-200"></button>
                <button className="rounded-md p-4 shadow-sm border hover:border-black text-xs bg-emerald-700"></button>
                <button className="rounded-md p-4 shadow-sm border hover:border-black text-xs bg-gray-400"></button>
              </div>
            </div>
            <div className="mt-3">
              {/* quantity */}
              <h5 className="pb-2">Quantity</h5>
              <div className="flex border gap-5 p-1.5 rounded-md w-1/4">
                <button
                  onClick={decrease}
                  className={` ${quantity <= 0 && "opacity-50"}`}
                  disabled={quantity <= 0}
                >
                  <MinusIcon />
                </button>
                <p>{quantity}</p>
                <button onClick={increase}>
                  <PlusIcon />
                </button>
              </div>
            </div>
            <div className="mt-4">
              {/* cart and buy buttons */}
              <div className="mb-3 text-center rounded-md py-2 bg-slate-700 hover:bg-black hover:cursor-pointer text-white">
                <button>Add To Cart</button>
              </div>
              <div className="border border-black mb-3 text-center rounded-md py-2  hover:bg-black hover:cursor-pointer hover:text-white">
                <button>Buy It Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ========= */}
      <div className="px-4 mt-7">
        <div className="border p-4 rounded-xl mb-7">
          {/* Review */}
          <div>
            <div className="md:flex justify-between">
              <span>
                <h3 className="text-2xl mb-2">Customer Reviews</h3>
                <p>No reviews yet</p>
              </span>
              <span>
                <button
                  onClick={() => showFormHandle(true)}
                  className="my-2 text-center rounded-xl px-3.5 py-2.5 text-sm bg-slate-700 hover:bg-black hover:cursor-pointer text-white"
                >
                  Write a review
                </button>
              </span>
            </div>
            {showForm && (
              <div>
                <hr className="mt-5" />
                <form className="mt-5 lg:pl-[30%]" showFormHandle={showForm}>
                  {/* review form */}
                  <h5>Write a review</h5>
                  <fieldset>
                    {/* name&contact */}
                    <div>
                      <p className="text-sm mt-2.5">Name</p>
                      <input
                        type="text"
                        name="review[author]"
                        placeholder="Enter your name"
                        className="mt-2 border pl-4 py-1.5 text-sm w-full lg:w-[70%]"
                      />
                    </div>
                    <div>
                      <p className="text-sm mt-2.5">Email</p>
                      <input
                        type="email"
                        name="review[email]"
                        placeholder="john.smith@example.com"
                        className="mt-2 border pl-4 py-1.5 text-sm w-full lg:w-[70%]"
                      />
                    </div>
                  </fieldset>
                  <fieldset>
                    {/* rating&review */}
                    <div>
                      {/* rating */}
                      <p className="text-sm mt-2.5">Rating</p>
                      <Rating className="flex justify-center my-1.5" />
                    </div>
                    <div>
                      <p className="text-sm mt-2.5">Review Title</p>
                      <input
                        type="text"
                        name="review[reviewtitle]"
                        placeholder="Give your review a title"
                        className="mt-2 border pl-4 py-1.5 text-sm w-full lg:w-[70%]"
                      />
                    </div>
                    <div>
                      <p className="text-sm mt-2.5">Body of Review (1500)</p>
                      <textarea
                        id="message"
                        rows="4"
                        className="mt-2 p-2.5 w-full lg:w-[70%] text-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your comments here"
                      ></textarea>
                    </div>
                  </fieldset>
                  <div className="">
                    <input
                      type="submit"
                      value="Submit Review"
                      className="my-4 text-center rounded-xl px-3.5 py-2.5 text-sm bg-slate-700 hover:bg-black hover:cursor-pointer text-white"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

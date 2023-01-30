import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import axios from "axios";
import AddToCart from "./AddToCart";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = ({ user }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const showFormHandle = () => {
    setShowForm(!showForm);
  };

  const { productId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => axios.get(`/products/${productId}`),
  });

  if (isLoading) return <h1>Loading...</h1>;
  const { data: product } = data;

  return (
    <section className="max-w-screen-xl mx-auto px-5 py-4">
      {/* Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Layout */}
        <div className="w-full">
          {/* === Image === */}
          <div>
            {/* main img */}
            <img src={product.photos[imageIndex]} className="rounded-md" />
          </div>
          {/*slider images */}
          <div>
            <span className="lg:mt-2 flex rounded-md md:gap-4 gap-5 py-2">
              <ImageSlider
                imageIndex={imageIndex}
                imageList={product.photos}
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
              <h4 className="mb-[10px] text-sm text-gray-500 uppercase">
                {product.category}
              </h4>
              <h2 className="mb-[10px] font-medium sm:text-lg md:text-xl lg:text-2xl">
                {product.title}
              </h2>
              <div className="flex gap-1.5">
                <p className="mb-[10px] font-bold sm:text-xl lg:text-3xl">
                  ${product.price}
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
                {product.description}
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
            <AddToCart product={product} user={user} />
          </div>
        </div>
      </div>
      {/* ========= */}
      <div className=" mt-7">
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
                  className="my-2 text-center rounded-xl px-3.5 py-2.5 text-sm bg-slate-700 hover:bg-black hover:cursor-pointer text-white">
                  Write a review
                </button>
              </span>
            </div>
            {showForm && (
              <div>
                <hr className="mt-5" />
                <form className="mt-5 lg:pl-[30%]">
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
                    {/* rating */}
                    {/* <div>
                      <p className="text-sm mt-2.5">Rating</p>
                      <Rating className="flex justify-center my-1.5" />
                    </div> */}
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
                        placeholder="Write your comments here"></textarea>
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
      <RelatedProduct product={product} />
    </section>
  );
};

export default ProductDetail;

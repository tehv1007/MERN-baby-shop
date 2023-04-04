import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import axios from "axios";
import AddToCart from "./AddToCart";
import RelatedProduct from "./RelatedProduct";
import CustomerReview from "./CustomerReview";
import Rating from "../../../components/review/Rating";
import Reviews from "../../../components/review/Reviews";
import GlobalSpinner from "../../../components/common/GlobalSpinner";

const ProductDetail = ({ user }) => {
  const { productId } = useParams();
  const [imageIndex, setImageIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const showFormHandle = () => {
    setShowForm(!showForm);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product", "reviews", productId],
    queryFn: () => axios.get(`/products/${productId}`),
  });

  if (isLoading) return <GlobalSpinner />;
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
              <Rating productId={productId} />
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
                {product.numReviews <= 0 ? (
                  <p>No reviews yet</p>
                ) : (
                  <Rating productId={productId} />
                )}
              </span>
              <span>
                <button
                  onClick={() => showFormHandle(true)}
                  className={`my-2 text-center rounded-xl px-3.5 py-2.5 text-sm bg-slate-700 hover:bg-black hover:cursor-pointer text-white`}
                >
                  Write a review
                </button>
              </span>
            </div>

            {/* Review form */}
            {!user ? (
              <p className="mt-5 text-lg">
                You need to{"  "}
                <a className="underline text-blue-500" href="/signin">
                  Login
                </a>{" "}
                to write a review
              </p>
            ) : (
              <>
                {showForm && (
                  <CustomerReview productId={productId} user={user} />
                )}
              </>
            )}

            {/* Review list */}
            <Reviews productId={productId} userId={user?._id} />
          </div>
        </div>
      </div>
      {/* <Reviews productId={productId} /> */}
      <RelatedProduct product={product} user={user} />
    </section>
  );
};

export default ProductDetail;

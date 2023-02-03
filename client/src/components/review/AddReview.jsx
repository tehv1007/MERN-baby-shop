import axios from "axios";
import React, { useState, useRef } from "react";

export default function AddReviewButton({ product }) {
  const ref = useRef();
  const reviewContentRef = useRef();
  const ratingRef = useRef();

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (ratingRef.current.value > 5 || ratingRef.current.value < 1) {
      setError(
        "Please provide your rating for this product on the scale from 1 to 5!"
      );
      setShowAlert(true);
      return;
    }

    try {
      const res = await axios({
        method: "POST",
        url: `/reviews`,
        data: {
          product: product._id,
          review: reviewContentRef.current.value,
          rating: ratingRef.current.value,
        },
        withCredentials: true,
      });

      if (res.data.status === "success") {
        setMessage("Your review has been submited");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
    } catch (err) {
      setError(err.response.data.message);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        ref={ref}
        className="p-4 bg-white w-80 md:w-30-rem z-40 relative"
        onSubmit={handleSubmitReview}>
        <h2 className="text-2xl text-cyan-400 font-semibold text-center">
          Write A Review
        </h2>
        <h3 className="text-lg text-slate-700 ">Product: {product.title}</h3>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="review-rating">
            Rating
          </label>
          <input
            type="number"
            name="review-rating"
            id="review-rating"
            className="form-input"
            min={1}
            max={5}
            ref={ratingRef}
          />
        </fieldset>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="review-content">
            Your Message
          </label>
          <textarea
            name="review-content"
            id="review-conten"
            className="w-full resize-y form-input h-20"
            ref={reviewContentRef}></textarea>
        </fieldset>
        <button
          className="submit-button disabled:bg-slate-300 disabled:text-slate-500"
          type="submit"
          // disabled={isLoading || message !== ""}
        >
          Submit Review
        </button>
      </form>
    </>
  );
}

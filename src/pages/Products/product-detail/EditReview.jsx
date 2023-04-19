import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewValidate } from "../../../validation/userSchema";
import { editReview } from "../../../hooks/useUser";
import FormRowError from "../../../components/common/RowError";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};
const stars = Array(5).fill(0);

const EditReview = ({ productId, review, setShowForm }) => {
  const [currentValue, setCurrentValue] = useState(review.rating);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [rating, setRating] = useState(review.rating);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty = true },
  } = useForm({
    resolver: yupResolver(reviewValidate),
  });

  useEffect(() => {
    reset(review);
  }, [review]);

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const mutation = editReview(
    review.id,
    productId,
    reset,
    setHoverValue,
    setCurrentValue,
    setShowForm
  );

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      content: data,
      rating: rating,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 lg:pl-[30%]">
      {/* review form */}
      <h5 className="font-bold">Edit your review</h5>
      <p className="text-sm mt-2.5">Rating</p>
      <div className="flex my-1.5">
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              onClick={() => {
                setRating(index + 1);
                setCurrentValue(index + 1);
              }}
              onMouseOver={() => handleMouseOver(index + 1)}
            />
          );
        })}
      </div>

      <div>
        <p className="text-sm mt-2.5">Review Title</p>
        <input
          {...register("title")}
          type="text"
          name="title"
          placeholder="Give your review a title"
          className="mt-2 border pl-4 py-1.5 text-sm w-full lg:w-[70%]"
        />
        <FormRowError error={errors.title} />
      </div>
      <div>
        <p className="text-sm mt-2.5">Body of Review (1500)</p>
        <textarea
          {...register("content")}
          id="message"
          rows="4"
          className="mt-2 p-2.5 w-full lg:w-[70%] text-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your comments here"
        ></textarea>
        <FormRowError error={errors.content} />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={!isDirty}
          className="my-4 text-center rounded-xl px-3.5 py-2.5 text-sm bg-slate-700 hover:bg-black hover:cursor-pointer text-white"
        >
          Edit Review
        </button>
      </div>

      {mutation.isError ? (
        <div className="p-4 text-sm bg-red-600 text-white rounded text-center border my-2 w-[70%]">
          An error occurred: {mutation.error.response.data}
        </div>
      ) : null}
    </form>
  );
};

export default EditReview;

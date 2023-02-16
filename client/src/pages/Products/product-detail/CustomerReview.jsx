import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormRowError from "../../../components/common/RowError";
import axios from "axios";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const reviewValidate = yup
  .object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("You need write something"),
  })
  .required();

const CustomerReview = ({ productId, user }) => {
  const [rating, setRating] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewValidate),
  });

  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newReview) =>
      axios.post(`/reviews/${productId}/${user._id}`, newReview),
    onSuccess: () => {
      reset;
      queryClient.invalidateQueries({ queryKey: ["reviews", "products"] });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      review: data,
      productId: productId,
      rating: rating,
      userId: user._id,
    });
  };

  return (
    <>
      <div>
        <hr className="mt-5" />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 lg:pl-[30%]">
          {/* review form */}
          <h5>Write a review</h5>
          {/* rating&review */}
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
          {/* <FormRowError error={errors.rating} /> */}

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
              className="mt-2 p-2.5 w-full lg:w-[70%] text-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your comments here"></textarea>
            <FormRowError error={errors.content} />
          </div>

          <button
            type="submit"
            className="my-4 text-center rounded-xl px-3.5 py-2.5 text-sm bg-slate-700 hover:bg-black hover:cursor-pointer text-white">
            Submit Review
          </button>
        </form>
        <hr className="mt-5" />
      </div>
    </>
  );
};

export default CustomerReview;

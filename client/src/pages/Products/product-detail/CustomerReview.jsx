import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormRowError from "../../../components/common/RowError";
import { reviewValidate } from "../../../validation/reviewValidate";
import axios from "axios";

const CustomerReview = ({ productId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewValidate),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newReview) => axios.post(`/reviews`, newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate({ review: data, productId: productId });
  };

  return (
    <>
      <div>
        <hr className="mt-5" />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 lg:pl-[30%]">
          {/* review form */}
          <h5>Write a review</h5>
          <fieldset>
            {/* name&contact */}
            <div>
              <p className="text-sm mt-2.5">Name</p>
              <input
                {...register("name")}
                type="text"
                name="name"
                placeholder="Enter your name"
                className="mt-2 border pl-4 py-1.5 text-sm w-full lg:w-[70%]"
              />
              <FormRowError error={errors.name} />
            </div>
            <div>
              <p className="text-sm mt-2.5">Email</p>
              <input
                {...register("email")}
                type="email"
                name="email"
                placeholder="john.smith@example.com"
                className="mt-2 border pl-4 py-1.5 text-sm w-full lg:w-[70%]"
              />
              <FormRowError error={errors.email} />
            </div>
          </fieldset>
          <fieldset>
            {/* rating&review */}
            {/* rating */}
            {/* <div>
                      <p className="text-sm mt-2.5">Rating</p>
                      <Rating className="flex justify-center my-1.5" />
                    </div> */}
            <p className="text-sm mt-2.5">Rating</p>
            <input
              type="number"
              name="rating"
              id="review-rating"
              className="form-input border flex justify-center my-1.5"
              min={1}
              max={5}
              // ref={ratingRef}
              {...register("rating")}
            />
            <FormRowError error={errors.rating} />

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
    </>
  );
};

export default CustomerReview;

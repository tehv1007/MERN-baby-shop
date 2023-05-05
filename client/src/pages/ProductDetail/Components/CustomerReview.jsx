import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { addReview } from "../../../hooks/useUser";
import { ReviewForm } from "./ReviewForm";
import { reviewValidate } from "../../../validation/userSchema";

const CustomerReview = ({ productId, user }) => {
  const [rating, setRating] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(reviewValidate),
  });

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const mutation = addReview(
    user,
    productId,
    reset,
    setHoverValue,
    setCurrentValue
  );

  const onSubmit = (data) => {
    mutation.mutate({
      review: data,
      productId: productId,
      rating: rating,
      userId: user._id,
      createdAt: new Date().toISOString(),
      user: user,
    });
  };

  return (
    <>
      <div>
        <hr className="mt-5" />
        <ReviewForm
          onSubmit={handleSubmit(onSubmit)}
          hoverValue={hoverValue}
          currentValue={currentValue}
          setRating={setRating}
          setCurrentValue={setCurrentValue}
          handleMouseOver={handleMouseOver}
          register={register}
          errors={errors}
          mutation={mutation}
          isDirty={isDirty}
        />
        <hr className="mt-5" />
      </div>
    </>
  );
};

export default CustomerReview;

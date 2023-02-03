import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import Review from "./Review";

export default function Reviews({ productId, closeReviews }) {
  const ref = useRef();

  let reviews;
  const { data } = useQuery({
    queryKey: ["reviews", "products"],
    queryFn: () => axios.get(`/reviews/${productId}`),
  });

  if (!data) reviews = [];
  else reviews = data.data;

  return (
    <div
      className="w-80 h-1/2 relative p-4 bg-white md:w-30-rem max-h-96 overflow-y-autoscrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-gray-100"
      ref={ref}>
      <h2 className="text-center text-2xl font-semibold text-cyan-400">
        Reviews
      </h2>
      <button className="absolute top-6 right-6">
        <FontAwesomeIcon icon={faClose} onClick={closeReviews} />
      </button>
      <div className="mt-4 space-y-4">
        {reviews?.map((review, index) => (
          <Review
            key={`review_${index}`}
            email={review.review.email}
            name={review.review.name}
            rating={review.review.rating}
            reviewContent={review.review.content}
            ratedAt={new Date(review.review.createdAt).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}
          />
        ))}
      </div>
    </div>
  );
}

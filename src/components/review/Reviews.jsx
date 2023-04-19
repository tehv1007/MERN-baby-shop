import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RatingItem from "./RatingItem";
import { useState } from "react";
import EditReview from "../../pages/Products/product-detail/EditReview";
import formatDate from "../../services/formatDate";

export default function Reviews({ productId, userId }) {
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState("");

  // Get reviews
  let reviews;
  const { data } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => axios.get(`/reviews/${productId}`),
  });

  if (!data) reviews = [];
  else reviews = data.data.reviews;

  return (
    <div className="container">
      <div className="text-sm leading-5 mt-5 text-left grid md:grid-cols-2">
        {reviews.map((review, i) => (
          <div key={i} className="mr-8 py-4">
            <div className="">
              <div className="box-top">
                <div className="flex items-center gap-2">
                  {review.user ? (
                    <div>
                      <img src={review.user.image} className="h-10 w-auto" />
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    <RatingItem avgRating={review.rating} />
                    <p className="text-xs leading-4 text-gray-400">
                      {review.user ? review.user.username : userId}
                    </p>
                  </div>
                </div>

                <p className="text-xs leading-4 text-gray-400 my-3">
                  {formatDate(review.createdAt)}
                </p>

                <div className="title">
                  <strong>{review.title}</strong>
                </div>
              </div>
              <div>{review.content}</div>

              {review.userId == userId && review.canEdit && (
                <button
                  className="edit-button border rounded-md mt-2 px-4 bg-orange-400 hover:bg-orange-100"
                  onClick={() => {
                    setShowForm(!showForm);
                    setReview(review);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <EditReview
          review={review}
          productId={productId}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RatingItem from "./RatingItem";

export default function Reviews({ productId, userId }) {
  let reviews;
  const { data } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => axios.get(`/reviews/${productId}`),
  });

  if (!data) reviews = [];
  else reviews = data.data.reviews;

  const formatDate = (date) => {
    // Parse the ISO string into a Date object
    const formattedDate = new Date(date);

    // Format the date string using the user's locale settings
    const formattedDateString = formattedDate.toLocaleString("en-GB");
    return formattedDateString;
  };

  const handleEditClick = () => {};

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
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

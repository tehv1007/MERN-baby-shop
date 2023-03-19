import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RatingItem from "./RatingItem";

export default function Reviews({ productId, userId }) {
  let reviews;
  const { data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => axios.get(`/reviews/${productId}`),
  });

  if (!data) reviews = [];
  else reviews = data.data.reviews;
  console.log(reviews);

  const formatDate = (date) => {
    // Parse the ISO string into a Date object
    const formatedDate = new Date(date);

    // Format the date string using the user's locale settings
    const formattedDateString = formatedDate.toLocaleString("en-GB");
    return formattedDateString;
  };

  const handleEditClick = () => {};

  return (
    <div className="container">
      <div className="text-sm leading-5 mt-5 text-left grid md:grid-cols-2">
        {reviews.map((review, i) => (
          <div key={i} className="mr-8 py-4">
          <div>
            <img/>
          </div>
            <div className="">
              <div className="box-top">
                <RatingItem avgRating={review.rating} />
                <div>
                  <p className="text-xs leading-4 text-gray-400 mt-3">
                    {review.userId}
                  </p>
                  <p className="text-xs leading-4 text-gray-400 mb-3">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                <div className="title">
                  <strong>{review.title}</strong>
                </div>
              </div>
              <div>{review.content}</div>

              {review.userId == userId && review.canEdit && (
                <button className="edit-button" onClick={handleEditClick}>
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

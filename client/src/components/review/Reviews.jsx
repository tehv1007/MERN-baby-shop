import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RatingItem from "./RatingItem";

export default function Reviews({ productId }) {
  let reviews;
  const { data } = useQuery({
    queryKey: ["reviews", "products"],
    queryFn: () => axios.get(`/reviews/${productId}`),
  });

  if (!data) reviews = [];
  else reviews = data.data;

  return (
    <div className="container">
      <div className="text-sm leading-5 mt-5 text-left grid md:grid-cols-2">
        {reviews.map((review, i) => (
          <div key={i} className="mr-8 py-4">
            <div className="">
              <div className="box-top">
                <RatingItem avgRating={review.rating} />
                <div className="title">
                  <strong>{review.review[0].title}</strong>
                </div>
              </div>

              <div>{review.review[0].content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

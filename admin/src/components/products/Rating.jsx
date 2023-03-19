import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Rating({ productId }) {
  let reviews;
  const { data } = useQuery({
    queryKey: ["rating"],
    queryFn: () => axios.get(`/reviews/${productId}`),
  });

  if (!data) reviews = [];
  else reviews = data.data.reviews;
  console.log(data);

  let totalRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0)
      : 0;
  let numReviews = reviews.length;
  let avgRating = 0;
  avgRating = Number(
    numReviews > 0 ? (totalRating / numReviews).toFixed(1) : 0
  );
  console.log(avgRating);

  return (
    <div className="rating">
      <span>
        <i
          className={
            avgRating >= 1
              ? "fa fa-star"
              : avgRating >= 0.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            avgRating >= 2
              ? "fa fa-star"
              : avgRating >= 1.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            avgRating >= 3
              ? "fa fa-star"
              : avgRating >= 2.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            avgRating >= 4
              ? "fa fa-star"
              : avgRating >= 3.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            avgRating >= 5
              ? "fa fa-star"
              : avgRating >= 4.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      {numReviews >= 0 ? <span>{"(" + numReviews + ")"}</span> : <span></span>}
    </div>
  );
}

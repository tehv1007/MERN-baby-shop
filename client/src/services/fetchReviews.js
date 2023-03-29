import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function fetchReviews(productId) {
  let reviews;
  let avgRating = 0;
  let numReviews;

  const { data } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => axios.get(`/reviews/${productId}`),
  });

  if (!data) reviews = [];
  else {
    reviews = data.data.reviews;

    let totalRating =
      reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
    numReviews = reviews.length;
    avgRating = numReviews > 0 ? (totalRating / numReviews).toFixed(1) : 0;
  }
  return { avgRating: avgRating, numReviews: numReviews };
}

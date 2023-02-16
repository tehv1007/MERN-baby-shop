import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function fetchReviews(productId) {
  let reviews;
  const { data } = useQuery({
    queryKey: ["reviews", "products"],
    queryFn: () => axios.get(`/reviews/${productId}`),
  });

  if (!data) reviews = [];
  else reviews = data.data;
  console.log(data);

  let totalRating = reviews.reduce((acc, review) => acc + review, 0) || 0;
  let totalReviews = reviews.length;
  let rating = 0;
  rating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;
  return { rating: rating, totalReviews: totalReviews };
}

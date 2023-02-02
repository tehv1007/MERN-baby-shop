import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getCartItems = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const { data, isLoading } = useQuery({
      queryKey: ["cart"],
      queryFn: () => {
        return axios.get(`/cart/${user._id}`);
      },
    });
    return { data, isLoading };
  }
  return { data: [] };
};

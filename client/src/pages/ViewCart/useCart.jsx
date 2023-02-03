import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addItemToCart } from "../../services/cartService";

export const getCartItems = (user) => {
  if (user) {
    const { data, isLoading } = useQuery({
      queryKey: ["cart", "products"],
      queryFn: () => axios.get(`/cart/${user._id}`),
    });
    return { data, isLoading };
  }
  return { data: [] };
};

export const addCartItem = (user, quantity) => {
  const queryClient = useQueryClient();
  const addCartItem = useMutation({
    mutationFn: (product) => addItemToCart(user, quantity, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "products"] });
    },
  });
  return addCartItem;
};

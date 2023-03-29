import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addItemToCart, emptyCart } from "../../services/cartService";
import { toast } from "react-toastify";

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
      toast.success("Successfully add product to cart");
    },
  });
  return addCartItem;
};

export const removeCartItems = (user) => {
  const queryClient = useQueryClient();
  const removeCartItems = useMutation({
    mutationFn: () => emptyCart(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return removeCartItems;
};

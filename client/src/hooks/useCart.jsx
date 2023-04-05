import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
    mutationFn: (product) =>
      axios.post(`/cart/${user._id}`, {
        quantity: quantity,
        productId: product._id,
      }),
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
    mutationFn: () => axios.delete(`/cart/${user._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return removeCartItems;
};

export const removeCartItem = (user) => {
  const queryClient = useQueryClient();
  const removeCartItem = useMutation({
    mutationFn: (product) => axios.delete(`/cart/${user._id}/${product._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "products"] });
      toast.success("Successfully removed product");
    },
  });

  return removeCartItem;
};

export const updateCartItem = (user) => {
  const queryClient = useQueryClient();
  const updateCartItem = useMutation({
    mutationFn: (product) => axios.put(`/cart/${user._id}/${product._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "products"] });
    },
  });

  return updateCartItem;
};

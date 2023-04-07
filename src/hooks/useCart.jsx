import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const getCartItems = (user) => {
  if (user) {
    const { data, isLoading } = useQuery({
      queryKey: ["cart"],
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
      axios.post(`/cart/${user._id}/add-to-cart/${product._id}`, {
        quantity: quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
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

export const removeCartItem = (user, product) => {
  const queryClient = useQueryClient();
  const removeCartItem = useMutation({
    mutationFn: () =>
      axios.delete(`/cart/${user._id}/remove-from-cart/${product.productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Successfully removed product");
    },
  });

  return removeCartItem;
};

export const increaseQuantity = (user, product) => {
  const queryClient = useQueryClient();
  const increaseQuantity = useMutation({
    mutationFn: () =>
      axios.put(`/cart/${user._id}/increase-quantity/${product.productId}`, {
        quantity: product.quantity + 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return increaseQuantity;
};

export const decreaseQuantity = (user, product) => {
  const queryClient = useQueryClient();
  const decreaseQuantity = useMutation({
    mutationFn: () =>
      axios.put(`/cart/${user._id}/decrease-quantity/${product.productId}`, {
        quantity: product.quantity - 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return decreaseQuantity;
};

export const quantityChange = (user, product) => {
  const queryClient = useQueryClient();
  const quantityChange = useMutation({
    mutationFn: (newQuantity) =>
      axios.put(`/cart/${user._id}/change-quantity/${product.productId}`, {
        quantity: newQuantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return quantityChange;
};

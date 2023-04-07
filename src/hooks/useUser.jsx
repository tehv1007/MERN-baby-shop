import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const cancelModal = (ref) => {
  const queryClient = useQueryClient();
  const cancelModal = useMutation({
    mutationFn: (orderId) => axios.put(`/orders/${orderId}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      ref.current.checked = false;
      toast.success("Successfully cancelled your order!");
    },
    onError: (err) => {
      toast.error(`Error: ${err.response.data.message}:`);
      ref.current.checked = false;
    },
  });

  return cancelModal;
};

export const changePassword = (reset, user) => {
  const changePassword = useMutation({
    mutationFn: (newPassword) =>
      axios.put(`/users/${user._id}/password`, newPassword),
    onSuccess: () => {
      reset();
      toast.success("Successfully updated password");
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.response.data.message}`);
    },
  });

  return changePassword;
};

export const updateProfile = (reset, user) => {
  const updateProfile = useMutation({
    mutationFn: (newProfile) =>
      axios.put(`/users/${user._id}/profile`, newProfile),
    onSuccess: () => {
      reset();
      toast.success("Successfully updated profile");
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.response.data.message}`);
    },
  });

  return updateProfile;
};

export const addReview = (
  user,
  productId,
  reset,
  setHoverValue,
  setCurrentValue
) => {
  const queryClient = useQueryClient();
  const addReview = useMutation({
    mutationFn: (newReview) =>
      axios.post(`/reviews/${productId}/${user._id}`, newReview),
    onSuccess: () => {
      reset();
      setHoverValue(0);
      setCurrentValue(0);
      toast.success("Successfully add a review");
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },

    onError: (error) => {
      reset();
      setHoverValue(0);
      setCurrentValue(0);
      toast.error(error.response.data);
    },
  });

  return addReview;
};

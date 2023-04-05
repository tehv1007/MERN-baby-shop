import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const paymentWithCOD = (userId, removeItems) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const paymentWithCOD = useMutation({
    mutationFn: (orderData) => {
      axios.post(`/orders/${userId}`, { order: orderData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      removeItems.mutate();
      toast.success("Successfully created order");
      navigate(`/user/my-orders`);
    },
  });

  return paymentWithCOD;
};

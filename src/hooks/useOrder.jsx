import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const getCustomerOrder = (userId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get(`/admin/${userId}/orders`),
  });
  return { data, isLoading };
};

export const getOrderById = (orderId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => axios.get(`/admin/orders/${orderId}`),
  });
  return { data, isLoading };
};

export const updateOrderStatus = (_id) => {
  const queryClient = useQueryClient();
  const statusMutation = useMutation({
    mutationFn: (status) => {
      return axios.put(`/admin/orders/${_id}`, { status: status });
    },
    onSuccess: () => {
      toast.success("Successfully update order status!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.response.data.message}`);
    },
  });
  return statusMutation;
};

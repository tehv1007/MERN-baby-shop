import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const disableUser = (ref, isActive) => {
  const queryClient = useQueryClient();
  const disableUser = useMutation({
    mutationFn: (userId) => axios.put(`/admin/${userId}/disable`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      ref.current.checked = false;
      toast.success(`Successfully ${isActive ? "disabled" : "enabled"} user!`);
    },
    onError: (err) => {
      toast.error(`Error: ${mutation.response.data}`);
    },
  });

  return disableUser;
};

export const deleteAdminUser = (handleDelete, ref) => {
  const deleteAdminUser = useMutation({
    mutationFn: (userId) => handleDelete(userId),
    onSuccess: () => {
      ref.current.checked = false;
      toast.success("Successfully deleted admin user!");
    },
    onError: (err) => {
      toast.error(`Error: ${err}:`);
    },
  });

  return deleteAdminUser;
};

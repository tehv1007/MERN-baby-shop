import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const deleteCategory = (ref) => {
  const queryClient = useQueryClient();
  const deleteCategory = useMutation({
    mutationFn: (categoryId) => axios.delete(`/categories/${categoryId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      ref.current.checked = false;
      toast.success("Successfully deleted category");
    },
    onError: (err) => {
      toast.error(`Error: ${err.response.data.message}:`);
      ref.current.checked = false;
    },
  });

  return deleteCategory;
};

export const addCategory = (reset, setImage) => {
  const addCategory = useMutation({
    mutationFn: (newCategory) => axios.post("/categories/new", newCategory),
    onSuccess: () => {
      reset({ collections: "", title: "" });
      setImage(null);
      toast.success("Successfully created category");
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.response.data.message}`);
    },
  });

  return addCategory;
};

export const updateCategory = (categoryId) => {
  const navigate = useNavigate();
  const updateCategory = useMutation({
    mutationFn: (updatedCategory) =>
      axios.post(`/categories/${categoryId}`, updatedCategory),
    onSuccess: () => {
      // reset({ collections: "", title: "" });
      // setImage(null);
      toast.success("Successfully updated category");
      setTimeout(() => navigate("/categories"), 5000);
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.response.data.message}`);
    },
  });

  return updateCategory;
};

export const getAllCategories = () => {
  const { isLoading, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get("/categories"),
    select: (res) => res.data,
  });

  return { isLoading, data: categories };
};

export const getCategoryById = (categoryId) => {
  const { isLoading, data: category } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => axios.get(`/categories/${categoryId}`),
    select: (res) => res.data,
  });

  return { isLoading, data: category };
};

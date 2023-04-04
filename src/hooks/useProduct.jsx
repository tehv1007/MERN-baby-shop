import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  getProductById,
  updateProductById,
} from "../services/productsService";

export const addProduct = (reset) => {
  const addProduct = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct),
    onSuccess: () => {
      reset();
      toast.success("Successfully created new product");
    },
    onError: (error) => {
      toast.error(`Error: ${error}`);
    },
  });
  return addProduct;
};

export const getProductDetail = (productId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });
  return { data, isLoading };
};

export const updateProduct = (productId) => {
  const navigate = useNavigate();

  const updateProduct = useMutation({
    mutationFn: (newProduct) => updateProductById(productId, newProduct),
    onSuccess: () => {
      toast.success("Successfully update product!");
      navigate("/products");
    },
  });

  return updateProduct;
};

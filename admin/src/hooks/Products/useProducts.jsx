import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productsService";

const useProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return { data, isLoading };
};

export default useProducts;

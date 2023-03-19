import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../services/productsService";
import useDebounce from "../useDebounce";

const useSearchProducts = (searchString, delay = 500) => {
  const debouncedSearch = useDebounce(searchString, delay);

  const { data, isLoading } = useQuery({
    queryKey: ["products", { q: debouncedSearch }],
    queryFn: () => searchProducts(searchString),
    keepPreviousData: true,
  });
  return { data, isLoading };
};

export default useSearchProducts;

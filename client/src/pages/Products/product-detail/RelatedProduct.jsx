import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getRandom } from "../../../services/productsService";
import ProductCard from "../ProductCard";

const RelatedProduct = ({ product }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", product],
    queryFn: () => {
      return axios.get(`/products/related/${product.category}/${product._id}`);
    },
    // cacheTime: 5 * 60 * 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;
  const { data: products } = data;

  const relatedProducts = getRandom(products, 4);
  return (
    <>
      <h2 className="font-bold capitalize mb-8 text-center text-4xl">
        <span>You may also like</span>
      </h2>
      <div className="grid grid-cols-2 gap-6 pt-4 lg:grid-cols-4">
        {/* Product Card */}
        {relatedProducts?.map((item) => {
          return <ProductCard product={item} key={item._id} />;
        })}
      </div>
    </>
  );
};

export default RelatedProduct;

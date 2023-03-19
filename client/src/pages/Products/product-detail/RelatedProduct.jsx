import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import { getRandom } from "../../../services/productsService";
import ProductCard from "../ProductCard";

const RelatedProduct = ({ product, user }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", product],
    queryFn: () => {
      return axios.get(`/products/related/${product.category}/${product._id}`);
    },
    // cacheTime: 5 * 60 * 1000,
  });

  if (isLoading) return <GlobalSpinner />;
  const { data: products } = data;
  const relatedProducts = getRandom(products, 4);

  return (
    <>
      <h2 className="font-bold capitalize mb-8 text-center text-4xl">
        <span>You may also like</span>
      </h2>
      <div className="grid grid-cols-2 gap-6 pt-4 lg:grid-cols-4">
        {/* Product Card */}
        {relatedProducts?.map((item) => (
          <ProductCard product={item} key={item._id} user={user} />
        ))}
      </div>
    </>
  );
};

export default RelatedProduct;

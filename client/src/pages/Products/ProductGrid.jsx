import ProductCard from "./ProductCard";
import ProductCardRow from "./ProductCardRow";
import notFound from "../../assets/no_results_found.webp";

const ProductGrid = ({ products, display, user }) => {
  return products.length > 0 ? (
    display === true ? (
      <div className="grid grid-cols-2 gap-6 pt-4 lg:grid-cols-4">
        {/* Product Card */}
        {products.map((item) => {
          return <ProductCard product={item} key={item._id} user={user} />;
        })}
      </div>
    ) : (
      <div>
        {/* Product Rows */}
        {products.map((item) => {
          return <ProductCardRow product={item} key={item._id} user={user} />;
        })}
      </div>
    )
  ) : (
    <div className="text-center">
      <img
        src={notFound}
        alt="No Product Found"
        className="block max-w-[500px] mx-auto"
      />
    </div>
  );
};
export default ProductGrid;

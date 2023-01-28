import ProductCard from "./ProductCard";
import ProdudctCardRow from "./ProdudctCardRow";

const ProductGrid = ({ products, display }) => {
  return display === true ? (
    <div className="grid grid-cols-2 gap-6 pt-4 lg:grid-cols-4">
      {/* Product Card */}
      {products.map((item) => {
        return <ProductCard product={item} key={item._id} />;
      })}
    </div>
  ) : (
    <div>
      {/* Product Rows */}
      {products.map((item) => {
        return <ProdudctCardRow product={item} key={item._id} />;
      })}
    </div>
  );
};
export default ProductGrid;

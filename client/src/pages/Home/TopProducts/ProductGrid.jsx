import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4">
      {/* Product Card */}
      {products.map((item) => {
        return <ProductCard key={item._id} product={item} />;
      })}
    </div>
  );
};
export default ProductGrid;

import ProductCard from "../../Products/ProductCard";

const ProductGrid = ({ products, user }) => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4">
      {/* Product Card */}
      {products.map((item) => {
        return <ProductCard key={item._id} product={item} user={user} />;
      })}
    </div>
  );
};
export default ProductGrid;

import ProductCard from "./ProductCard";
import ProductCardRow from "./ProductCardRow";

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
    <h1 className="text-center text-3xl my-10">No Product Found</h1>
  );
};
export default ProductGrid;

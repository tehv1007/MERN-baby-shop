import ProductCard from "./ProductCard";
// import productsList from "./ProductsList";
const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-6 pt-4 lg:grid-cols-4">
      {/* Product Card */}
      {products.map((item) => {
        return (
          <ProductCard
            key={item._id}
            title={item.title}
            imageUrl={item.photos[0]}
            price={item.price}
            id={item._id}
          />
        );
      })}
    </div>
  );
};
export default ProductGrid;

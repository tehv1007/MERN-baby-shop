import Topproducts from "./Topproducts";
import ProductCard from "./ProductCard";
import { useState } from "react";

const ProductGrid = () => {
  const [cart, setCart] = useState([]);

  const handleClick = (item) => {
    // console.log(setCart([...cart, item]));
    cart.push(item);
    console.log(cart);
  };
  return (
    <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4">
      {/* Product Card */}
      {Topproducts.map((item) => {
        return (
          <ProductCard
            key={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
          />
        );
      })}
    </div>
  );
};
export default ProductGrid;

import { createContext, useContext, useReducer } from "react";
import GlobalSpinner from "../components/common/GlobalSpinner";
import { getCartItems } from "../pages/Cart/useCart";

const ProductsContext = createContext(null);
const ProductsDispatchContext = createContext(null);

let initialProducts;
const user = JSON.parse(localStorage.getItem("user"));

export function ProductsProvider({ children }) {
  const { data } = getCartItems(user);
  if (isLoading) return <GlobalSpinner />;
  initialProducts = data?.data?.products || [];
  console.log(initialProducts);
  const [products, dispatch] = useReducer(productsReducer, initialProducts);

  return (
    <ProductsContext.Provider value={products}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductsContext);
}

export function useProductDispatch() {
  return useContext(ProductsDispatchContext);
}

function productsReducer(products, action) {
  switch (action.type) {
    case "added": {
      return [
        ...products,
        {
          product: action.product,
          quantity: action.quantity,
          price: action.price,
        },
      ];
    }
    case "changed": {
      return products.map((t) => {
        if (t.id === action.product.id) {
          return action.product;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return products.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

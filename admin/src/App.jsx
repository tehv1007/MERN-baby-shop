import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products/Products";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import ProductEdit from "./Pages/Products/ProductEdit";
import AddNewProduct from "./Pages/Products/AddNewProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="products/new" element={<AddNewProduct />} />
          <Route path="products/edit" element={<ProductEdit />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;

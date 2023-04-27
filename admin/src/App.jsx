import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products/Products";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import ProductEdit from "./Pages/Products/ProductEdit";
import AddNewProduct from "./Pages/Products/AddNewProduct";
import { ToastContainer } from "react-toastify";
import NotFound from "./Pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import ProductDetail from "./Pages/Products/ProductDetail";
import CustomerOrders from "./Pages/Orders/CustomerOrders";
import Category from "./Pages/Category/Category";
import OrderDetail from "./Pages/Orders/OrderDetail";
import Coupons from "./Pages/Coupons/Coupons";
import Admin from "./Pages/Admin/Admin";
import AddNew from "./Pages/Admin/AddNew";
import Login from "./Pages/Login/Login";
import ForceRedirect from "./components/auth/ForceRedirect";
import AddCategory from "./Pages/Category/AddCategory";
import EditCategory from "./Pages/Category/EditCategory";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = () => {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="products/new" element={<AddNewProduct />} />
          <Route path="products/:productId/edit" element={<ProductEdit />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="/customers" element={<Users />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/new" element={<AddNew />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/:userId/orders" element={<CustomerOrders />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/new" element={<AddCategory />} />
          <Route path="/category/:categoryId/edit" element={<EditCategory />} />
          <Route path="/coupons" element={<Coupons />} />
        </Route>
        <Route
          path="/login"
          element={
            <ForceRedirect user={currentUser}>
              <Login />
            </ForceRedirect>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;

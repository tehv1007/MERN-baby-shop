import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import PasswordReset from "./pages/Authentication/PasswordReset";
import Signup from "./pages/Authentication/Signup";
import Signin from "./pages/Authentication/Signin";
import PostPage from "./pages/Blog/PostPage";
import BlogPage from "./pages/Blog/BlogPage";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/product-detail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import OrderShipping from "./pages/CheckOut/OrderShipping";
import CheckOut from "./pages/CheckOut/CheckOut";
import Navbar from "./components/layouts/Navbar/NavBar";
import Footer from "./components/layouts/Footer";
import Signout from "./pages/Authentication/Signout";
import { getUser } from "./services/authService";
import ForceRedirect from "./components/auth/ForceRedirect";
import { ToastContainer } from "react-toastify";
import OrderInformation from "./pages/CheckOut/OrderInformation";
import DashBoard from "./pages/User/DashBoard";
import MyOrders from "./pages/User/MyOrders";
import UpdateProfile from "./pages/User/UpdateProfile";
import ChangePassword from "./pages/User/ChangePassword";
import OrderDetail from "./pages/User/OrderDetail";
import EmailVerify from "./pages/Authentication/EmailVerify";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import GlobalSpinner from "./components/common/GlobalSpinner";
import MobileMenu from "./components/MobileMenu";

getUser();
const localUser = JSON.parse(localStorage.getItem("user"));

function App() {
  let user = null;
  if (localUser) {
    const { data, isLoading } = useQuery(["user"], async () => {
      const res = await axios.get(`/users/find/${localUser._id}`);
      return res.data;
    });

    if (isLoading) return <GlobalSpinner />;
    user = data;
  }

  return (
    <BrowserRouter>
      <div className="bg-white flex flex-col min-h-screen">
        <Navbar user={user} />
        <Routes>
          <Route
            path="/signin"
            element={
              <ForceRedirect user={user}>
                <Signin />
              </ForceRedirect>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute user={user}>
                <DashBoard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <ProtectedRoute user={user}>
                <OrderDetail user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/my-orders"
            element={
              <ProtectedRoute user={user}>
                <MyOrders user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/update-profile"
            element={
              <ProtectedRoute user={user}>
                <UpdateProfile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/change-password"
            element={
              <ProtectedRoute user={user}>
                <ChangePassword user={user} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home user={user} />} />
          {/* <Route path="/mobile-menu" element={<MobileMenu />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<PostPage />} />
          <Route path="/verify" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
          <Route path="/products" element={<Products user={user} />} />
          <Route
            path="/products/:productId"
            element={<ProductDetail user={user} />}
          />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route
            path="/checkout/:userId/information"
            element={<OrderInformation user={user} />}
          />
          <Route
            path="/checkout/:userId/shipping"
            element={<OrderShipping user={user} />}
          />
          <Route
            path="/checkout/:userId/payment"
            element={<CheckOut user={user} />}
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

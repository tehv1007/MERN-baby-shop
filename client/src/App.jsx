import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
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
import ViewCart from "./pages/ViewCart/Cart";
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

function App() {
  getUser();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [isConnected, setIsconnected] = useState(false);

  const [user, setUser] = useState(localUser);

  useEffect(() => {
    // Cập nhật thông tin user mới nhất vào state
    if (localUser) {
      const getUser = async () => {
        const res = await axios.get(`/users/find/${localUser._id}`);
        setUser(res.data);
      };
      getUser();
    }
  }, [user]);

  const checkUserToken = () => {
    if (typeof window !== "undefined") {
      if (token) {
        setIsconnected(true);
      } else {
        setIsconnected(false);
      }
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isConnected]);

  return (
    <BrowserRouter>
      <div className="bg-white flex flex-col min-h-screen">
        <Navbar user={user} isConnected={isConnected} />
        <Routes>
          <Route
            path="/signin"
            element={
              <ForceRedirect user={isConnected}>
                <Signin />
              </ForceRedirect>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute user={isConnected}>
                <DashBoard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <ProtectedRoute user={isConnected}>
                <OrderDetail user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/my-orders"
            element={
              <ProtectedRoute user={isConnected}>
                <MyOrders user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/update-profile"
            element={
              <ProtectedRoute user={isConnected}>
                <UpdateProfile user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/change-password"
            element={
              <ProtectedRoute user={isConnected}>
                <ChangePassword user={user} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home user={user} />} />
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
          <Route path="/viewcart" element={<ViewCart user={user} />} />
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
          autoClose={3000}
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

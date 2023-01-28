import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import EmailVerify from "../pages/Authentication/EmailVerify";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import PasswordReset from "../pages/Authentication/PasswordReset";
import Signin from "../pages/Authentication/Signin";
import Signup from "../pages/Authentication/Signup";
import BlogPage from "../pages/Blog/BlogPage";
import PostPage from "../pages/Blog/PostPage";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound";
import Profile from "../pages/User/Profile";
import ViewCart from "../pages/ViewCart";
import Products from "../pages/Products/Products";
import OrderInfomation from "../pages/CheckOut/OrderInfomation";
import ProductDetail from "../pages/Products/product-detail/ProductDetail";
import OrderShipping from "../pages/CheckOut/OrderShipping";
import CheckOut from "../pages/CheckOut/CheckOut";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/viewcart",
        element: <ViewCart />,
      },
      {
        path: "/checkout/:userId/infomation",
        element: <OrderInfomation />,
      },
      {
        path: "/checkout/:userId/shipping",
        element: <OrderShipping />,
      },
      {
        path: "/checkout/:userId/payment",
        element: <CheckOut />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:postId",
        element: <PostPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/auth/:id/verify/:token",
        element: <EmailVerify />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/password-reset/:id/:token",
        element: <PasswordReset />,
      },
    ],
  },
]);

export default router;

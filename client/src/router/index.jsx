import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RootLayout from "../components/layouts/RootLayout";
import EmailVerify from "../pages/Authentication/EmailVerify";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import PasswordReset from "../pages/Authentication/PasswordReset";
import Signin from "../pages/Authentication/Signin";
import Signup from "../pages/Authentication/Signup";
import BlogPage from "../pages/Blog/BlogPage";
import PostPage from "../pages/Blog/PostPage";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/User/Profile";
// import ProductDetail from "../views/product/ProductDetail";
// import Products from "../views/product/Products";
// const [isConnected, setIsconnected] = useState(false);

// const checkUserToken = () => {
//   if (typeof window !== "undefined") {
//     const user = JSON.parse(localStorage.getItem("token"));
//     if (user) {
//       setIsconnected(true);
//     } else {
//       setIsconnected(false);
//     }
//   }
// };
// useEffect(() => {
//   checkUserToken();
// }, [isConnected]);

// const Logout = () => {
//   if (localStorage.getItem("token")) {
//     localStorage.clear();
//     setIsconnected(false);
//   }
// };

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
      // {
      //   path: "products",
      //   element: <Products />,
      // },
      // {
      //   path: "products/:productId",
      //   element: <ProductDetail />,
      // },
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
    ],
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
]);

export default router;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./pages/User/Profile";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import PasswordReset from "./pages/Authentication/PasswordReset";
import Signup from "./pages/Authentication/Signup";
import Signin from "./pages/Authentication/Signin";
import PostPage from "./pages/Blog/PostPage";
import BlogPage from "./pages/Blog/BlogPage";
import EmailVerify from "./pages/Authentication/EmailVerify";

function App() {
  const [isConnected, setIsconnected] = useState(false);

  const checkUserToken = () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("token"));
      if (user) {
        setIsconnected(true);
      } else {
        setIsconnected(false);
      }
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isConnected]);

  const Logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
      setIsconnected(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="bg-white" style={{ height: "100vh" }}>
        {/* <Header Logout={Logout} user={isConnected} /> */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={isConnected}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<PostPage />} />
          <Route path="/auth/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

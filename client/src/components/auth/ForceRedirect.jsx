import { Navigate } from "react-router-dom";

const ForceRedirect = ({ user, children }) => {
  if (user) {
    return <Navigate to="/profile" replace />;
  }
  return children;
};

export default ForceRedirect;

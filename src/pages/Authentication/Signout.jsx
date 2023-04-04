import Cookies from "js-cookie";

const Signout = () => {
  if (localStorage.getItem("token")) {
    localStorage.clear();
  }
  Cookies.remove("access_token");
  window.location = "/";
};

export default Signout;

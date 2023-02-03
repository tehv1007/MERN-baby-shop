import axios from "axios";
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
      return acc;
    }, {});

export const getUser = () => {
  const user_cookie = parseCookie(document.cookie || "");
  if (user_cookie.access_token) {
    const userInfo = JSON.parse(user_cookie.access_token.slice(2));
    // console.log(userInfo);
    localStorage.setItem("token", JSON.stringify(userInfo.token));
    localStorage.setItem("user", JSON.stringify(userInfo.user._doc));
  }
};

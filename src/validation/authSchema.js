import * as yup from "yup";

export const signupSchema = yup
  .object({
    name: yup.string().required("Your name is required"),
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("This is not a valid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required").min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  })
  .required();

export const signinSchema = yup
  .object({
    emailUsername: yup.string().required("Username or email is required"),
    password: yup.string().required("Password is required").min(6),
  })
  .required();

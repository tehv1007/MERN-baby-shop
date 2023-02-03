import * as yup from "yup";

export const reviewValidate = yup
  .object({
    name: yup.string().required("Your name is required"),
    title: yup.string().required("Title is required"),
    content: yup.string().required("You need write something"),
    email: yup
      .string()
      .email("This is not a valid email format")
      .required("Email is required"),
  })
  .required();

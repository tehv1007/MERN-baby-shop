import * as yup from "yup";

export const updateProfileSchema = yup
  .object({
    name: yup.string().required("Your name is required"),
    address: yup.string().required("Your address is required"),
    phoneNumber: yup.string().required("Your phoneNumber is required"),
    email: yup
      .string()
      .email("This is not a valid email format")
      .required("Email is required"),
  })
  .required();

export const changePasswordSchema = yup
  .object({
    currentPassword: yup.string().required("Password is required").min(6),
    newPassword: yup.string().required("Password is required").min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required(),
  })
  .required();

import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const updateProfileSchema = yup
  .object({
    name: yup.string().required("Your name is required"),
    address: yup.string().required("Your address is required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Your phoneNumber is required"),
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

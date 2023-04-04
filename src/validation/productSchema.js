import * as yup from "yup";

export const addProductSchema = yup
  .object({
    title: yup.string().required("This field is required"),
    category: yup
      .string()
      .oneOf(
        ["play aids", "toys", "baby care", "baby ware"],
        "Select a category"
      ),
    price: yup.number().positive().required().typeError("Must be a number"),
    image: yup.mixed(),
    description: yup.string().required("This field is required"),
  })
  .required();

export const editProductSchema = yup
  .object({
    title: yup.string().required("This field is required"),
    category: yup
      .string()
      .oneOf(
        ["play aids", "toys", "baby care", "baby ware"],
        "Select a category"
      ),
    price: yup.number().positive().required().typeError("Must be a number"),
    description: yup.string().required("This field is required"),
  })
  .required();

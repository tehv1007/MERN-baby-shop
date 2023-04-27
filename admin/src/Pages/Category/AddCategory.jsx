import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { categorySchema } from "../../validation/productSchema";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { addCategory } from "../../hooks/useCategory";
import Layout from "../../components/layout/Layout";
import PageTitle from "../../components/common/PageTitle";
import CategoryForm from "./CategoryForm";

const AddCategory = () => {
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImage(null);
      return;
    }

    setImageFile([file]);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const mutation = addCategory(reset, setImage);

  const onSubmit = (data) => {
    console.log(data);
    if (imageFile.length > 0) {
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, `/myShop/category/${imageFile[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile[0]);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "running":
              setIsFileLoading(true);
              break;
          }
        },
        (error) => {
          //Handle error
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            mutation.mutate({
              ...data,
              imageUrl: downloadURL,
              collections: data.collections.map((c) => c.value),
            });
            setIsFileLoading(false);
          });
        }
      );
    } else {
      mutation.mutate({
        ...data,
        collections: data.collections.map((c) => c.value),
        imageUrl:
          "https://sayhikorean.com/wp-content/uploads/2023/04/toy-store.png",
      });
      setIsFileLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col w-full h-full justify-between">
          <PageTitle title="Add New Category" />
          <CategoryForm
            type="Add Category"
            onSubmit={handleSubmit(onSubmit)}
            handleImageChange={handleImageChange}
            isLoading={mutation.isLoading || isFileLoading}
            image={image}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;

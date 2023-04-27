import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { categorySchema } from "../../validation/productSchema";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { getCategoryById, updateCategory } from "../../hooks/useCategory";
import Layout from "../../components/layout/Layout";
import PageTitle from "../../components/common/PageTitle";
import CategoryForm from "./CategoryForm";
import { useParams } from "react-router-dom";
import GlobalSpinner from "../../components/common/GlobalSpinner";

const EditCategory = () => {
  const { categoryId } = useParams();
  const { isLoading, data: category } = getCategoryById(categoryId);

  if (isLoading) return <GlobalSpinner />;
  console.log(category);

  // const [isFileLoading, setIsFileLoading] = useState(false);
  const [image, setImage] = useState(category.imageUrl);
  const [imageFile, setImageFile] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      title: category.title,
      collections: category.collections.map((item) => ({
        value: item,
        label: item,
      })),
    },
  });

  // useEffect(() => {
  //   reset({
  //     title: category.title,
  //     collections: category.collections.map((item) => ({
  //       value: item,
  //       label: item,
  //     })),
  //   });
  //   setImage(category.imageUrl);
  // }, [category]);

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

  const mutation = updateCategory(categoryId);
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
              // setIsFileLoading(true);
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
            // setIsFileLoading(false);
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
      // setIsFileLoading(false);
    }
  };

  // if (isLoading) return <GlobalSpinner />;

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col w-full h-full justify-between">
          <PageTitle title="Edit Category" />
          <CategoryForm
            type="Update Category"
            onSubmit={handleSubmit(onSubmit)}
            handleImageChange={handleImageChange}
            isLoading={mutation.isLoading}
            image={image}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            isDirty={isDirty}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditCategory;

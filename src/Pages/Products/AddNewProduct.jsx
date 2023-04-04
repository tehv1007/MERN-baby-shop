import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { createProduct } from "../../services/productsService";
import { storage } from "../../config/firebase";
import ProductForm from "./ProductForm";
import Layout from "../../components/layout/Layout";
import PageTitle from "../../components/common/PageTitle";
import { addProductSchema } from "../../validation/productSchema";

const AddNewProduct = () => {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [showPreview, setShowPreview] = useState(true);
  const imageTypeRegex = /image\/(png|jpg|jpeg|webp)/gm;

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchema),
  });

  const mutation = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct),
    onSuccess: () => {
      reset();
      toast.success("Successfully created new product");
    },
  });

  const handleChange = (e) => {
    const files = [...e.target.files];
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type!");
  };

  // console.log(imageFiles);

  useEffect(() => {
    const images = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  const ImagesHandleSubmit = () => {
    imageFiles.map((file) => {
      const storageRef = ref(storage, `baby-shop/products/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // promises.push(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "running":
              setIsFileUploading(true);
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrls((prevState) => [...prevState, downloadURL]);
            setIsFileUploading(false);
          });
        }
      );
    });
  };
  console.log(urls);

  const onSubmit = (data) => {
    mutation.mutate({ ...data, photos: urls });
    setShowPreview(false);
  };

  return (
    <Layout>
      <PageTitle title="Add New Product" />
      <ProductForm
        watch={watch}
        showPreview={showPreview}
        onSubmit={handleSubmit(onSubmit)}
        handleChange={handleChange}
        handleSubmit={ImagesHandleSubmit}
        register={register}
        images={images}
        isLoading={mutation.isLoading}
        isLoadingImage={isFileUploading}
        errors={errors}
        btnLabel="Create Product"
      />
    </Layout>
  );
};

export default AddNewProduct;

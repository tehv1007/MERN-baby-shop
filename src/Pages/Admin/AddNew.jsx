import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { storage, db, auth } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Layout from "../../components/layout/Layout";
import InputCard from "../../components/layout/InputCard";
import Progress from "../../components/common/Progress";
import { newAdminSchema } from "../../validation/authSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AdminForm from "./AdminForm";

const AddNew = () => {
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(newAdminSchema),
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

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
        image: data.image,
      });
    },
    onSuccess: () => {
      reset();
      setImage(null);
      toast.success("Successfully created user");
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });

  const onSubmit = (data) => {
    if (imageFile.length > 0) {
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, `admin/${imageFile[0].name}`);
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
            mutation.mutate({ ...data, image: downloadURL });
            setIsFileLoading(false);
          });
        }
      );
    } else {
      mutation.mutate({
        ...data,
        image: "https://sayhikorean.com/wp-content/uploads/2023/04/admin.png",
      });
      setIsFileLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
        <div className="max-w-screen-2xl">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h2 className="text-xl font-semibold mb-5">Add New Admin</h2>
              </div>
            </div>
          </div>

          {/* Form */}
          <AdminForm
            onSubmit={handleSubmit(onSubmit)}
            handleImageChange={handleImageChange}
            register={register}
            errors={errors}
            isDirty={isDirty}
            image={image}
            isFileLoading={isFileLoading}
            imageFile={imageFile}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddNew;

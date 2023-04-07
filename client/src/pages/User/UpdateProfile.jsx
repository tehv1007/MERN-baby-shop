import InputCard from "./Dashboard/InputCard";
import Layout from "../../components/layouts/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateProfileSchema } from "../../validation/userSchema";
import { storage } from "../../config/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import Progress from "../../components/common/Progress";
import { updateProfile } from "../../hooks/useUser";

const UpdateProfile = ({ user, setUser }) => {
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState([]);

  // Create a reference to the file to delete
  const desertRef = ref(storage, `users/${user.username}`);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  const mutation = updateProfile(reset, user);

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

  const onSubmit = (data) => {
    if (imageFile.length > 0) {
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(
        storage,
        `users/${user.username}/${imageFile[0].name}`
      );
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
            const filename = downloadURL
              .split("/")
              .pop()
              .split("?")[0]
              .split("%2F")
              .pop();
            setIsFileLoading(false);

            listAll(desertRef)
              .then((res) => {
                res.items.forEach((itemRef) => {
                  // All the items under listRef
                  // Delete the file
                  if (itemRef.name != filename)
                    deleteObject(
                      ref(storage, `users/${user.username}/${itemRef.name}`)
                    )
                      .then(() => {
                        // File deleted successfully
                      })
                      .catch((error) => {
                        // Uh-oh, an error occurred!
                        console.log(error);
                      });
                });
              })
              .catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error);
              });
            console.log("File available at", downloadURL);
            mutation.mutate({ ...data, image: downloadURL });
            setUser({ ...data, image: downloadURL });
          });
        }
      );
    } else {
      mutation.mutate({ ...data, image: user.image });
      setUser(data);
    }
  };

  // console.log(imageFile);

  return (
    <Layout>
      <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
        <div className="max-w-screen-2xl">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h2 className="text-xl font-semibold mb-5">Update Profile</h2>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="bg-white space-y-6">
                {/* Avatar */}
                <div>
                  <label
                    className="block text-gray-500 font-medium text-sm leading-none mb-2"
                    // htmlFor="file-upload"
                  >
                    Photo
                    <div className="mt-1 flex items-center">
                      <div className="w-full text-center">
                        <div
                          className="px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                          role="button"
                          tabIndex={0}
                          htmlFor="file-upload"
                        >
                          <input
                            type="file"
                            autoComplete="off"
                            tabIndex={-1}
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            id="file-upload"
                          />
                          <span className="mx-auto flex justify-center">
                            <svg
                              stroke="currentColor"
                              fill="none"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-3xl text-emerald-500"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polyline points="16 16 12 12 8 16" />
                              <line x1={12} y1={12} x2={12} y2={21} />
                              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                              <polyline points="16 16 12 12 8 16" />
                            </svg>
                          </span>
                          <p className="text-sm mt-2">Drag your image here</p>
                          <em className="text-xs text-gray-400">
                            (Only *.jpeg and *.png images will be accepted)
                          </em>
                        </div>
                        <aside className="flex flex-row flex-wrap mt-4" />
                      </div>
                    </div>
                  </label>
                  {/* Preview image */}
                  {image ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
                      <img src={image} alt="avatar image" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
                      <img src={user.image} alt="avatar image" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mt-10 sm:mt-0">
                <div className="md:grid-cols-6 md:gap-6">
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="lg:mt-6 mt-4 bg-white">
                      <div className="grid grid-cols-6 gap-6">
                        <InputCard
                          placeholder="Full Name"
                          name="name"
                          title="Full Name"
                          register={register}
                          errors={errors.name}
                          defaultValue={user.name}
                        />
                        <InputCard
                          placeholder="Your Address"
                          name="address"
                          title="Your Address"
                          register={register}
                          errors={errors.address}
                          defaultValue={user.address}
                        />
                        <InputCard
                          placeholder="Your Mobile Number"
                          name="phoneNumber"
                          type="tel"
                          title="Phone/Mobile"
                          register={register}
                          errors={errors.phoneNumber}
                          defaultValue={user.phoneNumber}
                        />
                        <InputCard
                          placeholder="Your Email"
                          name="email"
                          type="email"
                          title="Email Address"
                          register={register}
                          errors={errors.email}
                          defaultValue={user.email}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                        <button
                          type="submit"
                          disabled={
                            imageFile?.length == 0 &&
                            (isFileLoading || !isDirty)
                          }
                          className="cursor-pointer transition ease-in-out duration-300 font-medium text-center rounded-md bg-emerald-500 text-white px-6 py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm w-full sm:w-auto disabled:bg-gray-400 disabled:text-gray-500"
                        >
                          <div className="flex gap-1">
                            {isFileLoading && <Progress />}
                            <span>Update Profile</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfile;

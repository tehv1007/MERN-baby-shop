import React from "react";
import InputCard from "../../components/layout/InputCard";
import Progress from "../../components/common/Progress";

const AdminForm = ({
  onSubmit,
  handleImageChange,
  register,
  errors,
  isDirty = true,
  image,
  isFileLoading,
  imageFile,
}) => {
  return (
    <form onSubmit={onSubmit}>
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
            {image && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
                <img src={image} alt="avatar image" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-10 sm:mt-0">
          <div className="md:grid-cols-6 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="lg:mt-6 mt-4 bg-white">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputCard
                    placeholder="Full Name"
                    name="name"
                    title="Full Name"
                    register={register}
                    errors={errors.name}
                  />
                  <InputCard
                    placeholder="User Name"
                    name="username"
                    title="User Name"
                    register={register}
                    errors={errors.username}
                  />
                  <InputCard
                    placeholder="Mobile Number"
                    name="phoneNumber"
                    type="tel"
                    title="Phone/Mobile"
                    register={register}
                    errors={errors.phoneNumber}
                  />
                  <InputCard
                    placeholder="Email"
                    name="email"
                    type="email"
                    title="Email Address"
                    register={register}
                    errors={errors.email}
                  />
                  <InputCard
                    placeholder="Password"
                    name="password"
                    type="password"
                    title="Password"
                    register={register}
                    errors={errors.password}
                  />
                  <InputCard
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    title="Confirm Password"
                    register={register}
                    errors={errors.confirmPassword}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                  <button
                    type="submit"
                    disabled={
                      imageFile?.length == 0 && (isFileLoading || !isDirty)
                    }
                    className="cursor-pointer transition ease-in-out duration-300 font-medium text-center rounded-md bg-emerald-500 text-white px-6 py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm w-full sm:w-auto disabled:bg-gray-400 disabled:text-gray-500"
                  >
                    <div className="flex gap-1">
                      {isFileLoading && <Progress />}
                      <span>Add New</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminForm;

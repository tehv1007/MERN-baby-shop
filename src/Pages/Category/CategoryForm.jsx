import React from "react";
import UploadIcon from "../../components/common/icons/UploadIcon";
import FormRowError from "../../components/common/FormRowError";
import { Controller } from "react-hook-form";
import Select from "react-select";
import Loader from "../../components/common/Loader";

const Collections = [
  { value: "Toys", label: "Toys" },
  { value: "Home", label: "Home" },
  { value: "Stationery", label: "Stationery" },
  { value: "Accessories", label: "Accessories" },
];

const CategoryForm = ({
  type,
  onSubmit,
  handleImageChange,
  image,
  register,
  errors,
  setValue,
  control,
  isLoading,
  isDirty = true,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex-grow scrollbar-hide w-full max-h-full pb-10">
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
            <label className="block text-gray-700 col-span-4 sm:col-span-2 font-medium text-sm">
              Category Icon
            </label>

            <div className="col-span-8 sm:col-span-4">
              <div className="w-full text-center">
                <label
                  className="block px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
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
                    <UploadIcon />
                  </span>
                  <p className="text-sm mt-2">Drag your image here</p>
                  <em className="text-xs text-gray-400">
                    (Only *.jpeg and *.png images will be accepted)
                  </em>
                </label>
                <aside className="flex flex-row flex-wrap mt-4" />
                {/* Preview image */}
                {image && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
                    <img src={image} alt="avatar image" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category name */}
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 pb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 col-span-4 sm:col-span-2 font-medium text-sm"
          >
            Category name
          </label>
          <div className="col-span-8 sm:col-span-4 leading-5 text-sm">
            <input
              className="px-3 py-1 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-green-300 border h-12 focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              type="text"
              id="title"
              placeholder="Category title"
              {...register("title")}
            />
            <FormRowError error={errors.title} />
          </div>
        </div>

        {/* Collection */}
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
          <label
            htmlFor="collections"
            className="block text-gray-700 col-span-4 sm:col-span-2 font-medium text-sm"
          >
            Collections
          </label>
          <div className="col-span-8 sm:col-span-4">
            <Controller
              control={control}
              name="collections"
              register={register}
              setValue={setValue}
              defaultValues={null}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  required
                  options={Collections}
                  onChange={onChange}
                  isMulti={true}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  ref={ref}
                />
              )}
            />
            <FormRowError error={errors.collections} />
          </div>
        </div>

        {/* Action */}
        <div className="py-4 lg:py-8 px-6 bg-gray-50 border-t border-gray-100">
          <div className="leading-5 text-sm text-white font-medium text-right">
            <button
              className="align-bottom inline-flex items-center justify-center cursor-pointer transition-colors duration-150 focus:outline-none px-4 py-2 rounded-lg bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 h-12"
              type="submit"
              disabled={isLoading || !isDirty}
            >
              <div className="flex items-center gap-2">
                {isLoading && <Loader />}
                <span>{type}</span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;

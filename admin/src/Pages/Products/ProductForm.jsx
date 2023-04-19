import FormRow from "../../components/common/FormRow";
import FormRowError from "../../components/common/FormRowError";
import Loader from "../../components/common/Loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductForm = (props) => {
  const {
    showPreview,
    onSubmit,
    watch,
    setValue,
    handleChange,
    handleSubmit,
    images,
    register,
    errors,
    isLoading,
    isLoadingImage,
    btnLabel,
    isDirty = true,
    defaultImgs,
  } = props;

  const onEditorStateChange = (editorState) => {
    setValue("description", editorState);
  };

  const editorContent = watch("description");

  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-md mx-auto px-4">
        {/* Layout */}
        <div className="py-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-10">
            {/* Fields */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {/* Title */}
              <FormRow label="Title" className="col-span-full">
                <input
                  type="text"
                  placeholder="Enter your product name here..."
                  className="input input-bordered w-full"
                  {...register("title")}
                />
                <FormRowError error={errors.title} />
              </FormRow>

              {/* Category */}
              <FormRow label="Category">
                <select
                  className="select select-bordered w-full"
                  defaultValue="default"
                  {...register("category")}
                >
                  <option disabled value="default">
                    Choose a category
                  </option>
                  <option value="play aids">Play Aids</option>
                  <option value="toys">Toys</option>
                  <option value="baby care">Baby Care</option>
                  <option value="baby ware">Baby Wear</option>
                </select>
                <FormRowError error={errors.category} />
              </FormRow>

              {/* Price */}
              <FormRow label="Price">
                <label className="input-group">
                  <input
                    type="number"
                    placeholder="0.01"
                    className="input input-bordered w-full"
                    step={0.01}
                    {...register("price")}
                  />
                  <span>USD</span>
                </label>
                <FormRowError error={errors.price} />
              </FormRow>

              {/* Image */}
              <FormRow label="Image" className="col-span-full">
                <div className="flex justify-between gap-10">
                  <input
                    type="file"
                    multiple
                    onChange={handleChange}
                    className="file-input file-input-bordered w-full"
                  />
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    disabled={isLoadingImage}
                  >
                    <div className="flex items-center gap-2">
                      {isLoadingImage && <Loader />}
                      <span>Upload Images</span>
                    </div>
                  </button>
                </div>

                {/* Preview Image */}
                {images?.length > 0 && showPreview ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
                    {images.map((image, idx) => {
                      return (
                        <p key={idx}>
                          <img src={image} alt="" />
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
                    {defaultImgs?.map((image, idx) => {
                      return (
                        <p key={idx}>
                          <img src={image} alt="" />
                        </p>
                      );
                    })}
                  </div>
                )}

                <FormRowError error={errors.image} />
              </FormRow>

              {/* Description */}
              <FormRow label="Description" className="col-span-full">
                <ReactQuill
                  className="resize-none h-36 block"
                  theme="snow"
                  placeholder="Write something here..."
                  value={editorContent}
                  onChange={onEditorStateChange}
                />
                <FormRowError error={errors.description} />
              </FormRow>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary max-w-[160px]"
              disabled={images?.length == 0 && (isLoading || !isDirty)}
            >
              <div className="flex items-center gap-2">
                {isLoading && <Loader />}
                <span>{btnLabel}</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

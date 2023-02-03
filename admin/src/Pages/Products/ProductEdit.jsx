const ProductEdit = () => {
  return (
    <>
      <div className="max-w-screen-sm mx-auto">
        <div className="form-control w-full my-5">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter product name..."
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex items-center gap-3 ">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select className="select select-bordered">
              <option disabled selected>
                Choose a category
              </option>
              <option>Play Aids</option>
              <option>Toys</option>
              <option>Baby Care</option>
              <option>Baby Wear</option>
            </select>
          </div>
          <label className="input-group self-end">
            <input
              type="text"
              placeholder="0.01"
              className="input input-bordered w-full"
              step={0.01}
            />
            <span>USD</span>
          </label>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full my-5"
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Write here..."
          ></textarea>
        </div>
        {/* submit button */}
        <button type="submit" className="btn btn-primary my-5">
          SAVE PRODUCT
        </button>
      </div>
    </>
  );
};

export default ProductEdit;

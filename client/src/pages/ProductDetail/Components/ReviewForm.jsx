import { FaStar } from "react-icons/fa";
import FormRowError from "../../../components/common/RowError";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};
const stars = Array(5).fill(0);

export const ReviewForm = ({
  onSubmit,
  hoverValue,
  currentValue,
  setRating,
  setCurrentValue,
  handleMouseOver,
  register,
  errors,
  mutation,
  type,
}) => {
  return (
    <form onSubmit={onSubmit} className="mt-5 lg:pl-[30%]">
      {/* review form */}
      <h5>{type !== "edit" ? "Write a" : "Edit your"} review</h5>
      <p className="text-sm mt-2.5">Rating</p>
      <div className="flex my-1.5">
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              onClick={() => {
                setRating(index + 1);
                setCurrentValue(index + 1);
              }}
              onMouseOver={() => handleMouseOver(index + 1)}
            />
          );
        })}
      </div>

      <div>
        <p className="text-sm mt-2.5">Review Title</p>
        <input
          {...register("title")}
          type="text"
          name="title"
          placeholder="Give your review a title"
          className="mt-2 border pl-4 py-1.5 text-sm w-full lg:w-[70%]"
        />
        <FormRowError error={errors.title} />
      </div>
      <div>
        <p className="text-sm mt-2.5">Body of Review (1500)</p>
        <textarea
          {...register("content")}
          id="message"
          rows="4"
          className="mt-2 p-2.5 w-full lg:w-[70%] text-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your comments here"
        ></textarea>
        <FormRowError error={errors.content} />
      </div>

      {type == "edit" ? (
        <div className="flex justify-between">
          <button
            type="submit"
            className="my-4 text-center rounded-xl px-3.5 py-2.5 text-sm bg-slate-700 hover:bg-black hover:cursor-pointer text-white"
          >
            Edit Review
          </button>
        </div>
      ) : (
        <button
          type="submit"
          className="my-4 text-center rounded-xl px-3.5 py-2.5 text-sm bg-slate-700 hover:bg-black hover:cursor-pointer text-white"
        >
          Submit Review
        </button>
      )}

      {mutation.isError ? (
        <div className="p-4 text-sm bg-red-600 text-white rounded text-center border my-2 w-[70%]">
          An error occurred: {mutation.error.response.data.message}
        </div>
      ) : null}
    </form>
  );
};

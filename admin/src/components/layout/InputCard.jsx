import FormRowError from "../common/FormRowError";

const InputCard = ({
  placeholder,
  register,
  name,
  type = "text",
  errors,
  title,
}) => {
  return (
    <div className="mb-5 leading-10">
      <div className="w-full text-sm flex flex-col flex-grow">
        <label className="block text-gray-500 font-medium text-sm leading-none mb-2">
          {title}
        </label>
        <input
          type={type}
          name={name}
          autoComplete="off"
          placeholder={placeholder}
          {...register(name)}
          className="w-full px-4 rounded bg-white hover:bg-indigo-100 border-gray-300 hover:border-blue-500 border table-cell leading-9"
        />
        <FormRowError error={errors} />
      </div>
    </div>
  );
};

export default InputCard;

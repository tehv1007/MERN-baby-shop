import FormRowError from "../../../components/common/RowError";

const InputCard = ({
  placeholder,
  register,
  name,
  type = "text",
  errors,
  title,
  layout = "sm:col-span-3",
  defaultValue = "",
}) => {
  return (
    <div className={`w-full col-span-6 ${layout}`}>
      <label className="block text-gray-500 font-medium text-sm leading-none mb-2">
        {title}
      </label>
      <input
        type={type}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name)}
        className="block py-2 px-4 md:px-5 w-full border text-sm opacity-75 rounded-md min-h-12 bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
      />
      <FormRowError error={errors} />
    </div>
  );
};

export default InputCard;

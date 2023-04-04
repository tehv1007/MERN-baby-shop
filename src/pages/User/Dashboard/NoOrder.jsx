import { BsBagCheckFill } from "react-icons/bs";

const NoOrder = () => {
  return (
    <>
      <div className="container px-6 mx-auto">
        <div className="w-full bg-white rounded-md">
          <div className="p-8 text-center">
            <span className="flex justify-center my-30 text-red-500 font-semibold text-6xl">
              <BsBagCheckFill />
            </span>
            <h2 className="font-medium text-base mt-4 text-gray-600">
              You have no order Yet!
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoOrder;

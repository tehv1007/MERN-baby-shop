import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import LocationForm from "../../components/location/LocationForm";
import FormCheckOut from "./FormCheckOut";
import SidebarCheckOut from "./SidebarCheckOut";

const OrderInformation = ({ user }) => {
  const [subData, setSubData] = useState({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    localStorage.setItem("shippingInfo2", JSON.stringify(subData));
    navigate(`/checkout/${user._id}/shipping`);
  };

  return (
    <section>
      {/* container */}
      <div className="">
        {/* layout */}
        <div className="lg:grid">
          {/* Sidebar */}
          <SidebarCheckOut user={user} />

          {/* main */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-screen-sm mx-auto px-4 lg:row-start-1 lg:col-span-3"
          >

            <h3 className="flex justify-between items-center my-6 lg:text-lg">
              Contact information
            </h3>
            {/* Form */}
            <FormCheckOut register={register} errors={errors} />
            {/* Selection */}
            <LocationForm setSubData={setSubData} subData={subData} />

            <div>
              <p className="mb-4">Delivery method</p>
              <div className="border rounded text-center py-5">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iODUiIHZpZXdCb3g9IjAgMCAxMDggODUiPjxnIHN0cm9rZT0iI0IyQjJCMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0xIDE4aDEwNk0xMSA3MC4zaDI2bS0yNi02aDI2bS0yNi02aDE3Ii8+PC9nPjxwYXRoIHN0cm9rZT0iI0IyQjJCMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xIDE4bDEwLjctMTdoODQuN2wxMC42IDE3djYxLjVjMCAyLjUtMiA0LjUtNC41IDQuNWgtOTdjLTIuNSAwLTQuNS0yLTQuNS00LjV2LTYxLjV6TTU0IDF2MTYuNiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg=="
                  className="mx-auto mb-2"
                />
                <p>Standard $5</p>
              </div>
            </div>
            <div className="max-w-screen-sm mx-auto my-11 pb-5 md:flex justify-between items-center ">
              <a
                href="/viewcart"
                className="flex justify-center items-center text-md py-3"
              >
                <HiChevronLeft size={30} />
                Return to cart
              </a>
              <button
                type="submit"
                className="w-full text-sm font-medium text-white border rounded-md bg-[#3d405d] px-8 py-5 mb-2 md:w-1/3 lg:px-0 lg:w-2/5"
              >
                Continue to shipping
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderInformation;

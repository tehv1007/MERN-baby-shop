import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import LocationForm from "../../components/location/LocationForm";
import FormCheckOut from "./FormCheckOut";
import SidebarCheckOut from "./SidebarCheckOut";
import DropIn from "braintree-web-drop-in-react";

const OrderShipping = () => {
  return (
    <section>
      {/* container */}
      <div className="">
        {/* layout */}
        <div className="lg:grid">
          {/* Sidebar */}
          <SidebarCheckOut />

          {/* main */}
          <div className="max-w-screen-sm mx-auto px-4 lg:row-start-1 lg:col-span-3">
            <div className="flex items-center gap-2 mt-4 text-xs max-w-screen-sm mx-auto">
              <p>Cart</p>
              <HiChevronRight />
              <p>Information</p>
              <HiChevronRight />
              <p className="font-bold">Shipping</p>
              <HiChevronRight />
              <p>Payment</p>
              <HiChevronRight />
            </div>
            <div className="my-4">
              <p className="mb-4">Payment Method</p>
              <div className="border rounded flex gap-2 items-center py-3">
                <input type="radio" className="ml-5" />
                <img
                  className="w-[40px]"
                  src="https://www.ecom-labs.com/images/detailed/1/braintree_payment_0.png"
                  alt=""
                />
                <p>Secure and encrypted payment with Braintree</p>
              </div>
            </div>
            <div className="max-w-screen-sm mx-auto my-11 pb-5 md:flex justify-between items-center ">
              <a
                href="/viewcart"
                className="flex justify-center items-center text-md py-3">
                <HiChevronLeft size={30} />
                Return to cart
              </a>
              <button className="w-full text-sm font-medium text-white border rounded-md bg-[#3d405d] px-8 py-5 mb-2 md:w-1/3 lg:px-0 lg:w-2/5">
                Continue to shipping
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderShipping;

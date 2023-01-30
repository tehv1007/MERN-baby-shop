import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SidebarCheckOut from "./SidebarCheckOut";
import { useNavigate } from "react-router-dom";

const OrderShipping = ({ user }) => {
  const navigate = useNavigate();
  const info = JSON.parse(localStorage.getItem("shippingInfo"));
  const address = JSON.parse(localStorage.getItem("shippingInfo2"));
  const shippingAddress = `${info.name}, ${info.phoneNumber}, ${info.detailAddress}, ${address.ward}, ${address.district}, ${address.city}`;
  localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

  const handleSubmit = () => {
    navigate(`/checkout/${user._id}/payment`);
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
            {/* Shipping address */}
            <div
              role="table"
              aria-label="Review your information"
              className="bg-white border-gray-400 rounded border-solid border text-gray-700 text-sm leading-5 my-10">
              <div
                role="row"
                className="items-baseline mx-4 py-3 flex justify-between">
                <div className="pr-3 flex justify-between gap-10">
                  <div role="cell" className="">
                    <span className="text-gray-600">Contact</span>
                  </div>
                  <div role="cell" className="">
                    <bdo className="" dir="ltr">
                      {info.name}, {info.phoneNumber}, {info.email}
                    </bdo>
                  </div>
                </div>
                <div className="pr-3" role="cell">
                  <a
                    href={`/checkout/${user._id}/infomation`}
                    className=""
                    aria-label="Change contact information">
                    <span className="text-indigo-900 inline text-xs leading-4">
                      Change
                    </span>
                  </a>
                </div>
              </div>
              <div
                role="row"
                className="items-baseline border-gray-400 border-t mx-4 py-3 flex justify-between ">
                <div className="pr-3 flex justify-between gap-10 ">
                  <div role="cell" className="">
                    <span className="text-gray-600">Ship to</span>
                  </div>
                  <div role="cell" className="">
                    <div className="">
                      <address className="">
                        {info.detailAddress}, {address.ward}, {address.district}
                        , {address.city}
                      </address>
                    </div>
                  </div>
                </div>
                <div className="pr-3" role="cell">
                  <a
                    href={`/checkout/${user._id}/infomation`}
                    className=""
                    aria-label="Change contact information">
                    <span className="text-indigo-900 inline text-xs leading-4">
                      Change
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Payment */}
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
                href={`/checkout/${user._id}/infomation`}
                className="flex justify-center items-center text-md py-3">
                <HiChevronLeft size={30} />
                Return to infomation
              </a>
              <button
                onClick={handleSubmit}
                className="w-full text-sm font-medium text-white border rounded-md bg-[#3d405d] px-8 py-5 mb-2 md:w-1/3 lg:px-0 lg:w-2/5">
                Continue to payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderShipping;

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SidebarCheckOut from "./SidebarCheckOut";
import COD from "../../assets/img/COD.jpg";
import braintree from "../../assets/img/braintree_payment.png";
import ShippingInfo from "./ShippingInfo";
import { getCartItems } from "../ViewCart/useCart";
import { generateUniqueId } from "../../services/paymentService";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { emptyCart } from "../../services/cartService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Progress from "../../components/common/Progress";

const OrderShipping = ({ user }) => {
  const navigate = useNavigate();
  const userId = user._id;
  const info = JSON.parse(localStorage.getItem("shippingInfo"));
  const address = JSON.parse(localStorage.getItem("shippingInfo2"));
  const total = JSON.parse(localStorage.getItem("total"));
  const shippingAddress = `${info.detailAddress}, ${address.ward}, ${address.district}, ${address.city}`;
  const [paymentMethod, setPaymentMethod] = useState("COD");

  localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
  localStorage.setItem("phoneNumber", JSON.stringify(info.phoneNumber));

  let products;
  if (!user) products = [];
  const { data, isLoading } = getCartItems(user);
  if (isLoading) return <h1>Loading...</h1>;
  products = data.data.products;

  // COD payment methods
  const orderData = {
    products: products,
    transaction_id: generateUniqueId(),
    amount: total,
    paymentMethod: paymentMethod,
    address: shippingAddress,
    phoneNumber: Number(info.phoneNumber),
  };

  const mutation = useMutation({
    mutationFn: () => axios.post(`/orders/${userId}`, { order: orderData }),
    onSuccess: () => {
      emptyCart(user);
      toast.success("Successfully order created");
    },
  });

  const handleSubmit = () => {
    mutation.mutate(orderData);
    navigate(`/user/my-orders`);
  };

  const handleMoving = () => {
    navigate(`/checkout/${user._id}/payment`);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <section>
      {/* container */}
      <div className="">
        {/* layout */}
        <div className="lg:grid">
          {/* Sidebar */}
          <SidebarCheckOut user={user} />
          <div className="max-w-screen-sm mx-auto px-4 lg:row-start-1 lg:col-span-3">
            {/* Shipping address */}
            <p className="my-4">Shipping Details</p>
            <ShippingInfo user={user} info={info} address={address} />

            {/* Payment */}
            <div className="my-4">
              <p className="mb-4">Payment Method</p>
              {/* Credit Card */}
              <div className="border rounded flex gap-2 items-center py-3">
                <input
                  type="radio"
                  value="Credit card"
                  checked={paymentMethod === "Credit card"}
                  onChange={handlePaymentMethodChange}
                  className="ml-5"
                />
                <img
                  className="w-[50px]"
                  src={braintree}
                  alt="Payment with Braintree"
                />
                <p>Payment with Braintree</p>
              </div>
              {/* COD */}
              <div className="border rounded flex gap-2 items-center py-3">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={handlePaymentMethodChange}
                  className="ml-5"
                />
                <img
                  className="w-[50px]"
                  src={COD}
                  alt="Cash on delivery (COD)"
                />
                <p>Cash on delivery (COD)</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="max-w-screen-sm mx-auto my-11 pb-5 md:flex justify-between items-center ">
              <a
                href={`/checkout/${user._id}/information`}
                className="flex justify-center items-center text-md py-3"
              >
                <HiChevronLeft size={30} />
                Return to information
              </a>
              {paymentMethod === "COD" && (
                <button
                  onClick={handleSubmit}
                  className="w-full text-sm font-medium text-white border rounded-md bg-[#3d405d] px-8 py-5 mb-2 md:w-1/3 lg:px-0 lg:w-2/5"
                >
                  Confirm
                </button>
              )}
              {/* Continue to payment */}
              {paymentMethod === "Credit card" && (
                <button
                  onClick={handleMoving}
                  className="w-full text-sm font-medium text-white border rounded-md bg-[#3d405d] px-8 py-5 mb-2 md:w-1/3 lg:px-0 lg:w-2/5"
                >
                  Continue to payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderShipping;

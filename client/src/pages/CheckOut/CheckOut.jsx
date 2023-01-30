import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SidebarCheckOut from "./SidebarCheckOut";
import DropIn from "braintree-web-drop-in-react";
import {
  createOrder,
  getBraintreeClientToken,
  processPayment,
} from "../../services/paymentService";
import { isAuthenticated } from "../../services/authService";
import { useEffect, useState } from "react";
import { emptyCart } from "../../services/cartService";
import { getCartItems } from "../ViewCart/useCart";
import { useNavigate } from "react-router-dom";

const CheckOut = ({ user }) => {
  const navigate = useNavigate();
  const info = JSON.parse(localStorage.getItem("shippingInfo"));
  const address = JSON.parse(localStorage.getItem("shippingInfo2"));
  const fullAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const total = JSON.parse(localStorage.getItem("total"));
  let products;
  if (!user) products = [];
  const { data, isLoading } = getCartItems();
  if (isLoading) return <h1>Loading...</h1>;
  products = data.data.products;

  const [datas, setDatas] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: fullAddress,
  });

  const userId = user._id;
  const token = localStorage.getItem("token");

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setDatas({ ...data, error: data.error });
      } else {
        console.log(data);
        setDatas({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  let deliveryAddress = datas.address;

  const buy = () => {
    setDatas({ loading: true });
    // send the nonce to server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = datas.instance
      .requestPaymentMethod()
      .then((datas) => {
        // console.log(data);
        nonce = datas.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: total,
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // empty cart
            // create order

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(user);
                console.log("payment success and empty cart");
                setDatas({
                  loading: false,
                  success: true,
                });
                navigate("/");
              })
              .catch((error) => {
                console.log(error);
                setDatas({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setDatas({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setDatas({ ...datas, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setDatas({ ...datas, error: "" })}>
      {datas.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: datas.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (datas.instance = instance)}
          />
          <button
            onClick={buy}
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:green-600 w-full">
            Pay Now
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}>
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className="text-danger">Loading...</h2>;

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
              <p>Shipping</p>
              <HiChevronRight />
              <p className="font-bold">Payment</p>
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
              {/* <p className="mb-4 capitalize">Choose a way to pay</p> */}
              <div className="mx-auto border w-full rounded gap-2 items-center py-3">
                {showLoading(data.loading)}
                {showSuccess(data.success)}
                {showError(data.error)}
                {showCheckout()}
              </div>
            </div>
            <div className="max-w-screen-sm mx-auto my-11 pb-5 md:flex justify-between items-center ">
              <a
                href={`/checkout/${user._id}/shipping`}
                className="flex justify-center items-center text-md py-3">
                <HiChevronLeft size={30} />
                Return to infomation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;

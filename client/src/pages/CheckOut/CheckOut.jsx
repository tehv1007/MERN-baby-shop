import { HiChevronLeft } from "react-icons/hi";
import SidebarCheckOut from "./SidebarCheckOut";
import DropIn from "braintree-web-drop-in-react";
import {
  createOrder,
  getBraintreeClientToken,
  processPayment,
} from "../../services/paymentService";
import { isAuthenticated } from "../../services/authService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import ShippingInfo from "./ShippingInfo";
import { showError, showSuccess, showLoading } from "./Services";
import { getCartItems, removeCartItems } from "../../hooks/useCart";

const CheckOut = ({ user }) => {
  const navigate = useNavigate();
  const info = JSON.parse(localStorage.getItem("shippingInfo"));
  const address = JSON.parse(localStorage.getItem("shippingInfo2"));
  const fullAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const phoneNumber = JSON.parse(localStorage.getItem("phoneNumber"));
  const total = JSON.parse(localStorage.getItem("total"));
  let products;

  if (!user) products = [];
  const { data, isLoading } = getCartItems(user);
  if (isLoading) return <GlobalSpinner />;
  products = data.data.products;

  const [dataset, setDataset] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const mutation = removeCartItems(user);
  const userId = user._id;
  const token = localStorage.getItem("token");

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        // console.log(data.error);
        setDataset({ ...data, error: data.error });
      } else {
        // console.log(data);
        setDataset({ clientToken: data.clientToken });
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

  const buy = () => {
    setDataset({ loading: true });
    // send the nonce to server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = dataset.instance
      .requestPaymentMethod()
      .then((dataset) => {
        // console.log(data);
        nonce = dataset.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: total,
          address: fullAddress,
          phoneNumber: phoneNumber,
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
              paymentMethod: response.transaction.paymentInstrumentType,
              address: fullAddress,
              phoneNumber: phoneNumber,
            };

            console.log(createOrderData);

            createOrder(userId, token, createOrderData)
              .then((response) => {
                // emptyCart(user);
                mutation.mutate();
                console.log("payment success and empty cart");
                setDataset({
                  loading: false,
                  success: true,
                });
                navigate("/user/my-orders");
              })
              .catch((error) => {
                console.log(error);
                setDataset({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setDataset({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("drop-in error: ", error);
        setDataset({ ...dataset, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setDataset({ ...dataset, error: "" })}>
      {dataset.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: dataset.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (dataset.instance = instance)}
          />
          <button
            onClick={buy}
            className="inline-block align-middle text-center select-none border whitespace-no-wrap rounded py-1 px-3 bg-green-500 text-white hover:green-600 w-full"
          >
            Pay Now
          </button>
        </div>
      ) : null}
    </div>
  );

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
            {/* Shipping address */}
            <p className="my-4">Shipping Details</p>
            <ShippingInfo user={user} info={info} address={address} />

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
              <Link
                to={`/checkout/${user._id}/shipping`}
                className="flex justify-center items-center text-md py-3"
              >
                <HiChevronLeft size={30} />
                Return to information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;

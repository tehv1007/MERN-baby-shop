import DropIn from "braintree-web-drop-in-react";
import Progress from "../../components/common/Progress";

export const showDropIn = (setDataset, dataset, products) => (
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

export const showError = (error) => (
  <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
    {error}
  </div>
);

export const showSuccess = (success) => (
  <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
    Thanks! Your payment was successful!
  </div>
);

export const showLoading = (loading) =>
  loading && (
    <h2 className="text-danger">
      <Progress />
    </h2>
  );

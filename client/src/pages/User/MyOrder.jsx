import React from "react";

const MyOrders = ({ order }) => {
  return (
    <div className="w-full mt-4 px-2 lg:px-4">
      {/* Container */}
      <div className="border rounded p-2">
        <div>
          <div className="flex justify-between px-2 pb-1 font-bold">
            <p>Order: order.transaction_id</p>
            <div className="flex gap-2">
              <span className="text-green-700/80"> ✔ Order Shipped</span>
              <button>| Shipping Detail</button>
            </div>
          </div>
          <hr />

          <div className="flex justify-between pt-2 px-2 font-bold">
            <p>Date: Jan 21, 2023</p>
            <p>Payment: Paid</p>
          </div>
        </div>
        <section className="flex gap-5 p-2">
          {/* ProductInfo */}
          <ul className="w-5/6">
            {/* <img
                  className="w-1/6 rounded-md"
                  src="https://cdn.shopify.com/s/files/1/0618/2889/0871/products/maxi1_713x.webp?v=1657630686"
                  alt=""
                /> */}
            {order.products.map((p, index) => (
              <li key={index}>
                <span>
                  <h4 className="pb-2">{p.productId}</h4>
                </span>
                <div className="flex justify-between">
                  <h1>{p.quantity}</h1>
                  <p className="pb-4 font-semibold">${p.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex gap-5 p-2"></section>
        <hr />
        <div>
          <div className="flex justify-end my-4">
            <span className="text-xl font-bold">Total: ${order.amount}</span>
          </div>
          <div className="flex justify-end gap-4">
            <button className="button">Order Detail</button>
            <button className="button">Review</button>
            <button className="button bg-green-700/70 text-white">
              Re-Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

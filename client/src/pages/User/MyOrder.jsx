import formatDate from "../../services/formatDate.js";

const MyOrders = ({ order }) => {
  return (
    <div className="w-full mt-4 px-2 lg:px-4">
      {/* Container */}
      <div className="border rounded p-2">
        <div>
          <div className="flex justify-between px-2 pb-1 font-bold">
            <p>Order ID: #{order.transaction_id}</p>
            <div className="flex gap-2">
              <span
                className={`text-green-700/80 ${order.status.toLowerCase()} rounded-full px-2`}
              >
                {order.status}
              </span>
              <button>| Shipping Detail</button>
            </div>
          </div>
          <hr />

          <div className="flex justify-between pt-2 px-2 font-bold">
            <p>Date: {formatDate(order.createdAt)}</p>
            <p>Payment: Paid</p>
          </div>
        </div>
        <section className="flex gap-5 p-2">
          {/* ProductInfo */}
          <ul className="w-5/6">
            {order.products.map((p, index) => (
              <li key={index} className="flex gap-5 mb-2">
                <img
                  className="rounded-md w-[64px] h-[64px]"
                  src={
                    p.image ||
                    "https://cdn.shopify.com/s/files/1/0618/2889/0871/products/maxi1_713x.webp?v=1657630686"
                  }
                  alt=""
                />
                <div className="w-full">
                  <span>
                    <h4 className="pb-2">{p.name || p.productId}</h4>
                  </span>
                  <div className="flex justify-between">
                    <h1>x{p.quantity}</h1>
                    <p className="pb-4 font-semibold">${p.price}</p>
                  </div>
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
            <button className="button bg-green-700/70 text-white px-2">
              Re-Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

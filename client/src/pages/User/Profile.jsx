import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Profile.css";

function Profile({ user }) {
  console.log(user);
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return axios.get(`/orders/${user._id}`);
    },
    cacheTime: 5 * 60 * 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;
  const { data: orders } = data;

  return (
    <div className="max-w-screen-xl mx-auto mt-4 mb-4 p-6 flex justify-center">
      <div className="bg-gray-200 p-4">
        <div className="flex flex-col justify-center items-center">
          <button className="btn btn-secondary">
            <img src={user.image} alt="user face" height={100} width={100} />
          </button>
          <span className="name mt-3">{user.name}</span>{" "}
          <div className="d-flex flex-row justify-content-center align-items-center gap-2" />
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">
              e-mail 📧 : <span className="follow">{user.email}</span>
            </span>
            {orders ? (
              <>
                <h1 className="my-4">Order list:</h1>
                <ul>
                  {orders.map((order, index) => (
                    <li key={index} className="my-4">
                      <h2>Transaction Id: {order.transaction_id}</h2>
                      <p>Amount: {order.amount}</p>
                      <p>
                        Products:{" "}
                        {order.products.map((p, index) => (
                          <li key={index}>
                            {p.productId}: Quantity - {p.quantity}
                          </li>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

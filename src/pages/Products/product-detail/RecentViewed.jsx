import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import axios from "axios";

const recentlyViewed = [
  {
    id: 1,
    image:
      "https://cdn.shopify.com/s/files/1/0105/7302/1241/products/Noodoll-rabbit-plush-toy-Ricejagger-1.jpg?v=1528316254",
    title: "Ricejagger",
  },
  {
    id: 2,
    image:
      "https://cdn.shopify.com/s/files/1/0105/7302/1241/products/PN-103-Ricebot-front.jpg?v=1529060868",
    title: "Pocket Notebook – Ricebot",
  },
  {
    id: 3,
    image:
      "https://cdn.shopify.com/s/files/1/0105/7302/1241/products/Noodoll-mermaid-plush-toy-Ricebombshell-1.jpg?v=1528322118",
    title: "Ricebombshell",
  },
  {
    id: 4,
    image:
      "https://cdn.shopify.com/s/files/1/0105/7302/1241/products/Machi-town-72-14.jpg?v=1529055381",
    title: "Wooden Ricetown",
  },
  {
    id: 5,
    image:
      "https://cdn.shopify.com/s/files/1/0105/7302/1241/products/Ro83Is3RTSwxhwg0s5bQ_STA-113-MyRoom-package.jpg?v=1529060107",
    title: "Learning Cards – My Room",
  },
  {
    id: 6,
    image:
      "https://cdn.shopify.com/s/files/1/0105/7302/1241/products/Noodoll-beetroot-plush-toy-Ricebeet-1.jpg?v=1528314732",
    title: "Ricebeet",
  },
];

const RecentViewed = () => {
  // const { data: products, isLoading } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => axios.get(`/products/recently-viewed-products`),
  //   select: (res) => res.data,
  // });

  // if (isLoading) return <GlobalSpinner />;
  // console.log(products);

  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="mt-4 mb-4 text-gray-900 text-lg leading-7">
        <h2 className="text-4xl font-extrabold leading-10 text-center my-8">
          Recently Viewed
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {recentlyViewed.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="items-center text-center cursor-pointer group transition duration-500 ease-in-out overflow-hidden"
            >
              <div className="rounded-3xl group-hover:opacity-80 bg-cover bg-no-repeat overflow-hidden">
                <img
                  // src={product.photos[0]}
                  src={product.image}
                  alt="Product image"
                  className="hover:scale-105 transition duration-500 ease-in-out"
                />
              </div>
              <h3 className="text-sm leading-6 mt-2 cursor-pointer group-hover:opacity-80">
                {product.title}
              </h3>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RecentViewed;

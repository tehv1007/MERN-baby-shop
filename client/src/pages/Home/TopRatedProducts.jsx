import Rating from "../../components/common/Rating";
import products from "./products";

const ProductCard = ({ id, title, imageUrl, price }) => {
  return (
    <div className={id}>
      <div className="group relative">
        <img className="group rounded-t-md" src={imageUrl} alt={title} />
        <div className="text-center bg-gray-200 p-4 rounded-b-md relative">
          <h4 className="pb-2">{title}</h4>
          <p className="pb-2">${price}</p>
          <Rating rating={5} />
          <button className="bg-[#212529] text-white py-2 px-4 rounded-md  hover:bg-white hover:text-black md:px-6 lg:absolute -top-36 lg:left-[85px] xl:left-[95px] lg:hidden lg:group-hover:block transition duration-500 ">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4">
      {/* Product Card */}
      {products.map((item) => {
        return (
          <ProductCard
            key={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
          />
        );
      })}
    </div>
  );
};

const TopratedProducts = () => {
  return (
    <div className="mt-8 lg:mt-16">
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="">
          {/* Title */}
          <div className="text-center lg:flex items-center justify-center lg:gap-20">
            <div className=" mb-4">
              <h3 className="text-[#212529] text-lg font-bold mb-4 lg:text-4xl">
                Toprated Products
              </h3>
              <p className="text-xs lg:text-lg">
                Interesting Features Is Rich And Colorful, Each Button To Bring
                A Surprise To The Baby Introduction To Give <br /> Your Child
                Learn In Advance.
              </p>
            </div>
          </div>
          {/* Cards */}
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default TopratedProducts;

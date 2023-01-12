import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-banner h-[350px] bg-cover  md:h-screen">
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="flex justify-center items-center lg:justify-start h-banner">
          {/* CONTENT BOX */}
          <div className="text-white mt-12 sm:mt-16 md:mt-56 lg:text-left">
            <div className="mb-6">
              <h1 className="font-bold text-4xl lg:text-5xl mb-4 text-[#212529]">
                Shop Best Home Accessories <br /> For Your Children
              </h1>
            </div>
            {/* Shop button */}
            <Link
              to="/products"
              className="bg-[#212529] text-white py-3 px-8 rounded-md hover:bg-white hover:text-black transition-all"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

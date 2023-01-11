import delivery from "../../assets/img/delivery.webp";
import money from "../../assets/img/money.avif";
import support from "../../assets/img/support.avif";
import gifcard from "../../assets/img/grifCard.avif";

const Delivery = () => {
  return (
    <div className="mt-8 lg:mt-16">
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="border-2 rounded-md px-4 py-4">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
            <div className="flex gap-4 items-center pb-4">
              <span className="border-2 rounded-full hover:shadow-2xl transition-all">
                <img className="p-2" src={delivery} alt="" />
              </span>
              <div className="">
                <h4>FREE SHIPPING</h4>
                <p>Money Back Guarantee</p>
              </div>
            </div>
            <div className="flex gap-4 items-center pb-4">
              <span className="border-2 rounded-full  hover:shadow-2xl transition-all">
                <img className="p-2" src={money} alt="" />
              </span>
              <div className="">
                <h4>FREE RETURN</h4>
                <p>Money Back Guarantee</p>
              </div>
            </div>
            <div className="flex gap-4 items-center pb-4">
              <span className="border-2 rounded-full  hover:shadow-2xl transition-all">
                <img className="p-2" src={support} alt="" />
              </span>
              <div className="">
                <h4>24/7 SUPPORT</h4>
                <p>We Support Online 24 Hrs</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="border-2 rounded-full  hover:shadow-2xl transition-all">
                <img className="p-2" src={gifcard} alt="" />
              </span>
              <div className="">
                <h4>RECIEVE GIFT CARD</h4>
                <p>All Over Oder $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;

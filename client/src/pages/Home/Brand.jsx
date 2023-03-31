import brandBackyard from "../../assets/img/brand-backyard.webp";
import brandNatural from "../../assets/img/brand-natural.webp";
import brandOrganic from "../../assets/img/brand-organic.webp";
import brandSummer from "../../assets/img/brand-summer.avif";
import brandTravel from "../../assets/img/brand-travel.avif";
import brandAntony from "../../assets/img/brand-antony.webp";

const Brand = () => {
  return (
    <div className="my-8 lg:mt-16">
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-8">
          <img src={brandBackyard} alt="" className="" />
          <img src={brandNatural} alt="" className="" />
          <img src={brandSummer} alt="" className="hidden md:block" />
          <img src={brandAntony} alt="" className="hidden xl:block" />
          <img src={brandTravel} alt="" className="hidden lg:block" />
          <img src={brandOrganic} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default Brand;

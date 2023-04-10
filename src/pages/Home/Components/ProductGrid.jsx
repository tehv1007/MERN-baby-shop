import ProductCard from "../../Products/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Grid } from "swiper";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProductGrid = ({ products, user }) => {
  return (
    // <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4 relative">
    <div className="relative">
      <div className="swiper-button image-swiper-button-next">
        {/* <BsArrowRightCircle /> */}
        <HiArrowRight />
      </div>
      <div className="swiper-button image-swiper-button-prev">
        {/* <BsArrowLeftCircle /> */}
        <HiArrowLeft />
      </div>
      <Swiper
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        slidesPerView={4}
        grid={{
          rows: 1,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={16}
        modules={[Grid, Navigation, Autoplay]}
        className="mySwiper"
      >
        {/* Product Card */}
        {products.map((item) => {
          return (
            <SwiperSlide key={item._id}>
              <ProductCard key={item._id} product={item} user={user} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default ProductGrid;

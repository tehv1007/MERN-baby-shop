// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

const ImageSlider = ({ imageList, setImageIndex, imageIndex }) => {
  const handleClick = (index) => {
    setImageIndex(index);
  };
  return (
    <>
      <Swiper
        // direction="horizontal"
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="px-8">
        <div>
          {imageList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <button onClick={() => handleClick(index)}>
                  <img
                    src={item}
                    className={`${
                      imageIndex === index &&
                      "rounded hover:opacity-80 hover:border-gray-600 border-[1.5px] border-black"
                    }`}
                  />
                </button>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </>
  );
};
export default ImageSlider;

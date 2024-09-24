import React, { useState } from "react";
import Image from "next/image";
import { LEFT, RIGHT } from "@/utils/image-constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { heroSlider } from "@/utils/types";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { Button } from "antd";
import HeaderButton from "./HeaderButton";
const HomeCarousel = ({
  sliderPageData,
  headerData,
}: {
  sliderPageData: heroSlider;
  headerData: any;
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [totalSlides, setTotalSlides] = useState(3);

  const onSwiper = (swiper: any) => {
    setTotalSlides(swiper.slides.length);
    setCurrentIndex(swiper.activeIndex + 1);
  };

  const onSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex + 1);
  };

  return (
    <div className="home-container">
      <div className="swiper-container">
        <Swiper
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
            type: "custom",
          }}
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
          modules={[Pagination, Navigation]}
          className="homeSwiper"
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
        >
          {sliderPageData && sliderPageData.slider1Content && (
            <SwiperSlide>
              <>
                <div
                  className="slider-main-div"
                  style={{
                    backgroundImage: `url(${sliderPageData?.slider1Image.node.mediaItemUrl})`,
                  }}
                >
                  <div
                    className="slider-content"
                    dangerouslySetInnerHTML={{
                      __html: sliderPageData.slider1Content,
                    }}
                  ></div>
                </div>
              </>
            </SwiperSlide>
          )}
          {sliderPageData?.slider2VideoUrl && (
            <SwiperSlide>
              <LiteYouTubeEmbed
                id={sliderPageData?.slider2VideoUrl}
                title="item.title"
              />
            </SwiperSlide>
          )}
          {sliderPageData?.slider3Content && (
            <SwiperSlide>
              <>
                <div
                  className="slider-main-div"
                  style={{
                    backgroundImage: `url(${sliderPageData?.slider3Image?.node?.mediaItemUrl})`,
                  }}
                >
                  <div
                    className="slider-content"
                    dangerouslySetInnerHTML={{
                      __html: sliderPageData.slider3Content,
                    }}
                  ></div>
                </div>
              </>
            </SwiperSlide>
          )}
        </Swiper>
        {(sliderPageData?.slider2VideoUrl ||
          sliderPageData?.slider3Content) && (
          <div className="swiper-option-outer">
            <div className="custom-prev pointer">
              <Image src={LEFT} alt="Previous" width={19} height={12} />
            </div>
            <div className="swiper-pagination-custom text-16  text-center">
              {`${currentIndex} / ${totalSlides}`}
            </div>
            <div className="custom-next pointer">
              <Image src={RIGHT} alt="Next" width={19} height={12} />
            </div>
          </div>
        )}
      </div>

      <HeaderButton buttonData={headerData} customClass="md-none" />
    </div>
  );
};
export default HomeCarousel;

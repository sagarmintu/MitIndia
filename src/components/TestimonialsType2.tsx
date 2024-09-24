import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DP } from "@/utils/image-constants";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import client from "../../client";
import { gql } from "@apollo/client";
import { Col, Row } from "antd";

interface Testimonial {
  content: string;
  title: string;
  placed: {
    placedAt: string;
  };
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  } | null;
}

const TestimonialsType2 = () => {
  const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(0);

  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query Testimonials {
              testimonials(
                where: { orderby: { order: ASC, field: MENU_ORDER } }
              ) {
                edges {
                  node {
                    content
                    title
                    placed {
                      placedAt
                    }
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                }
              }
            }
          `,
        });

        if (data && data.testimonials && data.testimonials.edges) {
          setTestimonialData(
            data.testimonials.edges.map((edge: any) => edge.node)
          );
        }
      } catch (error) {
        console.error("Error fetching Testimonial data:", error);
      }
    };

    fetchTestimonialData();
  }, []);

  useEffect(() => {
    setTotalSlides(testimonialData.length);
  }, [testimonialData]);

  const onSwiper = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const onSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
  };

  return (
    <Swiper
      className="mt-50"
      onSwiper={onSwiper}
      onSlideChange={onSlideChange}
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 2 },
      }}
      pagination={{
        clickable: true,
      }}
    >
      {testimonialData.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="testimonial-card-2">
            <Row>
              <Col md={8}>
                {testimonial.featuredImage ? (
                  <Image
                    src={testimonial.featuredImage.node.mediaItemUrl}
                    alt="user"
                    height={294}
                    width={326}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={DP}
                    alt="user"
                    height={294}
                    width={326}
                    className="object-cover"
                  />
                )}
              </Col>
              <Col md={16}>
                <div className="testi-right">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: testimonial.content,
                    }}
                  ></div>
                  <h5>{testimonial.title}</h5>
                  <h6>
                    {testimonial.title} at {testimonial.placed?.placedAt}
                  </h6>
                </div>
              </Col>
            </Row>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialsType2;

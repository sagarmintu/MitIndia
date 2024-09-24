import React, { useEffect, useState } from "react";
import Image from "next/image";
import { QUOTES, TRI_VECTOR, DP } from "@/utils/image-constants";
import { Autoplay, Pagination } from "swiper/modules";
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

const Testimonials: React.FC<{ shortDesc: any }> = ({ shortDesc }) => {
  const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);

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

  return (
    <section className="bg-sec testimonials-container">
      <div className="container">
        <Row>
          <Col md={{ span: 14, offset: 5 }}>
            <h2 className="text-heading text-center">
              Hear From{" "}
              <span className="text-heading head-underline">Our Community</span>
            </h2>
            <p className="text-subhead">{shortDesc}</p>
          </Col>
        </Row>
      </div>
      <div className="container">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          centeredSlides={false}
          className="testimonialSwiper"
          spaceBetween={40}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          pagination={{
            clickable: true,
          }}
        >
          {testimonialData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card ">
                <div className="card-cloud">
                  <div className="card-cloud-main ">
                    <Image src={QUOTES} alt="quote" height={30} width={30} />
                    <p
                      className="quote-main text-16"
                      dangerouslySetInnerHTML={{
                        __html: testimonial.content,
                      }}
                    />
                  </div>
                  <div className="card-trivector">
                    <Image
                      src={TRI_VECTOR}
                      alt="tri"
                      height={20}
                      width={20}
                      className="tri-vectorimg"
                    />
                  </div>
                </div>
                <div className="testimonial-details ">
                  {testimonial.featuredImage ? (
                    <Image
                      src={testimonial.featuredImage.node.mediaItemUrl}
                      alt="user"
                      height={45}
                      width={45}
                      className="object-cover br-full"
                    />
                  ) : (
                    <Image
                      src={DP}
                      alt="user"
                      height={45}
                      width={45}
                      className="object-cover br-full"
                    />
                  )}
                  <div className="testi-info">
                    <h3 className="testimonial-username text-16 font-600">
                      {testimonial.title}
                    </h3>
                    <h4 className="text-primary">
                      Placed at{" "}
                      <span className="font-500">
                        {testimonial.placed?.placedAt}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default Testimonials;

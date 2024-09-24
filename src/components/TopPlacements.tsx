import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { Placement } from "@/utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const TopPlacements: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const { loading, error, data } = useQuery(gql`
    query PLQuery {
      placementLogos(
        first: 100
        where: { orderby: { order: ASC, field: MENU_ORDER } }
      ) {
        nodes {
          title
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
      pages(where: { name: "home" }) {
        edges {
          node {
            home {
              ourTopRecruiters {
                shortDescription
              }
            }
          }
        }
      }
    }
  `);
  useEffect(() => {
    if (!loading && !error && data) {
      setPlacements(data.placementLogos.nodes);
    }
  }, [loading, error, data]);
  return (
    <section className="bg-sec topplacement-container">
      <div className="container">
        <Row>
          <Col className="text-center" md={{ span: 12, offset: 6 }}>
            <h2 className="text-heading">
              Our{" "}
              <span className="text-heading head-underline">Top Placement</span>
            </h2>
            {data?.pages.edges[0]?.node.home.ourTopRecruiters && (
              <>
                <p className="text-subhead">
                  {
                    data.pages.edges[0].node.home.ourTopRecruiters
                      .shortDescription
                  }
                </p>
              </>
            )}
          </Col>
        </Row>
        <div className="mt-60 topplacements-content d-none d-md-block">
          {placements.map((item: Placement, index: number) => (
              <Image
                src={item.featuredImage.node.mediaItemUrl}
                alt={item.title}
                height={30}
                width={100}
                key={index}
                loading="lazy"
              />
          ))}
        </div>
        <Row className="mt-60 d-md-none">
          <Col xs={24}>
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              centeredSlides={true}
              spaceBetween={40}
              breakpoints={{
                200: { slidesPerView: 3 },
              }}
              className="home-logo-marquee"
            >
              {placements.map((item, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={item.featuredImage.node.mediaItemUrl}
                    alt={item.title}
                    height={30}
                    width={100}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </div>
    </section>
  );
};
export default TopPlacements;

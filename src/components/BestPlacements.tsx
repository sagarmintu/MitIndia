import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import client from "../../client";
import { gql } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface PlacementUnit {
  title: string;
  content: string;
  placementACF: {
    course: string;
    degree: string;
    pacakge: string;
    placedWith: string;
    year: string;
  };
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
}

interface BestPlacementsProps {
  slider: boolean;
}

const BestPlacements: React.FC<BestPlacementsProps> = ({ slider }) => {
  const [placementUnitData, setPlacementUnitData] = useState<PlacementUnit[]>(
    []
  );
  const [shortDescription, setShortDescription] = useState<string>("");

  useEffect(() => {
    const fetchPlacementUnitData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query AllPlacements {
              placements(
                where: { orderby: { order: ASC, field: MENU_ORDER } }
              ) {
                edges {
                  node {
                    title
                    content
                    placementACF {
                      course
                      degree
                      pacakge
                      placedWith
                      year
                    }
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                }
              }
              page(id: "cG9zdDoxOA==", idType: ID) {
                home {
                  opportunities {
                    shortDescription
                  }
                }
              }
            }
          `,
        });

        if (data && data.placements && data.placements.edges) {
          setPlacementUnitData(
            data.placements.edges.map((edge: any) => edge.node)
          );
          if (
            data.page &&
            data.page.home &&
            data.page.home.opportunities &&
            data.page.home.opportunities.shortDescription
          ) {
            setShortDescription(data.page.home.opportunities.shortDescription);
          }
        }
      } catch (error) {
        console.error("Error fetching PlacementUnit data:", error);
      }
    };

    fetchPlacementUnitData();
  }, []);

  return (
    <section className="bestplacement-container">
      <div className="container">
        <Row>
          <Col
            className="text-center"
            md={{ span: 12, offset: 6 }}
            xs={{ span: 24, offset: 0 }}
          >
            <h2 className="text-heading">
              Placement{" "}
              <span className="text-heading head-underline">Opportunities</span>
            </h2>

            <p className="text-subhead max-subhead">{shortDescription}</p>
          </Col>
        </Row>
        <div className="mt-60">
          {slider ? (
            <Swiper
              pagination={{
                clickable: true,
                el: ".swiper-pagination-custom",
                type: "custom",
              }}
              modules={[Pagination, Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              className="videosSwiper"
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              spaceBetween={30}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1200: {
                  slidesPerView: 1,
                },
              }}
            >
              {placementUnitData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`justify-between bestplacement-outer ${
                      index % 2 === 0 ? "even" : "odd"
                    }`}
                  >
                    <div className="bestplacement-inner-content flex-col">
                      <h3 className="scorer-name">{item.title}</h3>
                      <h4 className="scorer-position">
                        {item.placementACF.course}
                        <span className="mx-10">|</span>
                        {item.placementACF.year}
                      </h4>
                      <div className="scorer-details flex-col">
                        <p
                          className="scorer-quote"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        <div className="flex-row gap-10 align-end">
                          <h5 className="package-value">
                            {item.placementACF.pacakge}
                          </h5>
                          <p className="org-details">
                            Placed with
                            <span className="org-name">
                              {item.placementACF.placedWith}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <Image
                      src={item.featuredImage.node.mediaItemUrl}
                      loading="lazy"
                      alt="best"
                      height={295}
                      width={295}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Row align={"middle"} justify={"center"} gutter={[40, 140]}>
              {placementUnitData.map((item, index) => (
                <Col key={index}>
                  <div
                    className={`justify-between bestplacement-outer ${
                      index % 2 === 0 ? "even" : "odd"
                    }`}
                  >
                    <div className="bestplacement-inner-content flex-col">
                      <h3 className="scorer-name">{item.title}</h3>
                      <h4 className="scorer-position">
                        {item.placementACF.course}
                        <span className="mx-10">|</span>
                        {item.placementACF.degree} - {item.placementACF.year}
                      </h4>
                      <div className="scorer-details flex-col">
                        <div
                          className="scorer-quote"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        <div className="flex-row gap-10 align-end">
                          <h5 className="package-value">
                            {item.placementACF.pacakge}
                          </h5>
                          <p className="org-details">
                            Placed with
                            <span className="org-name">
                              {item.placementACF.placedWith}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <Image
                      src={item.featuredImage.node.mediaItemUrl}
                      alt="best"
                      height={295}
                      width={470}
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestPlacements;

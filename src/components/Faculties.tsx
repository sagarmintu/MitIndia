import { Col, Row } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import client from "../../client";
import { gql } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
interface Faculties {
  title: string;
  content: string;
  category: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
}
interface CommonProp {
  leadingFaculties: {
    shortDescription: string;
  };
}
const FacultiesSection: React.FC<{
  faculties: Faculties[];
}> = ({ faculties }) => {
  const [shortDesc, setShortDesc] = useState<CommonProp | null>(null);

  useEffect(() => {
    const fetchShortDesc = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query shortDesc {
              page(id: "cG9zdDoxOA==") {
                home {
                  leadingFaculties {
                    shortDescription
                  }
                }
              }
            }
          `,
        });

        if (
          data &&
          data.page &&
          data.page.home &&
          data.page.home.leadingFaculties
        ) {
          setShortDesc(data.page.home);
        }
      } catch (error) {
        console.error("Error fetching allUnit data:", error);
      }
    };

    fetchShortDesc();
  }, []);

  if (!shortDesc) {
    return null; // or return loading indicator
  }

  const shortDescription = shortDesc.leadingFaculties.shortDescription;

  return (
    <section className="faculty-container">
      <div className="container">
        <Row>
          <Col md={{ span: 14, offset: 6 }}>
            <h2 className="text-heading text-center">
              Our Industry{" "}
              <span className="text-heading head-underline">
                Leading Faculty
              </span>
            </h2>
            <p className="text-subhead max-subhead text-center">
              {shortDescription}
            </p>
          </Col>
        </Row>
        <Row
          justify={"center"}
          gutter={[
            { xs: 0, sm: 60, md: 60 },
            { xs: 28, sm: 60, md: 60 },
          ]}
          className="mt-60 d-none d-md-block"
        >
          {faculties?.map((item, index) => (
            <Col lg={6} md={8} sm={12} xs={24} key={index}>
              <div className="flex-col align-center">
                <div className="circle-container">
                  <div className="inner-circle">
                    <Image
                      src={item?.featuredImage?.node?.mediaItemUrl}
                      alt="people"
                      height={200}
                      width={200}
                      className="faculty-img"
                    />
                  </div>
                </div>
                <div className="faculty-details">
                  <h3 className="font-600">{item.title}</h3>
                  <h4
                    className="text-primary"
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  />
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Row className="mt-60 d-md-none">
          <Col xs={24}>
            <Swiper
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              centeredSlides={true}
              spaceBetween={40}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              pagination={{
                clickable: true,
              }}
              className="pb-60"
            >
              {faculties.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex-col align-center">
                    <div className="circle-container">
                      <div className="inner-circle">
                        <Image
                          src={item?.featuredImage?.node?.mediaItemUrl}
                          alt="people"
                          height={200}
                          width={200}
                          className="faculty-img"
                        />
                      </div>
                    </div>
                    <div className="faculty-details">
                      <h3 className="font-600">{item.title}</h3>
                      <h4
                        className="text-primary"
                        dangerouslySetInnerHTML={{
                          __html: item.content,
                        }}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </div>
    </section>
  );
};
export default FacultiesSection;

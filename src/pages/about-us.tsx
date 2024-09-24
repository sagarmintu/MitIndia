import FacultiesSection from "@/components/Faculties";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { MISSION, VISION } from "@/utils/image-constants";
import React, { useEffect, useState } from "react";
import client from "../../client";
import { gql } from "@apollo/client";
import { Col, Row, Flex } from "antd";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Head from "next/head";
import { AboutPage, Faq, Faculties } from "@/utils/types";
import styles from "../styles/about-us.module.scss";

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query AboutMainPageData {
          pages(where: { name: "About Us" }) {
            edges {
              node {
                aboutus {
                  trusteeSection {
                    subTitle
                    title
                  }
                  topDescription
                  topTitle
                  ourMission
                  ourVision
                  history {
                    content1
                    content2
                    content3
                    content4
                    content5
                    content6
                  }
                }
                seo {
                  title
                  metaDesc
                }
              }
            }
          }
          globalPages {
            edges {
              node {
                globalSettings {
                  header {
                    headerButtonUrl
                    headerButtonText
                  }
                }
              }
            }
          }
        }
      `,
    });

    if (
      data &&
      data.pages &&
      data.pages.edges &&
      data.pages.edges.length > 0 &&
      data.pages.edges[0].node.aboutus
    ) {
      const aboutPageData = data.pages.edges[0].node;
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          aboutPageData,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return {
      props: {
        aboutPageData: null,
        headerData: null,
      },
    };
  }
}

const AboutUs = ({
  aboutPageData,
  headerData,
}: {
  aboutPageData: AboutPage;
  headerData: any;
}) => {
  const [allFaqs, setAllFaqs] = useState<Faq[]>([]);
  const [academyList, setacademyList] = useState<Faq[]>([]);
  // const [allFaculties, setAllFaculties] = useState<Faculties[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query AllFAQs {
              fAQs(
                where: {
                  orderby: { field: MENU_ORDER, order: ASC }
                  categoryName: "home-page"
                }
              ) {
                edges {
                  node {
                    title
                    content
                  }
                }
              }
            }
          `,
        });

        if (data && data.fAQs && data.fAQs.edges) {
          setAllFaqs(data.fAQs.edges.map((edge: any) => edge.node));
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await client.query({
  //         query: gql`
  //           query AllFaculties {
  //             faculties(
  //               where: {
  //                 orderby: { field: MENU_ORDER, order: ASC }
  //                 categoryName: "home-page"
  //               }
  //             ) {
  //               edges {
  //                 node {
  //                   title
  //                   content
  //                   featuredImage {
  //                     node {
  //                       mediaItemUrl
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         `,
  //       });

  //       if (data && data.faculties && data.faculties.edges) {
  //         setAllFaculties(data.faculties.edges.map((edge: any) => edge.node));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching Faculties data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query Trustees {
              trustees(first: 100) {
                edges {
                  node {
                    title
                    trusteeDetails {
                      designationrole
                    }
                    slug
                  }
                }
              }
            }
          `,
        });

        if (data && data.trustees && data.trustees.edges) {
          setacademyList(data.trustees.edges.map((edge: any) => edge.node));
        }
      } catch (error) {
        console.error("Error fetching Faculties data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(aboutPageData);
  return (
    <>
      <Head>
        <title>{aboutPageData.seo.title}</title>
        <meta name="description" content={aboutPageData.seo.metaDesc} />
      </Head>
      <Navbar headerData={headerData} />
      {aboutPageData && (
        <section className={styles.abouttopsec}>
          <h1 className="head-underline">{aboutPageData.aboutus.topTitle}</h1>
          <p>{aboutPageData.aboutus.topDescription}</p>
        </section>
      )}
      <section className="py-120">
        <div className="container">
          <h2 className="text-heading head-underline text-center">
            History & Legacy
          </h2>

          <div className="history-swiper-wrap">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                  spaceBetween: 40,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              navigation={true}
              modules={[Navigation, Autoplay]}
              centeredSlides={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              className="historySwiper"
            >
              {aboutPageData &&
                Object.keys(aboutPageData?.aboutus.history)
                  .filter((x) => x.includes("content"))
                  .map((data, index) => {
                    return (
                      aboutPageData?.aboutus.history[data] && (
                        <SwiperSlide key={index}>
                          <div
                            className="history-block"
                            dangerouslySetInnerHTML={{
                              __html: aboutPageData?.aboutus.history[data],
                            }}
                          />
                        </SwiperSlide>
                      )
                    );
                  })}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="py-120 ">
        <div className="container">
          {aboutPageData && (
            <Row
              gutter={[
                { xs: 0, md: 40 },
                { xs: 40, md: 40 },
              ]}
            >
              <Col md={{ span: 10, offset: 2 }} xs={{ span: 24, offset: 0 }}>
                <div className={styles.visionmission}>
                  <Image
                    src={MISSION}
                    alt="unit"
                    className="allunits-img"
                    height={62}
                    width={62}
                  />
                  <h3>Our Mission</h3>
                  <p>{aboutPageData.aboutus.ourMission}</p>
                </div>
              </Col>
              <Col xs={24} md={10}>
                <div className={styles.visionmission}>
                  <Image
                    src={VISION}
                    alt="unit"
                    className="allunits-img"
                    height={62}
                    width={62}
                  />
                  <h3>Our Vision</h3>
                  <p>{aboutPageData.aboutus.ourVision}</p>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </section>
      {/* {aboutPageData && (
        <section className="py-120 academy-section">
          <div className="container small">
            <Flex vertical gap={20} className="academy--head">
              <h2 className="text-heading text-center">{aboutPageData.aboutus.trusteeSection?.title}</h2>
              <p className="academy-sub-head">{aboutPageData.aboutus.trusteeSection?.subTitle}</p>
            </Flex>
            <Flex wrap="wrap" className="academy-list">
              {academyList?.map((academy:any, index: number)=> ( 
                <div className="academy-list--item" key={index}>
                  <p className="academy-list--title">{academy.title}</p>
                  <p>{academy.trusteeDetails.designationrole}</p>
                </div>
              ))}
            </Flex>
          </div>
        </section>
        )
      } */}
      {/* <FacultiesSection faculties={allFaculties} /> */}
      <FaqSection faqs={allFaqs} />
      <Footer />
    </>
  );
};

export default AboutUs;

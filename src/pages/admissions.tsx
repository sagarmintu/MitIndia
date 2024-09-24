import Navbar from "@/components/Navbar";
import { FACEBOOK, INSTAGRAM, LINKEDIN, LOGO } from "@/utils/image-constants";
import client from "../../client";
import { gql } from "@apollo/client";
import { Col, Row, TabsProps } from "antd";
import Image from "next/image";
import downloadIcon from "../images/download.svg";
import { Tabs } from "antd";
import TestimonialsType2 from "@/components/TestimonialsType2";
import Head from "next/head";
import { Admissions } from "@/utils/types";
import styles from "../styles/admissions.module.scss";
import Marquee from "react-fast-marquee";
import FooterTop from "@/components/FooterTop";
export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query Admissions {
          pages(where: { name: "Admissions" }) {
            edges {
              node {
                admissions {
                  bdesProgramme {
                    buttonLabel
                    buttonUrl
                    description
                  }
                  specializations {
                    buttonText
                    buttonUrl
                    description
                    image {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                  numbers {
                    numberContent
                  }
                  programHighlights {
                    highlightsInfo
                    highlightImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                  partnership {
                    description
                    logoList
                    image {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                  whyMitIde {
                    iconList
                    description
                  }
                  footerCta {
                    description
                    buttonText
                    buttonUrl
                    image {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                  admissionDetails {
                    duration
                    eligibilityCriteria
                    fees
                    scholarships
                    selectionCriteria
                  }
                  header {
                    headerContent
                    image {
                      node {
                        mediaItemUrl
                      }
                    }
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
      data.pages.edges[0].node.admissions
    ) {
      const admissionsPageData = data.pages.edges[0].node;
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          admissionsPageData,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching admissions page data:", error);
    return {
      props: {
        admissionsPageData: null,
        headerData: null,
      },
    };
  }
}

const Admission = ({
  admissionsPageData,
  headerData,
}: {
  admissionsPageData: Admissions;
  headerData: any;
}) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Duration",
      children: (
        <div
          className="tab-content"
          dangerouslySetInnerHTML={{
            __html: admissionsPageData.admissions.admissionDetails.duration,
          }}
        ></div>
      ),
    },
    {
      key: "2",
      label: "Eligibility Criteria",
      children: (
        <div
          className="tab-content"
          dangerouslySetInnerHTML={{
            __html:
              admissionsPageData.admissions.admissionDetails
                .eligibilityCriteria,
          }}
        ></div>
      ),
    },
    {
      key: "3",
      label: "Selection Criteria",
      children: (
        <div
          className="tab-content"
          dangerouslySetInnerHTML={{
            __html:
              admissionsPageData.admissions.admissionDetails.selectionCriteria,
          }}
        ></div>
      ),
    },
    // {
    //   key: "4",
    //   label: "Fees",
    //   children: (
    //     <div
    //       className="tab-content"
    //       dangerouslySetInnerHTML={{
    //         __html: admissionsPageData.admissions.admissionDetails.fees,
    //       }}
    //     ></div>
    //   ),
    // },

    // {
    //   key: "5",
    //   label: "Scholarships",
    //   children: (
    //     <div
    //       className="tab-content"
    //       dangerouslySetInnerHTML={{
    //         __html: admissionsPageData.admissions.admissionDetails.scholarships,
    //       }}
    //     ></div>
    //   ),
    // },
  ];
  return (
    <>
      <Head>
        <title>{admissionsPageData.seo.title}</title>
        <meta name="description" content={admissionsPageData.seo.metaDesc} />
      </Head>
      <Navbar headerData={headerData} />
      <section
        className="admission-banner"
        style={{
          backgroundImage: `url(${admissionsPageData.admissions.header.image.node.mediaItemUrl})`,
        }}
      >
        <div className="container">
          <Row>
            <Col md={11}>
              <div
                className="admission-banner-info"
                dangerouslySetInnerHTML={{
                  __html: admissionsPageData.admissions.header.headerContent,
                }}
              ></div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="bg-sec  number-wrap">
        <div className="contact-card">
          <h3>Contact Us</h3>
          <br></br>
          <a className="btn btn-primary">Apply Now</a>
        </div>
        <div className="container">
          <h2 className="text-heading  text-center">
            Our Design Legacy in{" "}
            <span className="text-heading head-underline">Numbers</span>
          </h2>
          <div
            className="state-box-row"
            dangerouslySetInnerHTML={{
              __html: admissionsPageData.admissions.numbers.numberContent,
            }}
          ></div>
        </div>
      </section>
      <section className={styles.keyfeature}>
        <div className="container">
          <Row>
            <Col xs={24} sm={24} lg={24}>
              <h2 className="text-heading">
                <span className="text-heading head-underline">
                  Bachelor of Design
                </span>{" "}
                (B. Des) Program
              </h2>
            </Col>
            <Col xs={24} sm={14} lg={12}>
              <div
                className={styles.featureinfo}
                dangerouslySetInnerHTML={{
                  __html:
                    admissionsPageData.admissions.bdesProgramme.description,
                }}
              ></div>

              <a
                className="btn-primary"
                href={admissionsPageData.admissions.bdesProgramme.buttonUrl}
                target="_blank"
              >
                {admissionsPageData.admissions.bdesProgramme.buttonLabel}
                <Image
                  src={downloadIcon}
                  alt="download"
                  width={20}
                  height={20}
                ></Image>
              </a>
            </Col>
          </Row>
        </div>
      </section>
      <section className={styles.specializations}>
        <div className="container">
          <Row
            gutter={[
              { xs: 0, md: 80 },
              { xs: 80, md: 80 },
            ]}
          >
            <Col xs={24} sm={24} lg={12}>
              <h2 className="text-heading">
                Our{" "}
                <span className="text-heading head-underline">
                  Top Specializations
                </span>
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    admissionsPageData.admissions.specializations.description,
                }}
              ></div>
              <Image
                src={
                  admissionsPageData.admissions.specializations.image.node
                    .mediaItemUrl
                }
                alt="specializations"
                width={550}
                height={515}
                className="d-md-none"
              ></Image>
              <a
                className="btn-primary"
                href={admissionsPageData.admissions.specializations.buttonUrl}
                target="_blank"
              >
                {admissionsPageData.admissions.specializations.buttonText}
              </a>
            </Col>
            <Col xs={24} sm={24} lg={12} className="d-none d-md-block">
              <Image
                src={
                  admissionsPageData.admissions.specializations.image.node
                    .mediaItemUrl
                }
                alt="specializations"
                width={550}
                height={515}
              ></Image>
            </Col>
          </Row>
        </div>
      </section>
      <section className="bg-sec admission">
        <div className="container">
          <Row>
            <Col md={24}>
              <h2 className="text-heading head-underline">
                B.Des Programme Overview
              </h2>
            </Col>
            <Col md={24} className="mt-50 d-none d-md-block">
              <Tabs
                defaultActiveKey="1"
                centered
                className="admission-tab"
                tabPosition="left"
                items={items}
              ></Tabs>
            </Col>
            <Col md={24} className="mt-50 d-md-none">
              <Tabs
                defaultActiveKey="1"
                className="admission-tab"
                items={items}
              ></Tabs>
            </Col>
          </Row>
        </div>
      </section>
      <section className={styles.highlightsec}>
        <div className="container">
          <Row align="middle">
            <Col xs={24} md={14}>
              <h2 className="text-heading head-underline">Program Highlight</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    admissionsPageData.admissions.programHighlights
                      .highlightsInfo,
                }}
              ></div>
            </Col>
          </Row>
        </div>
        <Image
          src={
            admissionsPageData.admissions.programHighlights.highlightImage.node
              .mediaItemUrl
          }
          alt="Highlight"
          width={550}
          height={515}
          className="highlight-image d-none d-md-block"
        ></Image>
      </section>
      <section className={`bg-sec ${styles.specializations} `}>
        <div className="container">
          <Row
            gutter={[
              { xs: 0, sm: 60, md: 130 },
              { xs: 0, sm: 60, md: 100 },
            ]}
          >
            <Col xs={24} sm={24} lg={14}>
              <h2 className="text-heading head-underline">
                Industrial Exposure
              </h2>
              <div
                className="feature-info"
                dangerouslySetInnerHTML={{
                  __html: admissionsPageData.admissions.partnership.description,
                }}
              ></div>
            </Col>
            <Col xs={24} sm={24} lg={10} className="text-center">
              <Image
                src={
                  admissionsPageData.admissions.partnership.image.node
                    .mediaItemUrl
                }
                alt="partnership"
                width={479}
                height={579}
              ></Image>
            </Col>
            <Col xs={24} sm={24}>
              <Marquee pauseOnHover={true} speed={30}>
                <div
                  className="logo-list"
                  dangerouslySetInnerHTML={{
                    __html: admissionsPageData.admissions.partnership.logoList,
                  }}
                ></div>
              </Marquee>
            </Col>
          </Row>
        </div>
      </section>
      <section className="whymit">
        <div className="container">
          <Row>
            <Col xs={24} md={10}>
              <h2 className="text-heading head-underline">
                Why Choose MIT ID?
              </h2>
              <div
                className="para-text text-white mt-20"
                dangerouslySetInnerHTML={{
                  __html: admissionsPageData.admissions.whyMitIde.description,
                }}
              ></div>
            </Col>
            <Col xs={24} md={24}>
              <div
                className="icon-list"
                dangerouslySetInnerHTML={{
                  __html: admissionsPageData.admissions.whyMitIde.iconList,
                }}
              ></div>
            </Col>
          </Row>
        </div>
      </section>
      <section className="bg-sec success-stories-2">
        <div className="container">
          <Row>
            <Col md={24}>
              <h2 className="text-heading ">
                Hear from the
                <br />
                <span className=" head-underline">Industry Leaders</span>
              </h2>
            </Col>
            <Col md={24}>
              <TestimonialsType2 />
            </Col>
          </Row>
        </div>
      </section>

      <section className="admission-cta">
        <div className="container">
          <Row align="middle">
            <Col md={14}>
              <div
                className="dynamic-title underline-white mb-60"
                dangerouslySetInnerHTML={{
                  __html: admissionsPageData.admissions.footerCta.description,
                }}
              ></div>
              <a
                className="btn-secondary"
                href={admissionsPageData.admissions.footerCta.buttonUrl}
                target="_blank"
              >
                {admissionsPageData.admissions.footerCta.buttonText}
              </a>
            </Col>
            <Col md={10}>
              <Image
                src={
                  admissionsPageData.admissions.footerCta.image.node
                    .mediaItemUrl
                }
                alt="specializations"
                width={504}
                height={450}
                className="mt-40"
              ></Image>
            </Col>
          </Row>
        </div>
      </section>
      <FooterTop></FooterTop>
    </>
  );
};

export default Admission;

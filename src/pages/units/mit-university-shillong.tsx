import FacultiesSection from "@/components/Faculties";

import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import GetInTouch from "@/components/GetInTouch";

import LearnAbout from "@/components/LearnAbout";
import Navbar from "@/components/Navbar";
import UnitExperienceLife from "@/components/UnitExperienceLife";

import React, { useEffect, useState } from "react";
import PopularCourses from "@/components/units/PopularCourses2";
import { Col, Row } from "antd";
import Image from "next/image";

import BestPlacements from "@/components/BestPlacements";
import Head from "next/head";
import { Faq, Faculties, UnitPageType } from "@/utils/types";
import { useGraphQL } from "@/utils/useGraphQL";
import client from "../../../client";
import { gql } from "@apollo/client";
export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query homeabout {
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

    if (data && data.globalPages) {
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error home about section data:", error);

    return {
      props: {
        headerData: null,
      },
    };
  }
}
const Units = ({ headerData }: { headerData: any }) => {
  const [allFaqs, setAllFaqs] = useState<Faq[]>([]);
  const [allFaculties, setAllFaculties] = useState<Faculties[]>([]);
  const [allunits, setAllUnits] = useState<UnitPageType | null>(null);

  const { data: faqdata } = useGraphQL<any>(`
  query AllFAQs {
    fAQs(
      where: {
        orderby: { field: MENU_ORDER, order: ASC }
        categoryName: "mit-university-shillong"
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
 `);
  const { data: facultiesData } = useGraphQL<any>(`
  query AllFaculties {
    faculties(
      where: {
        orderby: { field: MENU_ORDER, order: ASC }
        categoryName: "mit-university-shillong"
      }
    ) {
      edges {
        node {
          title
          content
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
 `);
  const { data: unitData } = useGraphQL<any>(`
    query homedata {
      pages(where: {name: "MIT University, Shillong"}) {
        edges {
          node {
            unitPage {
              unitPageNumbers
              unitPageTopDescription {
                contentLeft
                imageRight {
                  node {
                    mediaItemUrl
                  }
                }
              }
              banner {
                bannerImage {
                  node {
                    mediaItemUrl
                  }
                }
                contentLeft
              }
              gallery {
                campus
                eventsActivities
                hostelRecreation
                learningSpacesLabs
                studentLedClubs
              }
            }
          }
        }
      }
    }
 `);
  useEffect(() => {
    if (faqdata && faqdata.fAQs && faqdata.fAQs.edges) {
      setAllFaqs(faqdata.fAQs.edges.map((edge: any) => edge.node));
    }
    if (
      facultiesData &&
      facultiesData.faculties &&
      facultiesData.faculties.edges
    ) {
      setAllFaculties(
        facultiesData.faculties.edges.map((edge: any) => edge.node)
      );
    }
    if (
      unitData &&
      unitData.pages &&
      unitData.pages.edges[0] &&
      unitData.pages.edges[0].node &&
      unitData.pages.edges[0].node.unitPage
    ) {
      setAllUnits(unitData?.pages.edges[0].node.unitPage);
    }
  }, [faqdata, facultiesData, unitData]);
  console.log("test", unitData);
  return (
    <>
      <Head>
        <title>MIT | MIT University Shillong</title>
        <meta
          name="description"
          content="MIT University Shillong page description"
        />
      </Head>
      <Navbar headerData={headerData} />
      <section
        className="unit-banner"
        style={{
          backgroundImage: `url(${allunits?.banner.bannerImage.node.mediaItemUrl})`,
        }}
      >
        <div className="unit-banner-content">
          <div
            className="unit-banner-content"
            dangerouslySetInnerHTML={{
              __html: allunits?.banner.contentLeft ?? "",
            }}
          />
        </div>
      </section>
      <section className="unit-highlights">
        <div className="container">
          <div
            className="state-box-wrap"
            dangerouslySetInnerHTML={{
              __html: allunits?.unitPageNumbers ?? "",
            }}
          />
        </div>
      </section>
      <section className="unit-about py-120">
        <div className="container">
          <Row
            gutter={[
              { xs: 0, md: 60 },
              { xs: 60, md: 60 },
            ]}
          >
            <Col md={14} xs={24}>
              <div
                dangerouslySetInnerHTML={{
                  __html: allunits?.unitPageTopDescription.contentLeft ?? "",
                }}
              />
            </Col>

            <Col md={10} xs={24} className="text-right">
              {allunits?.unitPageTopDescription.imageRight?.node
                .mediaItemUrl && (
                <Image
                  src={
                    allunits?.unitPageTopDescription.imageRight?.node
                      .mediaItemUrl ?? ""
                  }
                  alt="about"
                  width={470}
                  height={270}
                ></Image>
              )}
            </Col>
          </Row>
        </div>
      </section>
      <PopularCourses unitCatID={7} />
      <BestPlacements slider={true} />
      <GetInTouch />
      <FacultiesSection faculties={allFaculties} />
      <UnitExperienceLife
        universityName="MIT University"
        gallery={allunits?.gallery}
      />

      <LearnAbout />
      <FaqSection faqs={allFaqs} />
      <Footer />
    </>
  );
};

export default Units;

import { useEffect, useMemo, useState } from "react";
import { useGraphQL } from "../utils/useGraphQL";
import client from "../../client";
import { gql } from "@apollo/client";
import { Faq, Faculties, AllSec, AllSec2 } from "@/utils/types";
import Head from "next/head";
import AllUnits from "@/components/AllUnits";
import ChooseUs from "@/components/ChooseUs";
import FaqSection from "@/components/FaqSection";
import GetInTouch from "@/components/GetInTouch";
import HomeCarousel from "@/components/HomeCarousel";
import LearnAbout from "@/components/LearnAbout";
import Testimonials from "@/components/Testimonials";
import TopPlacements from "@/components/TopPlacements";
import FacultiesSection from "@/components/Faculties";
import BestPlacements from "@/components/BestPlacements";
import PopularCourses from "@/components/PopularCourses";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MainSection from "@/components/MainSection";
import EventsNews from "@/components/EventsNews";

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query homeabout {
          page(id: "cG9zdDoxOA==") {
            home {
              heroSlider {
                slider1Content
                slider1Image {
                  node {
                    mediaItemUrl
                  }
                }
                slider2VideoUrl
                slider3Content
                slider3Image {
                  node {
                    mediaItemUrl
                  }
                }
              }
              about {
                title
                description
                buttonText
                buttonUrl
                features
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

    if (data && data.page && data.page.home) {
      const aboutdata2 = data.page.home;
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          aboutdata2,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error home about section data:", error);

    return {
      props: {
        aboutdata2: null,
        headerData: null,
      },
    };
  }
}
const Home = ({
  aboutdata2,
  headerData,
}: {
  aboutdata2: AllSec2;
  headerData: any;
}) => {
  const { data: faqdata } = useGraphQL<any>(`
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
 `);
  const { data: facultiesData } = useGraphQL<any>(`
  query AllFaculties {
    faculties(
      where: {
        orderby: { field: MENU_ORDER, order: DESC }
        categoryName: "home-page"
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
  const { data: aboutdata } = useGraphQL<AllSec>(`
   query homeabout {
     page(id: "cG9zdDoxOA==") {
       home {
          heroSlider {
            slider1Content
            slider1Image {
              node {
                mediaItemUrl
              }
            }
            slider2VideoUrl
            slider3Content
            slider3Image {
              node {
                mediaItemUrl
              }
            }
          }
          about {
            title
            description
            buttonText
            buttonUrl
            features
          }
          ourCommunity {
            shortDescription
          }
          newsEvent {
            shortDescription
          } 
          
       }
       seo {
        metaDesc
        title
      }
     }
   }
 `);

  const allFaqs = useMemo(
    () => faqdata?.fAQs?.edges?.map((edge: any) => edge.node) || [],
    [faqdata]
  );
  const allFaculties = useMemo(
    () => facultiesData?.faculties?.edges?.map((edge: any) => edge.node) || [],
    [facultiesData]
  );

  return (
    <>
      <Head>
        {/* <title>{aboutdata?.page.seo.title}</title> */}
        <title>MIT ID India - MIT Institute of Design | Best Design College in India</title>
        {/* <meta name="description" content={aboutdata?.page.seo.metaDesc} /> */}
        <meta name="description" content="Kickstart your creative career at MITID, one of the best design colleges in India. Explore B.Des and M.Des programs in fashion, graphic, and UI/UX design" />
      </Head>
      <Navbar headerData={headerData} />
      <HomeCarousel
        sliderPageData={aboutdata2.heroSlider}
        headerData={headerData}
      />
      {aboutdata2 && <MainSection aboutdata={aboutdata2.about} />}
      <AllUnits />
      <ChooseUs />
      <PopularCourses />
      <TopPlacements />
      <BestPlacements slider={false} />
      {allFaculties.length > 0 && <FacultiesSection faculties={allFaculties} />}
      <GetInTouch />
      {aboutdata && (
        <>
          <EventsNews
            shortDesc={aboutdata.page.home.newsEvent?.shortDescription}
          />
          <Testimonials
            shortDesc={aboutdata.page.home.ourCommunity?.shortDescription}
          />
        </>
      )}
      <LearnAbout />
      {allFaqs.length > 0 && <FaqSection faqs={allFaqs} />}
      <Footer />
    </>
  );
};

export default Home;

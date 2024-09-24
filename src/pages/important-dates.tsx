import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/utils/image-constants";
import client from "../../client";
import { gql } from "@apollo/client";
import Head from "next/head";

import FooterTop from "@/components/FooterTop";
import SubNavbar from "@/components/SubNavbar";

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query importantDates {
          page(id: "cG9zdDoxMjY1") {
            importantDates {
              importantDatesData
            }
            seo {
              metaDesc
              title
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
      data.page &&
      data.page.importantDates &&
      data.page.importantDates.importantDatesData
    ) {
      const importantDatesData = data.page;
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          importantDatesData,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error home about section data:", error);

    return {
      props: {
        importantDatesData: null,
        headerData: null,
      },
    };
  }
}
const ImportantDates = ({
  importantDatesData,
  headerData,
}: {
  importantDatesData: any;
  headerData: any;
}) => {
  return (
    <>
      <Head>
        <title>{importantDatesData?.seo?.title}</title>
        <meta name="description" content={importantDatesData?.seo?.metaDesc} />
      </Head>
      <section className="register-page">
        <SubNavbar headerData={headerData} />
        <div className="cp-container">
          <h2 className="text-heading cp-title text-left">
            <span className="text-heading head-underline">Important Dates</span>
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                importantDatesData?.importantDates?.importantDatesData || "",
            }}
            className="cp-dates-list"
          />
        </div>
      </section>
      <FooterTop></FooterTop>
    </>
  );
};

export default ImportantDates;

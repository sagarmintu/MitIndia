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
        query guidelines {
          page(id: "cG9zdDoxMjQ0") {
            guidelines {
              guidelinesData
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
      data.page.guidelines &&
      data.page.guidelines.guidelinesData
    ) {
      const guidelinesData = data.page;
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          guidelinesData,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error guidelines data:", error);

    return {
      props: {
        guidelinesData: null,
        headerData: null,
      },
    };
  }
}
const Guidelines = ({
  guidelinesData,
  headerData,
}: {
  guidelinesData: any;
  headerData: any;
}) => {
  return (
    <>
      <Head>
        <title>{guidelinesData?.seo?.title}</title>
        <meta name="description" content={guidelinesData?.seo?.metaDesc} />
      </Head>
      <section className="register-page">
        <SubNavbar headerData={headerData} />
        <div className="cp-container">
          <h2 className="text-heading cp-title text-left">
            <span className="text-heading head-underline">Guidelines</span>
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: guidelinesData?.guidelines?.guidelinesData || "",
            }}
            className="cp-content"
          />
        </div>
      </section>
      <FooterTop></FooterTop>
    </>
  );
};

export default Guidelines;

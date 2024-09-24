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
        query admissionProcedure {
          page(id: "cG9zdDoxMjU4") {
            admissionProcedure {
              admissionProcedureData
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
      data.page.admissionProcedure &&
      data.page.admissionProcedure.admissionProcedureData
    ) {
      const admissionProcedureData = data.page;
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          admissionProcedureData,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error admissionProcedure data:", error);

    return {
      props: {
        admissionProcedureData: null,
        headerData: null,
      },
    };
  }
}
const AdmissionProcedure = ({
  admissionProcedureData,
  headerData,
}: {
  admissionProcedureData: any;
  headerData: any;
}) => {
  return (
    <>
      <Head>
        <title>{admissionProcedureData?.seo?.title}</title>
        <meta
          name="description"
          content={admissionProcedureData?.seo?.metaDesc}
        />
      </Head>
      <section className="register-page">
        <SubNavbar headerData={headerData} />
        <div className="cp-container">
          <h2 className="text-heading cp-title text-left">
            <span className="text-heading head-underline">
              Admission Procedure
            </span>
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                admissionProcedureData?.admissionProcedure
                  ?.admissionProcedureData || "",
            }}
            className="cp-content"
          />
        </div>
      </section>
      <FooterTop></FooterTop>
    </>
  );
};

export default AdmissionProcedure;

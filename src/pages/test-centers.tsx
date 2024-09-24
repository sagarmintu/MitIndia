import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/utils/image-constants";
import client from "../../client";
import { gql } from "@apollo/client";
import Head from "next/head";

import FooterTop from "@/components/FooterTop";
import TestCenter from "@/components/TestCenter";
import { useEffect, useState } from "react";
import { Centers } from "@/utils/types";
import { useGraphQL } from "@/utils/useGraphQL";
import SubNavbar from "@/components/SubNavbar";

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query testCenterPage {
          page(id: "cG9zdDoxMjY3") {
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

    if (data && data.page) {
      const testpageData = data.page;
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          testpageData,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error home about section data:", error);

    return {
      props: {
        testpageData: null,
        headerData: null,
      },
    };
  }
}
const TestCenters = ({
  testpageData,
  headerData,
}: {
  testpageData: any;
  headerData: any;
}) => {
  const [allCenter, setAllCenter] = useState<Centers[]>([]);
  const { data: centersData } = useGraphQL<any>(`
  query AllCenters  {
    testCenters(first: 100) {
      edges {
        node {
          title
          testCenterData {
            date
            description
            time
          }
        }
      }
    }
    
  }
 `);
  useEffect(() => {
    if (centersData?.testCenters?.edges) {
      const centers = centersData.testCenters.edges
        .map((edge: any) => edge.node)
        .sort((a: any, b: any) => a.title.localeCompare(b.title));
      setAllCenter(centers);
    }
  }, [centersData]);
  return (
    <>
      <Head>
        <title>{testpageData?.seo?.title}</title>
        <meta name="description" content={testpageData?.seo?.metaDesc} />
      </Head>

      <section className="register-page">
        <SubNavbar headerData={headerData} />
        <div className="cp-container">
          <h2 className="text-heading cp-title text-left">
            <span className="text-heading head-underline">Test Centers</span>
          </h2>

          <TestCenter testcenter={allCenter}></TestCenter>
        </div>
      </section>
      <FooterTop></FooterTop>
    </>
  );
};

export default TestCenters;

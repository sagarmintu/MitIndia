import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/utils/image-constants";
import client from "../../client";
import { gql } from "@apollo/client";
import Head from "next/head";
import { Flex } from "antd";
import { useState, useEffect } from "react";
import SubNavbar from "@/components/SubNavbar";

// Fetching the registerData server-side using SSR
export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query homeabout {
          page(id: "cG9zdDoxMTc2") {
            register {
              registerData
            }
            seo {
              metaDesc
              title
            }
          }
        }
      `,
    });

    const registerData = data.page;

    return {
      props: {
        registerData,
      },
    };
  } catch (error) {
    console.error("Error fetching homeabout data:", error);

    return {
      props: {
        registerData: null,
      },
    };
  }
}

const Page = ({ registerData }: any) => {
  const [headerData, setHeaderData] = useState(null);

  // Fetching the headerData client-side
  useEffect(() => {
    async function fetchHeaderData() {
      try {
        const { data } = await client.query({
          query: gql`
            query globalHeader {
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
        setHeaderData(data.globalPages.edges[1]?.node?.globalSettings);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    }

    fetchHeaderData();
  }, []);

  // Loading the external script when the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/mitdatu/ee-form-widget/form-1/widget.js";

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>{registerData?.seo?.title}</title>
        <meta name="description" content={registerData?.seo?.metaDesc} />
      </Head>
      <section className="register-page">
        <SubNavbar headerData={headerData} />

        <div className="container">
          <Flex wrap="wrap" className="register-row">
            <div
              dangerouslySetInnerHTML={{
                __html: registerData?.register?.registerData || "",
              }}
              className="register-row--content"
            />
            <div>
              <div id="ee-form-1"></div>
            </div>
          </Flex>
        </div>
      </section>
    </>
  );
};

export default Page;

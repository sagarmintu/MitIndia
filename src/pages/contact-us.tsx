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
        query contactus {
          page(id: "cG9zdDoxMjI3") {
            contactus {
              contactData
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
      data.page.contactus &&
      data.page.contactus.contactData
    ) {
      const contactData = data.page;
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          contactData,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error home about section data:", error);

    return {
      props: {
        contactData: null,
        headerData: null,
      },
    };
  }
}
const ContactUs = ({
  contactData,
  headerData,
}: {
  contactData: any;
  headerData: any;
}) => {
  return (
    <>
      <Head>
        <title>{contactData?.seo?.title}</title>
        <meta name="description" content={contactData?.seo?.metaDesc} />
      </Head>
      <section className="register-page">
        <SubNavbar headerData={headerData} />
        <div className="cp-container">
          <h2 className="text-heading cp-title text-left">
            <span className="text-heading head-underline">Contact Us</span>
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: contactData?.contactus?.contactData || "",
            }}
            className="cp-content"
          />
        </div>
      </section>
      <FooterTop></FooterTop>
    </>
  );
};

export default ContactUs;

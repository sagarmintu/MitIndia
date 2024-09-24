import Image from "next/image";
import { useEffect, useState } from "react";
import client from "../../client";
import { gql } from "@apollo/client";
import { Col, Row } from "antd";
interface mediaItem {
  node: {
    mediaItemUrl: string;
  };
}
interface Chooseus {
  mainTitle: string;
  shortDesc: string;
  content1?: string;
  content2?: string;
  content3?: string;
  content4?: string;
  chooseImage1: mediaItem;
  chooseImage2: mediaItem;
  chooseImage3: mediaItem;
  chooseImage4: mediaItem;
}

const ChooseUs = () => {
  const [choosedata, setChooseData] = useState<Chooseus | null>(null);

  useEffect(() => {
    const fetchChooseData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query ExampleQuery {
              page(id: "cG9zdDoxOA==") {
                home {
                  whyChooseUs {
                    mainTitle
                    shortDesc
                    content1
                    content2
                    content3
                    content4
                    chooseImage1 {
                      node {
                        mediaItemUrl
                      }
                    }
                    chooseImage2 {
                      node {
                        mediaItemUrl
                      }
                    }
                    chooseImage3 {
                      node {
                        mediaItemUrl
                      }
                    }
                    chooseImage4 {
                      node {
                        mediaItemUrl
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
          data.page.home &&
          data.page.home.whyChooseUs
        ) {
          setChooseData(data.page.home.whyChooseUs);
        }
      } catch (error) {
        console.error("Error fetching whyChooseUs data:", error);
      }
    };

    fetchChooseData();
  }, []);

  return (
    <section className="chooseus-container">
      <div className="container">
        <Row>
          <Col className="text-center" md={{ span: 12, offset: 6 }}>
            <h2 className="text-heading">
              Why Choose{" "}
              <span className="text-heading head-underline"> MIT ID?</span>
            </h2>
            <p className="text-subhead">
              {choosedata && choosedata?.shortDesc}
            </p>
          </Col>
        </Row>

        <div className="chooseus-grid mt-60">
          <div className="chooseus-card">
            <div
              dangerouslySetInnerHTML={{
                __html: choosedata?.content1 || "",
              }}
            />
            {choosedata ? (
              <Image
                src={choosedata?.chooseImage1?.node.mediaItemUrl || ""}
                loading="lazy"
                alt="best"
                height={195}
                width={585}
                layout="responsive"
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <div className="chooseus-card">
            <div
              dangerouslySetInnerHTML={{
                __html: choosedata?.content2 || "",
              }}
            />
            {choosedata ? (
              <Image
                src={choosedata?.chooseImage2.node.mediaItemUrl || ""}
                alt="best"
                height={195}
                width={585}
                layout="responsive"
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <div className="chooseus-card">
            <div
              dangerouslySetInnerHTML={{
                __html: choosedata?.content3 || "",
              }}
            />
            {choosedata ? (
              <Image
                src={choosedata?.chooseImage3.node.mediaItemUrl || ""}
                loading="lazy"
                alt="best"
                height={195}
                width={585}
                layout="responsive"
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <div className="chooseus-card">
            <div
              dangerouslySetInnerHTML={{
                __html: choosedata?.content4 || "",
              }}
            />
            {choosedata ? (
              <Image
                src={choosedata?.chooseImage4.node.mediaItemUrl || ""}
                loading="lazy"
                alt="best"
                height={195}
                width={585}
                layout="responsive"
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;

import { C_CLOSE, C_OPEN } from "@/utils/image-constants";
import { Button, Col, Collapse, Row } from "antd";
import Image from "next/image";
import { Faq } from "@/utils/types";
import client from "../../client";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";

interface CommonProp {
  faq: {
    shortDescription: string;
  };
}

const FaqSection: React.FC<{ faqs: Faq[] }> = ({ faqs }) => {
  const items = faqs.map((faq, index) => ({
    key: index.toString(),
    label: faq.title,
    children: <p dangerouslySetInnerHTML={{ __html: faq.content }} />,
  }));

  const [shortDesc, setShortDesc] = useState<CommonProp | null>(null);

  useEffect(() => {
    const fetchShortDesc = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query shortDesc {
              page(id: "cG9zdDoxOA==") {
                home {
                  faq {
                    shortDescription
                  }
                }
              }
            }
          `,
        });

        if (data && data.page && data.page.home && data.page.home.faq) {
          setShortDesc(data.page.home);
        }
      } catch (error) {
        console.error("Error fetching allUnit data:", error);
      }
    };

    fetchShortDesc();
  }, []);

  if (!shortDesc) {
    return null; // or return loading indicator
  }

  const shortDescription = shortDesc.faq.shortDescription;

  return (
    <section className="bg-sec py-120">
      <div className="container">
        <Row
          align={"top"}
          justify={"center"}
          gutter={[
            { xs: 0, md: 60 },
            { xs: 60, md: 60 },
          ]}
        >
          <Col lg={8} xs={24}>
            <h2>
              <span className="text-heading">Frequently </span>
              <span className="text-heading head-underline">
                Asked Questions
              </span>
            </h2>
            <p className="text-subhead faq-subhead text-left">
              {shortDescription}
            </p>
          </Col>

          <Col lg={16} xs={24} className="faq-main">
            <Collapse
              bordered={false}
              className="faqs-container"
              defaultActiveKey={["0"]}
              expandIconPosition="end"
              expandIcon={({ isActive }) => (
                <Image
                  src={isActive ? C_OPEN : C_CLOSE}
                  alt={isActive ? "close" : "open"}
                />
              )}
              items={items}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default FaqSection;

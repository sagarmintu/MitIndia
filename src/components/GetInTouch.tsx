import { FORMIMG } from "@/utils/image-constants";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import client from "../../client";
import { gql } from "@apollo/client";
interface CommonProp {
  getInTouch: {
    shortDescription: string;
  };
}

const GetInTouch: React.FC<{}> = ({}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/mitdatu/ee-form-widget/form-1/widget.js";
    script.async = true; // Ensure the script loads asynchronously

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const eeFormDiv = document.getElementById("ee-form-1");
          if (
            eeFormDiv &&
            !eeFormDiv.querySelector(
              'script[src="https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/mitdatu/ee-form-widget/form-1/widget.js"]'
            )
          ) {
            eeFormDiv.appendChild(script); // Append the script to the div
            observer.disconnect(); // Stop observing after the script is added
          }
        }
      }
    });

    // Start observing the target node for configured mutations
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script); // Clean up the script when the component unmounts
      }
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const fetchShortDesc = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query shortDesc {
              page(id: "cG9zdDoxOA==") {
                home {
                  getInTouch {
                    shortDescription
                  }
                }
              }
            }
          `,
        });

        if (data && data.page && data.page.home && data.page.home.getInTouch) {
          setShortDesc(data.page.home);
        }
      } catch (error) {
        console.error("Error fetching allUnit data:", error);
      }
    };

    fetchShortDesc();
  }, []);

  const [shortDesc, setShortDesc] = useState<CommonProp | null>(null);
  if (!shortDesc) {
    return null;
  }
  const shortDescription = shortDesc.getInTouch.shortDescription;

  return (
    <section className="bg-dark getintouch-container">
      <div className="container">
        <div className="text-center">
          <p className="text-heading">
            Get in{" "}
            <span className="text-heading head-underline">Touch with Us</span>
          </p>
          <p className="text-subhead ">{shortDescription}</p>
        </div>

        <Row
          align={"middle"}
          justify={"center"}
          gutter={[0, { xs: 0, sm: 46, md: 46, lg: 46 }]}
          className="mt-60"
        >
          <Col lg={10} md={10} xs={24} className="justify-end">
            <Image src={FORMIMG} alt="banner" layout="responsive" />
          </Col>
          <Col lg={14} md={11} xs={24}>
            <div className="register-form-outer">
              <div id="ee-form-1"></div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default GetInTouch;

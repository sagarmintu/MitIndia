import { FACEBOOK, INSTAGRAM, LINKEDIN, LOGO } from "@/utils/image-constants";
import { Col, Row } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import client from "../../client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { FooterData } from "@/utils/types";

const Footer: React.FC<{}> = ({}) => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query footerDataQuery {
              globalPages {
                edges {
                  node {
                    globalSettings {
                      footer {
                        facebookUrl
                        instagramUrl
                        linkedinUrl
                        shortDescription
                      }
                      footerBottomContent {
                        copyrightContent
                      }
                      footerMiddleContent {
                        content1
                        content2
                        content3
                        content4
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
          data.globalPages &&
          data.globalPages.edges[1].node &&
          data.globalPages.edges[1].node.globalSettings
        ) {
          setFooterData(data.globalPages.edges[1].node.globalSettings);
        }
      } catch (error) {
        console.log("error in footer");
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="footer-container">
      <Row className="footer-upper" align="middle">
        <Col className="admission-footer-cta  d-md-none mb-60" md={6}>
          <h4>Get admission now !!</h4>
          <Link href="/admissions" className="btn-primary">
            Enroll Now
          </Link>
        </Col>
        <Col md={18}>
          <Link href="/">
            <Image
              src={LOGO}
              alt="logo"
              height={50}
              width={196}
              className="pointer centered footer-logo"
            />
          </Link>
          <p className="text-15">{footerData?.footer?.shortDescription}</p>
          <div className="flex-row footer-socials">
            {footerData?.footer?.instagramUrl && (
              <Link href={footerData.footer.instagramUrl} target="_blank">
                <Image
                  src={INSTAGRAM}
                  alt="instagram"
                  height={24}
                  width={24}
                  className="pointer centered"
                />
              </Link>
            )}
            {footerData?.footer?.facebookUrl && (
              <Link href={footerData.footer.facebookUrl} target="_blank">
                <Image
                  src={FACEBOOK}
                  alt="facebook"
                  height={24}
                  width={24}
                  className="pointer centered"
                />
              </Link>
            )}
            {footerData?.footer?.linkedinUrl && (
              <Link href={footerData.footer.linkedinUrl} target="_blank">
                <Image
                  src={LINKEDIN}
                  alt="facebook"
                  height={24}
                  width={24}
                  className="pointer centered"
                />
              </Link>
            )}
          </div>
        </Col>
        <Col className="admission-footer-cta d-none" md={6}>
          <h4>Get admission now !!</h4>
          <Link href="/admissions" className="btn-primary">
            Enroll Now
          </Link>
        </Col>
      </Row>

      <Row
        justify="space-between"
        gutter={[24, 50]}
        align={"top"}
        className="footer-main"
      >
        {footerData?.footerMiddleContent?.content1 && (
          <Col md={12} lg={6} sm={12} xs={24}>
            <div
              className="footer-courses"
              dangerouslySetInnerHTML={{
                __html: footerData.footerMiddleContent.content1,
              }}
            />
          </Col>
        )}
        {footerData?.footerMiddleContent?.content2 && (
          <Col md={12} lg={6} sm={12} xs={24}>
            <div
              className="footer-courses"
              dangerouslySetInnerHTML={{
                __html: footerData.footerMiddleContent.content2,
              }}
            />
          </Col>
        )}
        {footerData?.footerMiddleContent?.content3 && (
          <Col md={12} lg={6} sm={12} xs={24}>
            <div
              className="footer-courses"
              dangerouslySetInnerHTML={{
                __html: footerData.footerMiddleContent.content3,
              }}
            />
          </Col>
        )}
        {footerData?.footerMiddleContent?.content4 && (
          <Col md={12} lg={6} sm={12} xs={24}>
            <div
              className="footer-courses"
              dangerouslySetInnerHTML={{
                __html: footerData.footerMiddleContent.content4,
              }}
            />
          </Col>
        )}
      </Row>
      <Row
        justify="space-between"
        gutter={[24, 24]}
        align={"middle"}
        className="footer-copyright"
      >
        <Col md={12} xs={24}>
          <p className="text-primary">
            {footerData?.footerBottomContent?.copyrightContent}
          </p>
        </Col>
        <Col md={12} xs={24}>
          <div className="flex-row footer-terms">
            <Link href="#" className="text-primary">
              Terms & Conditions
            </Link>
            <Link href="#" className="text-primary">
              Privacy Policy
            </Link>
          </div>
        </Col>
      </Row>
    </footer>
  );
};
export default Footer;

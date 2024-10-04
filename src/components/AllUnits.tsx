import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ELE2, Y_FARROW } from "@/utils/image-constants";
import { useGraphQL } from "@/utils/useGraphQL";

interface MediaItem {
  node: {
    mediaItemUrl: string;
  };
}

interface HomeUnits {
  mainTitle: string;
  shortDesc: string;

  unit1Title: string;
  unit1Desc: string;
  unit1Url: string;
  unit1Image: MediaItem;

  unit2Title: string;
  unit2Desc: string;
  unit2Url: string;
  unit2Image: MediaItem;

  unit3Title: string;
  unit3Desc: string;
  unit3Url: string;
  unit3Image: MediaItem;

  unit4Title: string;
  unit4Desc: string;
  unit4Url: string;
  unit4Image: MediaItem;
}

const AllUnits = () => {
  const [chooseUs, setChooseUs] = useState<HomeUnits | null>(null);

  const { data: choosedata } = useGraphQL<any>(`
  query AllUnit {
    page(id: "cG9zdDoxOA==") {
          home {
            allUnit {
              mainTitle
              shortDesc
              unit1Title
              unit1Desc
              unit1Url
              unit1Image {
                node {
                  mediaItemUrl
                }
              }
              unit2Title
              unit2Desc
              unit2Url
              unit2Image {
                node {
                  mediaItemUrl
                }
              }
              unit3Title
              unit3Desc
              unit3Url
              unit3Image {
                node {
                  mediaItemUrl
                }
              }
              unit4Title
              unit4Desc
              unit4Url
              unit4Image {
                node {
                  mediaItemUrl
                }
              }
            }
          }
      }
  }
`);
  useEffect(() => {
    if (
      choosedata &&
      choosedata.page &&
      choosedata.page.home &&
      choosedata.page.home.allUnit
    ) {
      setChooseUs(choosedata.page.home.allUnit);
    }
  }, [choosedata]);

  return (
    <section className="bg-sec allunits-container">
      <div className="container">
        <Row>
          <Col className="text-center" md={{ span: 14, offset: 5 }}>
            <h2 className="text-heading">
              Our{" "}
              <span className="text-heading head-underline">Institutions</span>
            </h2>
            <p className="text-subhead">{chooseUs?.shortDesc}</p>
          </Col>
        </Row>
        <Image src={ELE2} alt="ele2" className="ele-2" />
        <Row
          gutter={[20, 20]}
          justify={"center"}
          align={"top"}
          className="mt-60"
        >
          <Col lg={12} md={12} xs={24} className="justify-start">
            <div className="flex-row units-outer">
              {chooseUs && (
                <Image
                  src={chooseUs?.unit1Image?.node.mediaItemUrl || ""}
                  alt="unit"
                  className="allunits-img"
                  height={300}
                  width={300}
                />
              )}

              <div className="units-wrap flex-col">
                <h3>{chooseUs?.unit1Title}</h3>
                <p>{chooseUs?.unit1Desc}</p>
                  <Button
                    type="text"
                    size="large"
                    className=" btn-with-righticon"
                    icon={
                      <Image
                        src={Y_FARROW}
                        alt="arrow"
                        height={18}
                        width={18}
                      />
                    }
                  >
                    <Link href={(chooseUs?.unit1Url as string) || ""}>Know More</Link>
                  </Button>
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} xs={24} className="justify-start">
            <div className="flex-row units-outer">
              {chooseUs && (
                <Image
                  src={
                    (chooseUs?.unit2Image?.node.mediaItemUrl as string) || ""
                  }
                  alt="unit"
                  className="allunits-img"
                  height={300}
                  width={300}
                />
              )}
              <div className="units-wrap flex-col">
                <h3>{chooseUs?.unit2Title}</h3>
                <p>{chooseUs?.unit2Desc}</p>
                  <Button
                    type="text"
                    size="large"
                    className="btn-with-righticon"
                    icon={
                      <Image
                        src={Y_FARROW}
                        alt="arrow"
                        height={18}
                        width={18}
                      />
                    }
                  >
                    <Link href={(chooseUs?.unit2Url as string) || ""}>Know More</Link>
                  </Button>
                
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} xs={24} className="justify-start">
            <div className="flex-row units-outer">
              {chooseUs && (
                <Image
                  src={
                    (chooseUs?.unit3Image?.node.mediaItemUrl as string) || ""
                  }
                  alt="unit"
                  className="allunits-img"
                  height={300}
                  width={300}
                />
              )}
              <div className="units-wrap flex-col">
                <h3>{chooseUs?.unit3Title}</h3>
                <p>{chooseUs?.unit3Desc}</p>
                  <Button
                    type="text"
                    size="large"
                    className=" btn-with-righticon"
                    icon={
                      <Image
                        src={Y_FARROW}
                        alt="arrow"
                        height={18}
                        width={18}
                      />
                    }
                  >
                    <Link href={(chooseUs?.unit3Url as string) || ""}>Know More</Link>
                  </Button>
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} xs={24} className="justify-start">
            <div className="flex-row units-outer">
              {chooseUs && (
                <Image
                  src={
                    (chooseUs?.unit4Image?.node.mediaItemUrl as string) || ""
                  }
                  alt="unit"
                  className="allunits-img"
                  height={300}
                  width={300}
                />
              )}
              <div className="units-wrap flex-col">
                <h3>{chooseUs?.unit4Title}</h3>
                <p>{chooseUs?.unit4Desc}</p>
                  <Button
                    type="text"
                    size="large"
                    className="btn-with-righticon"
                    icon={
                      <Image
                        src={Y_FARROW}
                        alt="arrow"
                        height={18}
                        width={18}
                      />
                    }
                  >
                    <Link href={(chooseUs?.unit4Url as string) || ""}>Know More</Link>
                  </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AllUnits;

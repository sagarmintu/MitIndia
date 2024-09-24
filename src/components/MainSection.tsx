import { Button, Col, Divider, Row } from "antd";
import { State } from "@/utils/types";
import Image from "next/image";
import { ELE1 } from "@/utils/image-constants";
const MainSection = ({ aboutdata }: { aboutdata: State }) => {
  return (
    <section className="main-about">
      <div className="container">
        <Image src={ELE1} width={36} height={31} alt="ele1" className="ele-1" />
        <Row gutter={[10, 10]}>
          <Col md={11} xs={24}>
            <h2 className="about-heading font-600">{aboutdata.title}</h2>
            <h3 className="text-16 about-subhead">{aboutdata.description}</h3>
            <a href={aboutdata.buttonUrl} className="btn btn-primary">
              {aboutdata.buttonText}
            </a>
          </Col>

          <Col md={2} xs={0} className="justify-center">
            <Divider type="vertical" className="vertical-line" />
          </Col>

          <Col md={11} xs={24}>
            <div
              className="about-feature"
              dangerouslySetInnerHTML={{ __html: aboutdata.features }}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default MainSection;

import React from "react";
import { Tabs } from "antd";
import Image from "next/image";
import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import image4 from "../images/image4.png";
import image5 from "../images/image5.png";
const { TabPane } = Tabs;

const UnitExperienceLife: React.FC<{
  universityName: string;
  gallery: any;
}> = ({ universityName, gallery }) => {
  return (
    <section className="py-120 bg-sec unit-explife">
      <div className="text-center mb-40">
        <h2 className="text-heading">
          Experience{" "}
          <span className="text-heading head-underline">
            Life at {universityName}
          </span>
        </h2>
      </div>

      <div className="container ">
        <div className="image-gallary mt-60">
          <div
            dangerouslySetInnerHTML={{
              __html: gallery?.campus,
            }}
          />
        </div>
        {/* <Tabs defaultActiveKey="1" className="explife-tab">
          <TabPane tab="Campus" key="1">
            <div className="image-gallary">
              <div
                dangerouslySetInnerHTML={{
                  __html: gallery?.campus,
                }}
              />
            </div>
          </TabPane>
          <TabPane tab="Events & Activities" key="2">
            <div className="image-gallary">
              <div
                dangerouslySetInnerHTML={{
                  __html: gallery?.eventsActivities,
                }}
              />
            </div>
          </TabPane>
          <TabPane tab="Student-Led Clubs" key="3">
            <div className="image-gallary">
              <div
                dangerouslySetInnerHTML={{
                  __html: gallery?.studentLedClubs,
                }}
              />
            </div>
          </TabPane>
          <TabPane tab="Learning Spaces & Labs" key="4">
            <div className="image-gallary">
              <div
                dangerouslySetInnerHTML={{
                  __html: gallery?.learningSpacesLabs,
                }}
              />
            </div>
          </TabPane>
          <TabPane tab="Hostel & Recreation" key="5">
            <div className="image-gallary">
              <div
                dangerouslySetInnerHTML={{
                  __html: gallery?.hostelRecreation,
                }}
              />
            </div>
          </TabPane>
        </Tabs> */}
      </div>
    </section>
  );
};

export default UnitExperienceLife;

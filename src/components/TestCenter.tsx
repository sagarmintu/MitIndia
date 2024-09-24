import { Col, Row } from "antd";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Centers } from "@/utils/types";
import CalendarIcon from "../images/calendarIcon.svg";
import ClockIcon from "../images/clockIcon.svg";
import MapIcon from "../images/mapIcon.svg";
const TestCenter: React.FC<{
  testcenter: Centers[];
}> = ({ testcenter }) => {
  return (
    <div className="testcenter-grid">
      {testcenter?.map((item, index) => (
        <div className="center-card" key={index}>
          <div className="c-header">
            <h3 className="font-600">{item.title}</h3>
          </div>

          <div className="c-body">
            <h4 className="font-600 d-flex align-items-center">
              <Image src={CalendarIcon} alt="Icon" className="me-8" />
              {item.testCenterData.date}
            </h4>

            <h4 className="font-600 d-flex align-items-center">
              <Image src={ClockIcon} alt="Icon" className="me-8" />
              {item.testCenterData.time}
            </h4>
            <div className="d-flex align-items-start">
              <Image src={MapIcon} alt="Icon" className="me-8" />
              <p
                className="text-primary"
                dangerouslySetInnerHTML={{
                  __html: item.testCenterData.description,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TestCenter;

import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { LEFT, RIGHT } from "@/utils/image-constants";
import { Navigation, Pagination } from "swiper/modules";
import client from "../../client";
import { gql } from "@apollo/client";
import { Col, Row } from "antd";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { useGraphQL } from "@/utils/useGraphQL";

interface MITVideos {
  title: string;
  date: string;
  videos: {
    videoUrl?: string;
    videoId?: string;
  };
}

interface CommonProp {
  learnMoreAboutMit: {
    shortDescription: string;
  };
}
const LearnAbout: React.FC<{}> = ({ }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [totalSlides, setTotalSlides] = useState(3);
  const [videosData, setVideosData] = useState<MITVideos[]>([]);

  const { data: videosDataResponse } = useGraphQL<any>(`
  query Videos {
    videos {
      edges {
        node {
          title
          date
          videos {
            videoUrl
            videoId
          }
        }
      }
    }
  }
`);

  const allVideos = useMemo(
    () =>
      videosDataResponse?.videos?.edges?.map((edge: any) => edge.node) || [],
    [videosDataResponse]
  );

  useEffect(() => {
    if (videosDataResponse) {
      const numSlidesPerView: any = { 640: 1, 768: 2, 1200: 3 };
      const slidesPerView = numSlidesPerView[document.body.clientWidth] || 1;
      const totalSlidesCount = Math.ceil(videosDataResponse.videos.edges.length / slidesPerView);
      setTotalSlides(totalSlidesCount);
      setVideosData(videosDataResponse.videos.edges.map((edge: any) => edge.node));
    }
  }, [videosDataResponse]);


  const formatTimeAgo = (timestamp: string) => {
    const previousDate = new Date(timestamp);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - previousDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  };
  const [shortDesc, setShortDesc] = useState<CommonProp | null>(null);

  useEffect(() => {
    const fetchShortDesc = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query shortDesc {
              page(id: "cG9zdDoxOA==") {
                home {
                  learnMoreAboutMit {
                    shortDescription
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
          data.page.home.learnMoreAboutMit
        ) {
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



  const shortDescription = shortDesc.learnMoreAboutMit.shortDescription;
  return (
    <section className="py-120">
      <div className="container">
        <Row>
          <Col md={{ span: 12, offset: 6 }}>
            <h2 className="text-heading text-center">
              Learn{" "}
              <span className="text-heading head-underline">
                More About MIT
              </span>
            </h2>
            <p className="text-subhead">{shortDescription}</p>
          </Col>
        </Row>

        <div className="mt-60">
          <Swiper
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
              type: "custom",
              renderCustom: (swiper, current, total) => `${current} / ${total}`,
            }}

            // onSlideChange={onSlideChange}
            modules={[Pagination, Navigation]}
            className="videosSwiper"
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            spaceBetween={30}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {videosData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="learnabt-card" key={index}>
                  <LiteYouTubeEmbed
                    id={item.videos?.videoId ?? ""}
                    title="item.title"
                    noCookie={true}
                  />
                  <div className="py-20 text-left">
                    <h3>{item.title}</h3>
                    <p>30k views &middot; {formatTimeAgo(item.date)}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-option-outer-sec">
            <div className="custom-prev pointer">
              <Image src={LEFT} alt="Previous" width={24} height={24} />
            </div>
            <div className="swiper-pagination-custom text-16">
              {`${currentIndex} / ${totalSlides}`}
            </div>
            <div className="custom-next pointer">
              <Image src={RIGHT} alt="Next" width={24} height={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnAbout;

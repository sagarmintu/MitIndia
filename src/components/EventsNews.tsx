import { useEffect, useState } from "react";
import Image from "next/image";
import client from "../../client";
import { gql } from "@apollo/client";
import { Col, Row, Flex } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  content: string;
  date: string;
  slug: string;
  contentTypeName: string;
  seo: {
    readingTime: string;
  };
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
}
interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  slug: string;
  contentTypeName: string;
  seo: {
    readingTime: string;
  };
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
}
const EventsNews: React.FC<{ shortDesc: any }> = ({ shortDesc }) => {
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("News");
  const handleCategoryClick = (category: any) => {
    setActiveCategory(category);
  };
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query GetPosts {
              events(
                last: 6
                where: { orderby: { field: DATE, order: DESC } }
              ) {
                edges {
                  node {
                    id
                    title
                    content
                    date
                    slug
                    contentTypeName
                    seo {
                      readingTime
                    }
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                }
              }
              news(last: 6, where: { orderby: { field: DATE, order: DESC } }) {
                edges {
                  node {
                    id
                    title
                    content
                    date
                    slug
                    contentTypeName
                    seo {
                      readingTime
                    }
                    featuredImage {
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

        if (data && data.events && data.events.edges) {
          setEventsData(
            data.events.edges.map((edge: { node: Event }) => edge.node)
          );
        }

        if (data && data.news && data.news.edges) {
          setNewsData(data.news.edges.map((edge: { node: News }) => edge.node));
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error:</p>;
  }
  const getFirstParagraph = (content: string) => {
    const paragraphs = content.split("\n");
    return paragraphs[1];
  };
  return (
    <section className="eventsnews-container">
      <div className="container">
        <Row>
          <Col md={{ span: 14, offset: 5 }}>
            <h2 className="text-heading text-center">
              Latest{" "}
              <span className="text-heading head-underline">News & Events</span>
            </h2>
            <p className="text-subhead">{shortDesc}</p>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <div className="category-filter-list">
              <button
                className={activeCategory === "News" ? "activeCategory" : ""}
                onClick={() => handleCategoryClick("News")}
              >
                News
              </button>
              <button
                className={activeCategory === "Events" ? "activeCategory" : ""}
                onClick={() => handleCategoryClick("Events")}
              >
                Events
              </button>
            </div>
          </Col>
        </Row>
        <Row gutter={[30, 30]}>
          <Col md={12}>
            {activeCategory === "Events" &&
              eventsData.slice(0, 1).map((event, index) => (
                <Link
                  key={index}
                  className="encard-large"
                  href={`news-events/event/${event.slug}`}
                >
                  <Image
                    src={event.featuredImage.node.mediaItemUrl}
                    alt="img"
                    width={626}
                    height={290}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="encard-content flex-col">
                    <p className="en-title font-600">{event.title}</p>
                    <div
                      className="en-desc text-14"
                      dangerouslySetInnerHTML={{
                        __html: getFirstParagraph(event.content),
                      }}
                    ></div>

                    <p className="en-date">
                      {dayjs(event.date).format("DD MMM YYYY")}
                    </p>
                  </div>
                </Link>
              ))}
            {activeCategory === "News" &&
              newsData.slice(0, 1).map((news, index) => (
                <Link
                  key={index}
                  className="encard-large"
                  href={`news-events/news/${news.slug}`}
                >
                  <Image
                    src={news.featuredImage.node.mediaItemUrl}
                    alt="img"
                    width={626}
                    height={290}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="encard-content flex-col">
                    <p className="en-title font-600">{news.title}</p>
                    <div
                      className="en-desc text-14"
                      dangerouslySetInnerHTML={{
                        __html: getFirstParagraph(news.content),
                      }}
                    ></div>
                    <p className="en-date">
                      {dayjs(news.date).format("DD MMM YYYY")}
                    </p>
                  </div>
                </Link>
              ))}
          </Col>
          <Col md={12}>
            {activeCategory === "Events" &&
              eventsData.slice(1, 4).map((event, index) => (
                <Link
                  key={index}
                  className="encard-small"
                  href={`news-events/event/${event.slug}`}
                >
                  <Flex justify="space-between" align="center" gap={24}>
                    <Image
                      src={event.featuredImage.node.mediaItemUrl}
                      alt="img"
                      width={210}
                      height={155}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="encard-content flex-col">
                      <p className="en-title">{event.title}</p>
                      <div
                        className="en-desc"
                        dangerouslySetInnerHTML={{
                          __html: getFirstParagraph(event.content),
                        }}
                      ></div>
                      <p className="en-date">
                        {dayjs(event.date).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </Flex>
                </Link>
              ))}
            {activeCategory === "News" &&
              newsData.slice(1, 4).map((news, index) => (
                <Link
                  key={index}
                  className="encard-small"
                  href={`news-events/news/${news.slug}`}
                >
                  <Flex justify="space-between" align="center" gap={24}>
                    <Image
                      src={news.featuredImage.node.mediaItemUrl}
                      alt="img"
                      width={210}
                      height={155}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="encard-content flex-col">
                      <p className="en-title font-600">{news.title}</p>
                      <div
                        className="en-desc text-14"
                        dangerouslySetInnerHTML={{
                          __html: getFirstParagraph(news.content),
                        }}
                      ></div>
                      <p className="en-date">
                        {dayjs(news.date).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </Flex>
                </Link>
              ))}
          </Col>
        </Row>
      </div>
    </section>
  );
};
export default EventsNews;

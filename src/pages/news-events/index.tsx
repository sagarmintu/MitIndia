import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import client from "../../../client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { Col, Row, Tabs } from "antd";
import Image from "next/image";
import dayjs from "dayjs";

import { WATCHICON } from "@/utils/image-constants";
import Head from "next/head";
const { TabPane } = Tabs;

interface NewsPost {
  id?: string;
  title?: string;
  content?: string;
  date?: string;
  slug?: string;
  contentTypeName?: string;
  seo: {
    readingTime: string;
  };
  featuredImage: {
    node: {
      mediaItemUrl?: string;
    };
  };
}

interface Props {
  news: NewsPost[];
  events: NewsPost[];
  allPosts: NewsPost[];
  headerData: any;
}

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query GetPosts {
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
          events(last: 6, where: { orderby: { field: DATE, order: DESC } }) {
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
          globalPages {
            edges {
              node {
                globalSettings {
                  header {
                    headerButtonUrl
                    headerButtonText
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
      data.news &&
      data.news.edges &&
      data.news.edges.length > 0 &&
      data.events &&
      data.events.edges &&
      data.events.edges.length > 0
    ) {
      const news = data.news.edges.map((edge: any) => edge.node);
      const events = data.events.edges.map((edge: any) => edge.node);
      const allPosts = [...events, ...news];
      const headerData =
        data.globalPages.edges[1]?.node?.globalSettings || null;
      return {
        props: {
          news,
          events,
          allPosts: allPosts.slice(0, 4),
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return {
    props: {
      news: [],
      events: [],
      allPosts: [],
      headerData: null,
    },
  };
}

const Blogs = ({ news, events, allPosts, headerData }: Props) => {
  return (
    <>
      <Head>
        <title>MIT | News & Events</title>
        <meta
          name="description"
          content="Explore our comprehensive collection of articles, announcements, and event listings to discover what's happening in our community."
        />
      </Head>
      <Navbar headerData={headerData} />
      <section className="news-banner">
        <div className="container">
          <Row>
            <Col md={{ span: 18, offset: 3 }} xs={24}>
              <h1 className="text-heading head-underline text-center">
                News & Events
              </h1>
              <p>
                There&apos;s always something great happening at MIT ID.
                You&apos;ll find all our stories here, whether it&apos;s a
                creative innovation or a student achievement.
              </p>
            </Col>
          </Row>
        </div>
      </section>
      <section className="latest-news">
        <div className="container">
          <h2 className="text-heading head-underline text-center">
            Latest Happenings
          </h2>
          <Row gutter={20}>
            {allPosts.slice(0, 4).map((post) => (
              <Col xs={24} md={6} key={post.id}>
                <Link
                  href={`/news-events/${post.contentTypeName}/${post.slug}`}
                >
                  <div
                    className="reel-box"
                    style={{
                      backgroundImage: `url(${post.featuredImage?.node.mediaItemUrl})`,
                    }}
                  >
                    <div className="reel-info">
                      <span className="cat-tag">{post.contentTypeName}</span>
                      <h3>{post.title}</h3>
                      <p>{dayjs(post.date).format("DD MMM YYYY")}</p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>
      <section className="latest-blog-wrapper news-wrapper bg-sec">
        <div className="container">
          <h2 className="text-heading head-underline text-center">
            All News & Events
          </h2>

          <Tabs defaultActiveKey="1" className="explife-tab">
            <TabPane tab="News" key="1">
              <div className="latest-blog-grid">
                {news.map((post) => (
                  <div key={post.id} className="latest-blog-grid-box">
                    <Link href={`/news-events/news/${post.slug}`}>
                      <div className="img-hover">
                        <Image
                          src={post.featuredImage.node.mediaItemUrl ?? ""}
                          alt="blog"
                          width={510}
                          height={180}
                        />
                      </div>
                      <div>
                        <h3>{post.title}</h3>
                        <div className="post-desc">
                          <p>
                            <Image
                              src={WATCHICON}
                              alt="read"
                              width={20}
                              height={20}
                            />
                            <span>{post.seo.readingTime} Minutes read</span>
                          </p>
                          <p>{dayjs(post.date).format("DD MMM YYYY")}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </TabPane>
            <TabPane tab="Events" key="2">
              <div className="latest-blog-grid">
                {events.map((post) => (
                  <div key={post.id} className="latest-blog-grid-box">
                    <Link href={`/news-events/event/${post.slug}`}>
                      <div className="img-hover">
                        <Image
                          src={post.featuredImage?.node.mediaItemUrl ?? ""}
                          alt="event"
                          width={510}
                          height={180}
                        />
                      </div>

                      <div>
                        <h3>{post.title}</h3>
                        <div className="post-desc">
                          <p>
                            <Image
                              src={WATCHICON}
                              alt="read"
                              width={20}
                              height={20}
                            />
                            <span>{post.seo.readingTime} Minutes read</span>
                          </p>
                          <p>{dayjs(post.date).format("DD MMM YYYY")}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blogs;

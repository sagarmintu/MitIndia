import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import client from "../../../../client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Col, Row, Space } from "antd";
import Image from "next/image";
import {
  WATCHICON,
  BLOGPH,
  LINKEDINICON,
  FACEBOOKICON,
  TWITTERICON,
  URLICON,
} from "@/utils/image-constants";
import Head from "next/head";
import dayjs from "dayjs";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import RecentNews from "@/components/RecentNews";
interface Post {
  slug: string;
  title: string;
  content: string;
  date: string;
  link: string;
  seo: {
    metaDesc: string;
    title: string;
    readingTime: number;
  };
}

interface Props {
  post: Post | null;
  headerData: null;
}

const PostPage = ({ post, headerData }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }
  const shareUrl = `https://mitidindia.com/news-events/news/${post.slug}`;
  return (
    <>
      <Head>
        <title>MIT | {post.seo.title}</title>
        <meta name="description" content={post.seo.metaDesc} />
      </Head>
      <Navbar headerData={headerData} />
      <section className="news-banner">
        <div className="container">
          <Row>
            <Col md={24} xs={24}>
              <h1 className="text-heading  text-center">{post.title}</h1>
              <p>Lorem Ipsum is a dummy text which needs to be highlight.</p>
            </Col>
          </Row>
        </div>
      </section>

      <section className="post-detail-wrapper">
        <div className="container">
          <Row
            align="top"
            gutter={[
              { xs: 0, md: 60 },
              { xs: 60, md: 60 },
            ]}
          >
            <Col md={16} xs={24}>
              <Row>
                <Col md={24} className="post-detail-header">
                  <div className="justify-between align-center post-sub-info">
                    <Space>
                      <Image
                        src={WATCHICON}
                        alt="blog"
                        width={18}
                        height={18}
                      ></Image>
                      <p className="mb-0">
                        <b>{post.seo.readingTime} Minutes to read</b>
                        <span>&bull;</span>
                        {dayjs(post.date).format("DD MMM YYYY")}
                      </p>
                    </Space>
                    <Space size={16} className="xs-mt-20">
                      <LinkedinShareButton url={shareUrl}>
                        <Image
                          src={LINKEDINICON}
                          alt="social"
                          width={24}
                          height={24}
                        ></Image>
                      </LinkedinShareButton>
                      <TwitterShareButton url={shareUrl}>
                        <Image
                          src={TWITTERICON}
                          alt="social"
                          width={24}
                          height={24}
                        ></Image>
                      </TwitterShareButton>
                      <FacebookShareButton url={shareUrl}>
                        <Image
                          src={FACEBOOKICON}
                          alt="social"
                          width={24}
                          height={24}
                        ></Image>
                      </FacebookShareButton>
                      <Image
                        src={URLICON}
                        alt="social"
                        width={24}
                        height={24}
                      ></Image>
                    </Space>
                  </div>
                </Col>
                <Col md={24} className="post-detail-body">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </Col>
              </Row>
            </Col>
            <Col md={8} xs={24}>
              <h3 className="sidebar-title">Recent News</h3>
              <RecentNews></RecentNews>
              <br />
            </Col>
          </Row>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PostPage;

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  try {
    const { data } = await client.query({
      query: gql`
        query GetNews($slug: ID!) {
          newsSingle(idType: SLUG, id: $slug) {
            slug
            title
            content
            date
            link
            seo {
              metaDesc
              title
              readingTime
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
      variables: { slug },
    });
    const headerData = data.globalPages.edges[1]?.node?.globalSettings || null;
    if (data && data.newsSingle) {
      return {
        props: {
          post: data.newsSingle,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  return {
    props: {
      post: null,
      headerData: null,
    },
  };
}

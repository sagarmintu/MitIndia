import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import client from "../../../../client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Col, Row, Space } from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import {
  BlogBanner,
  AUTHOR,
  BLOGPH,
  LINKEDINICON,
  FACEBOOKICON,
  TWITTERICON,
  URLICON,
} from "@/utils/image-constants";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import Head from "next/head";
import RecentPost from "@/components/RecentPost";
interface Post {
  slug: string;
  title: string;
  content: string;
  link: string;
  date: string;
  excerpt: string;
  categories: {
    nodes: {
      slug: string;
    }[];
  };
  seo: {
    metaDesc: string;
    title: string;
    readingTime: number;
  };
  blog: {
    authorName: string;
    authorImage: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
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
  const shareUrl = `https://mitidindia.com/blogs/${post.categories.nodes[0].slug}/${post.slug}`;
  return (
    <>
      <Head>
        <title>{post.seo.title}</title>
        <meta name="description" content={post.seo.metaDesc} />
      </Head>
      <Navbar headerData={headerData} />
      <section className="bg-sec blog-banner">
        <div className="container">
          <Row justify="space-between" align="middle" gutter={[20, 20]}>
            <Col md={11} xs={24}>
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            </Col>
            <Col md={12} xs={24} className="text-right">
              <Image
                src={post.featuredImage.node.mediaItemUrl}
                alt="blog"
                width={525}
                height={340}
              ></Image>
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
                        src={
                          post.blog.authorImage?.node.mediaItemUrl
                            ? post.blog.authorImage.node.mediaItemUrl
                            : AUTHOR
                        }
                        alt="blog"
                        width={42}
                        height={42}
                      ></Image>
                      <span className="author-name">
                        {post.blog.authorName}
                      </span>
                    </Space>
                    <p>
                      <b>{post.seo.readingTime} Minutes to read</b>
                      <span>&bull;</span>
                      {dayjs(post.date).format("DD MMM YYYY")}
                    </p>
                  </div>
                </Col>
                <Col md={24} className="post-detail-body">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </Col>
              </Row>
            </Col>
            <Col md={8} xs={24}>
              <h3 className="sidebar-title">Recent Posts</h3>
              <RecentPost></RecentPost>

              <br />
              <h3 className="sidebar-title">Share Blog</h3>
              <Space size={16} className="mt-20">
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
        query GetPost($slug: ID!) {
          post(idType: SLUG, id: $slug) {
            slug
            title
            content
            link
            date
            excerpt
            categories {
              nodes {
                slug
              }
            }
            seo {
              metaDesc
              title
              readingTime
            }
            blog {
              authorName
              authorImage {
                node {
                  mediaItemUrl
                }
              }
            }
            featuredImage {
              node {
                mediaItemUrl
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
      variables: { slug },
    });
    const headerData = data.globalPages.edges[1]?.node?.globalSettings || null;
    if (data && data.post) {
      return {
        props: {
          post: data.post,
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

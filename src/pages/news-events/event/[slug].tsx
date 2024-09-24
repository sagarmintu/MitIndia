import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import client from "../../../../client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Col, Row, Space } from "antd";
import GetInTouch from "@/components/GetInTouch";
import Image from "next/image";
import { CALENDARICON, CLOCKICON, MAPPINICON } from "@/utils/image-constants";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import PhotoAlbum from "react-photo-album";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
interface Post {
  slug: string;
  title: string;
  content: string;

  events: {
    eventIntroText: string;
    eventImages: {
      image1: {
        node: {
          mediaItemUrl?: string;
        };
      };
      image2: {
        node: {
          mediaItemUrl?: string;
        };
      };
      image3: {
        node: {
          mediaItemUrl?: string;
        };
      };
      image4: {
        node: {
          mediaItemUrl?: string;
        };
      };
      image5: {
        node: {
          mediaItemUrl?: string;
        };
      };
      image6: {
        node: {
          mediaItemUrl?: string;
        };
      };
      image7: {
        node: {
          mediaItemUrl?: string;
        };
      };
      image8: {
        node: {
          mediaItemUrl?: string;
        };
      };
    };
    speaker: {
      speaker1?: string;
      speaker2?: string;
      speaker3?: string;
      speaker4?: string;
    };
  };
}

interface Props {
  post: Post | null;
  headerData: null;
}

const PostPage = ({ post, headerData }: Props) => {
  const [index, setIndex] = useState(-1);

  const photos = [
    {
      src: post?.events.eventImages.image1?.node.mediaItemUrl || "",
      width: 800,
      height: 600,
    },
    {
      src: post?.events.eventImages.image2?.node.mediaItemUrl || "",
      width: 800,
      height: 600,
    },
    {
      src: post?.events.eventImages.image3?.node.mediaItemUrl || "",
      width: 800,
      height: 600,
    },
    {
      src: post?.events.eventImages.image4?.node.mediaItemUrl || "",
      width: 800,
      height: 600,
    },
    {
      src: post?.events.eventImages.image5?.node.mediaItemUrl || "",
      width: 800,
      height: 600,
    },
    {
      src: post?.events.eventImages.image6?.node.mediaItemUrl || "",
      width: 800,
      height: 600,
    },
    {
      src: post?.events.eventImages.image7?.node.mediaItemUrl || "",
      width: 800,
      height: 600,
    },
    {
      src: post?.events.eventImages.image8?.node.mediaItemUrl || "",
      width: 800,
      height: 600,
    },
  ];
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <>
      <Head>
        <title>{`MIT | ${post.title}`}</title>
        <meta name="description" content="event description" />
      </Head>
      <Navbar headerData={headerData} />
      <section className="news-banner">
        <div className="container">
          <Row>
            <Col md={24} xs={24}>
              <h1 className="text-heading  text-center">{post.title}</h1>
            </Col>
          </Row>
        </div>
      </section>
      {photos[0].src && (
        <section className="py-120">
          <div className="container  text-center">
            <Row>
              <Col md={{ span: 16, offset: 4 }}>
                <h2 className="text-heading head-underline">
                  Don&apos;t Miss: Event&apos;s Best Bits
                </h2>
                <h4 className="text-subhead">{post.events.eventIntroText}</h4>
              </Col>
            </Row>

            <div>
              {photos.some((photo) => photo.src) && (
                <Lightbox
                  slides={photos.filter((photo) => photo.src)}
                  open={index >= 0}
                  index={index}
                  close={() => setIndex(-1)}
                />
              )}
              <Swiper
                modules={[Pagination]}
                slidesPerView={3}
                spaceBetween={30}
                pagination={{ clickable: true }}
                className="eventSwiper"
                breakpoints={{
                  200: {
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
                {photos.map(
                  (photo, index) =>
                    photo.src && (
                      <SwiperSlide key={index}>
                        <Image
                          src={photo.src}
                          alt={`Image ${index + 1}`}
                          width={900}
                          height={900}
                          style={{ objectFit: "cover" }}
                          onClick={() => setIndex(index)}
                        />
                      </SwiperSlide>
                    )
                )}
              </Swiper>
            </div>
          </div>
        </section>
      )}
      <section className="bg-sec py-120">
        <div className="container ">
          <Row>
            <Col xs={24} md={{ span: 16, offset: 4 }}>
              <h2 className="text-heading head-underline text-center">
                About the Event
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="event-desc"
              />
            </Col>
          </Row>
        </div>
      </section>
      {post.events.speaker.speaker1 && (
        <section className="py-120">
          <div className="container">
            <h2 className="text-heading head-underline text-center">
              Our Guest Speaker
            </h2>
            <p className="text-center text-subhead">
              Lorem ipsum dolor sit amet consectetur. Amet nisl turpis luctus
              etiam viverra. Malesuada proin faucibus egestas eu.
            </p>
            <Row gutter={[20, 40]} className="mt-80">
              {Object.values(post.events.speaker).map((speaker, index) => (
                <Col xs={24} md={6} key={index} className="text-center">
                  <div dangerouslySetInnerHTML={{ __html: speaker }} />
                </Col>
              ))}
            </Row>
          </div>
        </section>
      )}
      <GetInTouch />
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
          event(idType: SLUG, id: $slug) {
            title
            content
            events {
              eventIntroText
              eventImages {
                image1 {
                  node {
                    mediaItemUrl
                  }
                }
                image2 {
                  node {
                    mediaItemUrl
                  }
                }
                image3 {
                  node {
                    mediaItemUrl
                  }
                }
                image4 {
                  node {
                    mediaItemUrl
                  }
                }
                image5 {
                  node {
                    mediaItemUrl
                  }
                }
                image6 {
                  node {
                    mediaItemUrl
                  }
                }
                image7 {
                  node {
                    mediaItemUrl
                  }
                }
                image8 {
                  node {
                    mediaItemUrl
                  }
                }
              }
              speaker {
                speaker1
                speaker2
                speaker3
                speaker4
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
    if (data && data.event) {
      return {
        props: {
          post: data.event,
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

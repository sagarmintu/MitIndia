import React, { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import client from "../../../client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { Col, Row } from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import { Input } from "antd";
const { Search } = Input;
import { BlogBanner, WATCHICON } from "@/utils/image-constants";
import Head from "next/head";

interface Post {
  slug: string;
  title: string;
  id: string;
  date: string;
  seo: {
    readingTime: number;
  };
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
  categories: {
    nodes: {
      slug: string;
      name: string;
    }[];
  };
}

interface Props {
  posts: Post[];
  headerData: null;
}

const Blogs = ({ posts, headerData }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterPosts(value, selectedCategory);
  };

  const filterPosts = (search: string, category: string | null) => {
    let filtered = posts;
    if (search) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category && category !== "All") {
      filtered = filtered.filter((post) =>
        post.categories.nodes.some((node) => node.slug === category)
      );
    }
    setFilteredPosts(filtered);
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    filterPosts(searchQuery, category);
  };

  const uniqueCategories = Array.from(
    new Set(
      posts
        .flatMap((post) => post.categories.nodes.map((node) => node.slug))
        .filter((category) => category !== "uncategorized")
    )
  );
  const getCategoryName = (slug: string) => {
    const foundCategory = posts
      .flatMap((post) => post.categories.nodes)
      .find((node) => node.slug === slug);
    return foundCategory ? foundCategory.name : "";
  };
  return (
    <>
      <Head>
        <title>MIT | Blogs</title>
        <meta
          name="description"
          content="Explore insightful articles, guides, and tips on a variety of topics on our blog. From industry trends to expert advice, discover valuable content to inspire and inform."
        />
      </Head>
      <Navbar headerData={headerData} />
      <section className="bg-sec blog-banner">
        <div className="container">
          <Row justify="space-between" align="middle" gutter={[20, 20]}>
            <Col md={11} xs={24}>
              <h1>Learn More About The Design Industry</h1>
              <p>
                Get acquainted with the top trends and information related to
                the design field with our insightful blogs
              </p>
            </Col>
            <Col md={12} xs={24} className="text-right">
              <Image
                src={BlogBanner}
                alt="blog"
                width={525}
                height={340}
              ></Image>
            </Col>
          </Row>
        </div>
      </section>
      <section className="latest-blog-wrapper">
        <div className="container">
          <h2 className="text-heading head-underline text-center">
            Latest Blogs
          </h2>
          <Row align="middle" justify="space-between">
            <Col>
              <div className="category-filter-list">
                <button
                  onClick={() => handleCategoryFilter("All")}
                  className={selectedCategory === "All" ? "activeCategory" : ""}
                >
                  All
                </button>
                {uniqueCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={
                      selectedCategory === category ? "activeCategory" : ""
                    }
                  >
                    {getCategoryName(category)}
                  </button>
                ))}
              </div>
            </Col>
            <Col>
              <div>
                <Search
                  placeholder="Search"
                  onChange={handleSearch}
                  style={{ width: 200 }}
                  className="custom-search"
                />
              </div>
            </Col>
          </Row>

          {/* Blog posts */}
          <div className="latest-blog-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="latest-blog-grid-box">
                  <Link
                    href={`/blogs/${post.categories.nodes[0].slug}/${post.slug}`}
                  >
                    <div className="img-hover">
                      <Image
                        src={post.featuredImage.node.mediaItemUrl}
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
              ))
            ) : (
              <div>No results found.</div>
            )}
            {posts.length === 0 && <div>No data available.</div>}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blogs;

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query GetPosts {
          posts {
            edges {
              node {
                id
                slug
                title
                date
                categories {
                  nodes {
                    slug
                    name
                  }
                }
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
    const headerData = data.globalPages.edges[1]?.node?.globalSettings || null;
    if (data && data.posts && data.posts.edges && data.posts.edges.length > 0) {
      const posts = data.posts.edges.map((edge: any) => edge.node);
      return {
        props: {
          posts,
          headerData,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return {
    props: {
      posts: [],
      headerData: null,
    },
  };
}

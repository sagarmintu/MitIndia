import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { gql } from "@apollo/client";
import { Space } from "antd";
import Image from "next/image";
import { BLOGPH } from "@/utils/image-constants";
import client from "../../client";
import Link from "next/link";
interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: {
    nodes: {
      slug: string;
      name: string;
    }[];
  };
  seo: {
    readingTime: number;
  };
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
}
const RecentPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query GetPosts {
              posts(last: 4) {
                edges {
                  node {
                    id
                    slug
                    title
                    date
                    excerpt
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
            }
          `,
        });

        if (
          data &&
          data.posts &&
          data.posts.edges &&
          data.posts.edges.length > 0
        ) {
          const fetchedPosts = data.posts.edges.map((edge: any) => edge.node);
          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <section>
        {posts.map((post) => (
          <Link href={post.slug} key={post.id} className="recent-post-list">
            <Space size={16}>
              <Image
                src={post.featuredImage.node.mediaItemUrl || BLOGPH}
                alt="blog"
                width={93}
                height={84}
              />
              <div>
                <h4>{post.title}</h4>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
              </div>
            </Space>{" "}
          </Link>
        ))}
      </section>
    </>
  );
};

export default RecentPost;

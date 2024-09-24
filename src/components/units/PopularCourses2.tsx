import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { CTYPE, DURATION, ELIGIBLE } from "@/utils/image-constants";
import client from "../../../client";

interface Course {
  title: string;
  courses: {
    degree: string;
    duration: string;
    eligibility: string;
    type: string;
    url: string;
  };
  featuredImage?: {
    node: {
      mediaItemUrl: string;
    };
  };
  categories: {
    nodes: {
      name: string;
      parent: {
        node: {
          name: string;
        };
      };
    }[];
  };
}
interface CommonProp {
  popularCourses: {
    shortDesc: string;
  };
}
const PopularCourses: React.FC<{ unitCatID: number }> = ({ unitCatID }) => {
  const { loading, error, data } = useQuery(
    gql`
      query courses($unitCatID: Int!) {
        courses(where: { categoryId: $unitCatID }, first: 200) {
          edges {
            node {
              title
              courses {
                degree
                duration
                eligibility
                type
                url
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              categories {
                nodes {
                  name
                  parent {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    { variables: { unitCatID } }
  );

  const [selectedCategory, setSelectedCategory] = useState<
    "B. Des" | "M. Des" | "Ph.D" | null
  >("B. Des");

  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category as "B. Des" | "M. Des" | "Ph.D");
    setSelectedSubCategory(category === "All" ? null : null); // Reset subcategory on category change
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
                  popularCourses {
                    shortDesc
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
          data.page.home.popularCourses
        ) {
          setShortDesc(data.page.home);
        }
      } catch (error) {
        console.error("Error fetching allUnit data:", error);
      }
    };

    fetchShortDesc();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!shortDesc) {
    return null;
  }

  const shortDescription = shortDesc.popularCourses.shortDesc;

  const coursesAll: Course[] = data.courses.edges.map((edge: any) => edge.node);

  // Filter subcategories based on selected category
  const subCategories: string[] = [
    ...Array.from(
      new Set(
        coursesAll
          .filter((course) => course.courses.degree === selectedCategory)
          .flatMap((course) =>
            course.categories.nodes
              .filter((category) => category.parent)
              .map((category) => category.name)
          )
      )
    ),
  ];

  const filteredCourses = coursesAll.filter(
    (item) =>
      item.courses.degree === selectedCategory &&
      (!selectedSubCategory ||
        item.categories.nodes.some(
          (category) => category.name === selectedSubCategory
        ))
  );

  return (
    <section className="popularcourses-container bg-sec">
      <div className="container">
        <Row gutter={[10, 10]}>
          <Col className="text-center" md={{ span: 14, offset: 5 }}>
            <div className="flex-col">
              <h2 className="text-heading">
                Our{" "}
                <span className="text-heading head-underline">
                  Popular Programs
                </span>
              </h2>
              <p className="text-subhead max-subhead">{shortDescription}</p>
            </div>
          </Col>
        </Row>
        {/* Category selection */}
        <ul className="custom-tab ">
          {["B. Des", "M. Des", "Ph.D"].map((item) => {
            // Check if there are courses available for the current category
            const hasCourses = coursesAll.some(
              (course) => course.courses.degree === item
            );
            // Render the tab only if there are courses available for the category
            return hasCourses ? (
              <li
                key={item}
                onClick={() => handleCategoryClick(item)}
                className={selectedCategory === item ? "active" : ""}
              >
                {item}
              </li>
            ) : null;
          })}
        </ul>

        {/* Subcategory selection */}
        <ul className="custom-filter">
          {subCategories.map((subItem, index) => (
            <li
              key={index}
              onClick={() =>
                setSelectedSubCategory(subItem === "All" ? null : subItem)
              }
              className={selectedSubCategory === subItem ? "active" : ""}
            >
              {subItem}
            </li>
          ))}
        </ul>

        {/* Display course cards */}
        <Row gutter={[20, 25]} justify={"start"} className="mt-40">
          {filteredCourses.map((item, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <a target="_blank" href={item.courses.url}>
                <div className="course-card">
                  <div className="course-card--image">
                    <Image
                      src={item.featuredImage?.node.mediaItemUrl || ""}
                      alt="c1"
                      height={180}
                      width={400}
                      className="object-cover coursecard-img"
                    />
                  </div>
                  <div className="coursecard-content flex-col gap-10">
                    <h4 className="course-title font-600">{item.title}</h4>
                    <h5 className="course-tag font-500 text-14 mb-4">
                      {item.courses.degree}
                    </h5>
                    <p className="coursecard-details">
                      <Image
                        src={DURATION}
                        alt="duration"
                        style={{ objectFit: "contain" }}
                      />
                      <span>Duration:</span> {item.courses.duration}
                    </p>
                    <p className="coursecard-details">
                      <Image
                        src={CTYPE}
                        alt="type"
                        style={{ objectFit: "contain" }}
                      />
                      <span>Type:</span> {item.courses.type}
                    </p>
                    <p className="coursecard-details">
                      <Image
                        src={ELIGIBLE}
                        alt="ELIGIBLE"
                        style={{ objectFit: "contain" }}
                      />
                      <span>Eligibility:</span> {item.courses.eligibility}
                    </p>
                  </div>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default PopularCourses;

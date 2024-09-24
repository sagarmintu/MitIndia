import {
  COLLEGE1,
  COLLEGE2,
  COLLEGE3,
  COLLEGE4,
  CTYPE,
  DURATION,
  ELIGIBLE,
} from "@/utils/image-constants";
import { Button, Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import client from "../../../client";
import { gql } from "@apollo/client";
const { TabPane } = Tabs;
interface Course {
  id: number;
  img: any;
  title: string;
  tag: string;
  duration: string;
  eligible: string;
  type: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
}
interface CommonProp {
  popularCourses: {
    shortDesc: string;
  };
}

const TabLabel = ({
  name,
  city,
}: {
  img?: any;
  name?: string;
  city?: string;
}) => {
  return (
    <div className="tablabel-header">
      {name && <h3 className="text-primary tablabel-college">{name}</h3>}
      {city && <h3 className="text-primary tablabel-college">{city}</h3>}
    </div>
  );
};

const CourseCard = ({
  courses,
  categoryName,
  categoryId,
}: {
  courses: Course[];
  categoryName: string;
  categoryId: number;
}) => {
  const [coursesDetails, setCoursesDetails] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query courses($categoryName: String!, $categoryId: Int!) {
              courses(
                where: { categoryName: $categoryName, categoryId: $categoryId }
              ) {
                edges {
                  node {
                    title
                    courses {
                      degree
                      duration
                      eligibility
                      type
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
          variables: {
            categoryName: categoryName,
            categoryId: categoryId,
          },
        });

        if (data && data.courses && data.courses.edges) {
          const fetchedCourses = data.courses.edges.map(
            (edge: any) => edge.node
          );
          const formattedCourses: Course[] = fetchedCourses.map(
            (course: any, index: number) => ({
              id: index + 1,
              img: course.featuredImage.node.mediaItemUrl,
              title: course.title,
              tag: course.courses.degree,
              duration: course.courses.duration,
              eligible: course.courses.eligibility,
              type: course.courses.type,
            })
          );
          setCoursesDetails(formattedCourses);
        }
      } catch (error) {
        console.error("Error fetching Courses data:", error);
      }
    };

    fetchCoursesData();
  }, [categoryName, categoryId]);
  return (
    <>
      <Row gutter={[20, 25]} justify={"center"}>
        {coursesDetails.map((item: Course) => (
          <Col key={item.id} xs={24} sm={12} lg={8}>
            <div className="course-card">
              <Image
                src={item.img}
                alt="c1"
                height={180}
                width={400}
                className="object-cover coursecard-img"
              />
              <div className="coursecard-content flex-col gap-10">
                <h4 className="course-title font-600">{item.title}</h4>
                <h5 className="course-tag font-500 text-14 mb-4">{item.tag}</h5>
                <p className="coursecard-details">
                  <Image
                    src={DURATION}
                    alt="duration"
                    style={{ objectFit: "contain" }}
                  />
                  <span>Duration</span>
                  :&nbsp;&nbsp;
                  {item.duration}
                </p>
                <p className="coursecard-details">
                  <Image
                    src={CTYPE}
                    alt="type"
                    style={{ objectFit: "contain" }}
                  />
                  <span>Type</span>
                  :&nbsp;&nbsp;
                  {item.type}
                </p>
                <p className="coursecard-details">
                  <Image
                    src={ELIGIBLE}
                    alt="ELIGIBLE"
                    style={{ objectFit: "contain" }}
                  />
                  <span>Eligibility</span>:&nbsp;&nbsp;{item.eligible}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

const PopularCourses: React.FC<{ unitCatID: number }> = ({ unitCatID }) => {
  const [coursesDetails, setCoursesDetails] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query courses {
              courses {
                edges {
                  node {
                    title
                    courses {
                      degree
                      duration
                      eligibility
                      type
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

        if (data && data.courses && data.courses.edges) {
          const fetchedCourses = data.courses.edges.map(
            (edge: any) => edge.node
          );
          const formattedCourses: Course[] = fetchedCourses.map(
            (course: any, index: number) => ({
              id: index + 1,
              img: course.featuredImage.node.mediaItemUrl,
              title: course.title,
              tag: course.courses.degree,
              duration: course.courses.duration,
              eligible: course.courses.eligibility,
              type: course.courses.type,
            })
          );
          setCoursesDetails(formattedCourses);
        }
      } catch (error) {
        console.error("Error fetching Courses data:", error);
      }
    };

    fetchCoursesData();
  }, []);
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

  if (!shortDesc) {
    return null; // or return loading indicator
  }

  const shortDescription = shortDesc.popularCourses.shortDesc;
  return (
    <section className=" popularcourses-container ">
      <div className="container">
        <Row gutter={[10, 10]}>
          <Col className="text-center" md={{ span: 12, offset: 6 }}>
            <div className="flex-col">
              <h2 className="text-heading">
                Our{" "}
                <span className="text-heading head-underline">
                  Popular Courses
                </span>
              </h2>
              <p className="text-subhead max-subhead text-center">
                {shortDescription}
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mt-60">
          <Col md={24}>
            <Tabs defaultActiveKey="1" className="popularcourses-tabs">
              <>
                <TabPane
                  tab={<TabLabel img={COLLEGE1} name={`B.Des`} />}
                  key="1"
                >
                  <CourseCard
                    courses={coursesDetails}
                    categoryName="b-des"
                    categoryId={unitCatID}
                  />
                </TabPane>
              </>

              <TabPane tab={<TabLabel img={COLLEGE2} name={`M.Des`} />} key="2">
                <CourseCard
                  courses={coursesDetails}
                  categoryName="m-des"
                  categoryId={unitCatID}
                />
              </TabPane>

              <TabPane tab={<TabLabel img={COLLEGE3} name={`P.hd`} />} key="3">
                <CourseCard
                  courses={coursesDetails}
                  categoryName="phd"
                  categoryId={unitCatID}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default PopularCourses;

import React, { useRef } from "react";
import { graphql } from "gatsby";
import { Waypoint } from "react-waypoint";

import Layout from "../components/Layout";
import Sessions from "../components/Sessions";
import PriceListList from "../components/PriceList";
import Team from "../components/Team";
import HomeTop from "../components/HomeTop";
import { HTMLContent } from "../components/Content";

const IndexPage = ({ data }) => {
  const sessionList = getSessionsOnly(data);
  console.log("from index:", sessionList);
  return (
    <Layout>
      <section className="vex-banner--home full-height">
        <HomeTop />
      </section>
      <FadeIn>
        <section className="vex-classes container">
          <Sessions sessionList={sessionList} />
        </section>
      </FadeIn>
      <FadeIn>
        <section className="vex-price-lists  py-5 d-flex align-items-center">
          <div className="container">
            <PriceListList />
          </div>
        </section>
      </FadeIn>
      <FadeIn>
        <section className="vex-team container  py-5  d-flex align-items-center">
          <Team />
        </section>
      </FadeIn>
    </Layout>
  );
};

const FadeIn = props => {
  const sectionRef = useRef(null);

  function fadeIn() {
    sectionRef.current.style.opacity = 1;
    sectionRef.current.style.transform = "translateY(0)";
  }

  return (
    <Waypoint scrollableAncestor={window} onEnter={fadeIn} bottomOffset="25%">
      <div
        className=""
        style={{
          opacity: 0,
          transform: "translateY(10rem)",
          transition: "all 1000ms"
        }}
        ref={sectionRef}
      >
        {props.children}
      </div>
    </Waypoint>
  );
};

export const getSessionsOnly = data => {
  const {
    allMarkdownRemark: { edges }
  } = data;
  return edges.map(({ node: { id, html, frontmatter } }) => {
    return {
      id,
      body: <HTMLContent content={html} />,
      header: frontmatter.title,
      publicURL: frontmatter.image ? frontmatter.image.publicURL : ""
    };
  });
};

export const query = graphql`
  query SessionListQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "class-entry" } } }
    ) {
      edges {
        node {
          html
          id
          fields {
            slug
          }
          rawMarkdownBody
          frontmatter {
            title
            image {
              publicURL
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;

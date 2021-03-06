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
  return (
    <Layout>
      <section className="vex-banner--home full-height">
        <HomeTop />
      </section>
      <FadeIn
        id="sectionClasses"
        className="vex-classes container"
        topOffset="25%"
      >
        <Sessions sessionList={sessionList} />
      </FadeIn>
      <FadeIn
        className="vex-team container  py-5  d-flex align-items-center"
        id="sectionTeam"
      >
        <Team />
      </FadeIn>
      <FadeIn
        id="sectionPrices"
        className="vex-price-lists container py-5 d-flex align-items-center"
      >
        <PriceListList />
      </FadeIn>
    </Layout>
  );
};

const FadeIn = (props, { topOffset = 0 }) => {
  const sectionRef = useRef(null);

  function fadeIn() {
    sectionRef.current.style.opacity = 1;
    sectionRef.current.style.transform = "translateY(0)";
  }

  return (
    <section id={props.id} className={props.className}>
      <Waypoint
        scrollableAncestor={window}
        onEnter={fadeIn}
        bottomOffset="25%"
        topOffset={topOffset}
      >
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
    </section>
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

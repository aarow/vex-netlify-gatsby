import React, { useRef } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Waypoint } from "react-waypoint";

import Layout from "../components/Layout";
import Sessions from "../components/Sessions";
import PriceListList from "../components/PriceList";
import Team from "../components/Team";
import HomeTop from "../components/HomeTop";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: classList } = data.classList;

    return (
      <Layout>
        <section className="vex-banner--home full-height">
          <HomeTop />
        </section>
        <FadeIn>
          <section className="vex-classes container  d-flex align-items-center">
            <Sessions classList={classList} />
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
  }
}

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

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    classList: allMarkdownRemark(
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
          }
        }
      }
    }
  }
`;

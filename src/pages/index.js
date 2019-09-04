import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
// import { Waypoint } from "react-waypoint";
import debounce from "lodash/debounce";

import Layout from "../components/Layout";
import Sessions from "../components/Sessions";
import PriceList from "../components/PriceList";
import Team from "../components/Team";
import HomeTop from "../components/HomeTop";

export default class IndexPage extends React.Component {
  state = {
    sectionCount: 0,
    currentSection: 1,
    scrollTop: 0,
    scrolling: false
  };

  // componentDidMount() {
  //   this.setState({
  //     sectionCount: document.querySelectorAll(`section`).length
  //   });
  //   window.addEventListener("wheel", this.moveToNextSection);
  // }
  moveToNextSection = debounce(e => {
    e.preventDefault();
    console.log(e);

    if (this.state.scrolling) return;
    this.setState({ scrolling: true });
    let currentSection = this.state.currentSection;

    if (e.deltaY > 0 && currentSection < this.state.sectionCount) {
      currentSection++;
    } else if (e.deltaY < 0 && currentSection > 1) {
      currentSection--;
    }
    console.log(
      e.deltaY,
      this.state.currentSection,
      currentSection,
      document.querySelector(`section:nth-child(${currentSection})`)
    );
    this.setState({ currentSection });

    window.scrollTo(
      0,
      document.querySelector(`section:nth-child(${currentSection})`).scrollTop
    );

    this.setState({ scrolling: false });
  }, 100);

  // moveToNextSection = debounce(e => {
  //   if (this.state.scrolling) return;
  //   this.setState({ scrolling: true });

  //   let currentSection = this.state.currentSection;

  //   if (
  //     this.state.scrollTop > window.scrollY &&
  //     this.state.currentSection > 1
  //   ) {
  //     currentSection--;
  //   } else if (this.state.currentSection < this.state.sectionCount) {
  //     currentSection++;
  //   }
  //   this.setState({ scrollTop: window.scrollY, currentSection });

  //   const sectionScrollY = document.querySelector(
  //     `section:nth-child(${this.state.currentSection})`
  //   ).offsetTop;

  //   console.log(sectionScrollY);
  //   window.scrollTo(0, sectionScrollY);
  //   this.setState({ scrolling: false });
  // }, 100);

  render() {
    const { data } = this.props;
    const { edges: classList } = data.classList;
    const { edges: priceLists } = data.priceLists;
    const { edges: bannerList } = data.bannerList;
    return (
      <Layout>
        <section className="vex-banner--home mb-5 full-height">
          <HomeTop {...bannerList[0].node} />
        </section>
        <section className="vex-classes container full-height d-flex align-items-center">
          <Sessions classList={classList} />
        </section>
        <section className="vex-price-lists  full-height bg-light py-5 d-flex align-items-center">
          <div className="container">
            {priceLists.map(priceList => (
              <PriceList
                key={priceList.node.id}
                priceList={priceList.node.frontmatter}
              />
            ))}
          </div>
        </section>
        <section className="vex-team container full-height  py-5  d-flex align-items-center">
          <Team />
        </section>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    bannerList: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "banner" }
          title: { eq: "Home Page Banner" }
        }
      }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            background_image {
              id
              publicURL
            }
          }
        }
      }
    }
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
    priceLists: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "price-list" } } }
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            title
            prices {
              description
              link
              link_title
              price
              product_title
              unit
            }
          }
        }
      }
    }
  }
`;

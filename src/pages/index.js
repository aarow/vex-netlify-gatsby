import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Sessions from "../components/Sessions";
import PriceList from "../components/PriceList";
import Team from "../components/Team";
import Banner from "../components/Banner";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: classList } = data.classList;
    const { edges: priceLists } = data.priceLists;
    const { edges: teamList } = data.teamList;
    const { edges: bannerList } = data.bannerList;
    return (
      <Layout>
        <section>
          <Banner
            className="vex-banner"
            slideList={bannerList[0].node.frontmatter.slides}
          />
        </section>

        <section className="vex-classes container">
          <Sessions classList={classList} />
        </section>
        <section className="vex-price-lists container">
          {priceLists.map(priceList => (
            <PriceList
              key={priceList.node.id}
              priceList={priceList.node.frontmatter.prices}
            />
          ))}
        </section>
        <section className="vex-team container">
          <Team teamList={teamList} />
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
      filter: { frontmatter: { templateKey: { eq: "banner" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            slides {
              title
              background_image {
                publicURL
              }
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
    teamList: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "team-member" } } }
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            title
            job_title
            email
            image {
              id
              publicURL
            }
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

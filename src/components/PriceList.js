import React from "react";
import { HTMLContent } from "./Content";
import { graphql, useStaticQuery } from "gatsby";

const PriceListList = () => {
  const {
    allMarkdownRemark: { edges: priceListList }
  } = useStaticQuery(graphql`
    query PriceListListQuery {
      allMarkdownRemark(
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
  `);
  return (
    <>
      {priceListList.map(priceList => (
        <PriceList
          key={priceList.node.id}
          priceList={priceList.node.frontmatter}
        />
      ))}
    </>
  );
};

const PriceList = ({ priceList }) => {
  return (
    <div className="price-list--container">
      <h2 className="price-list--title text-uppercase mt-5 mb-2">
        {priceList.title}
      </h2>
      <ul className="price-list--item list-unstyled row">
        {priceList.prices.map(priceItem => (
          <li
            key={priceItem.price}
            className="price-list--item col-lg-3 col-sm-6 mb-5 mb-lg-0 text-center"
          >
            <PriceItem {...priceItem} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const PriceItem = priceItem => (
  <div className="price-list--card card neumophic-up-flat h-100 border-0">
    <div className="card-body py-5">
      <h3 className="mb-3">{priceItem.product_title}</h3>

      <div className="desc mb-3">
        <HTMLContent content={priceItem.description} />
      </div>
      <div className="price mb-3">
        <span className="h4">${priceItem.price}</span>
        <span> per {priceItem.unit}</span>
        <br />
        <small>(3 Month Autopay Discount)</small>
      </div>

      <a href={priceItem.link} className="btn btn-lg">
        {priceItem.link_title}
      </a>
    </div>
  </div>
);

export default PriceListList;

import React from "react";
import { HTMLContent } from "./Content";
import { graphql, useStaticQuery } from "gatsby";

const PriceListList = () => {
  const {
    allMarkdownRemark: { edges: priceListList }
  } = useStaticQuery(priceListQuery);

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
    <div className="price-list--container mt-5">
      <h3 className="price-list--title my-5 text-center">{priceList.title}</h3>
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

const PriceItem = priceItem => {
  const healcodeWidget = (product_code, button_text) => ({
    __html: `<healcode-widget data-version="0.2" data-link-class="btn  btn-dark h5" data-site-id="21898" data-mb-site-id="522673" data-type="pricing-link" data-inner-html="${button_text}" data-service-id="${product_code}" />`
  });

  return (
    <div className="price-list--card card h-100 border-1">
      <div className="card-body py-5">
        <h4 className="mb-3 ">{priceItem.product_title}</h4>

        <div className="desc mb-3">
          <HTMLContent content={priceItem.description} />
        </div>
        <div className="price mb-3">
          <span className="h4">${priceItem.price}</span>
          <span> per {priceItem.unit}</span>
          <br />
          <small>(3 Month Autopay Discount)</small>
        </div>

        {priceItem.product_code && (
          <div
            dangerouslySetInnerHTML={healcodeWidget(
              priceItem.product_code,
              priceItem.link_title
            )}
          ></div>
        )}
      </div>
    </div>
  );
};

export const priceListQuery = graphql`
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
              product_code
            }
          }
        }
      }
    }
  }
`;

export default PriceListList;
